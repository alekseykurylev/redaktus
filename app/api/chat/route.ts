import GigaChat from "gigachat";
import { type NextRequest, NextResponse } from "next/server";

const giga = new GigaChat({
  credentials: process.env.GIGACHAT_CREDENTIALS,
  scope: process.env.GIGACHAT_SCOPE,
});

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Не передан текст" }, { status: 400 });
    }

    const prompt = `
Ты — опытный корректор и редактор текстов.
Ты должен внимательно прочитать предложенный текст, найти и исправить все орфографические, пунктуационные и грамматические ошибки.
Ответь исправленным текстом без пояснений.

Текст:
${text}
`;

    const completion = await giga.chat({
      model: "GigaChat",
      messages: [
        {
          role: "system",
          content:
            "Ты — опытный корректор и редактор текстов.\n## Задача\nТы должен внимательно прочитать предложенный текст, найти и исправить все орфографические, пунктуационные и грамматические ошибки.",
        },
        {
          created_at: 1760555874,
          role: "user",
          content:
            "Маша, придя домой поздним вечером быстро сняла пальто бросила сумочку на диван и устало опустилась в кресло — ей было тяжело потому-что она весь день работала без отдыха.",
        },
      ],
    });

    const result =
      completion.choices?.[0]?.message?.content?.trim() ?? "Ошибка";

    return NextResponse.json({ result });
  } catch (err: any) {
    console.error("GigaChat API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

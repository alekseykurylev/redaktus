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

    const systemMessage = {
      role: "system",
      content:
        "Ты — опытный корректор и редактор текстов.\n## Задача\nТы должен внимательно прочитать предложенный текст, найти и исправить все орфографические, пунктуационные и грамматические ошибки.\nОтветь исправленным текстом БЕЗ пояснений.",
    };

    const userMessage = {
      created_at: Math.floor(Date.now() / 1000),
      role: "user",
      content: text,
    };

    const payload = {
      messages: [
        {
          model: "GigaChat-2",
          messages: [systemMessage, userMessage],
          profanity_check: true,
        },
      ],
    };

    const resp = await giga.chat(payload);
    const corrected = resp?.choices?.[0]?.message?.content ?? null;

    if (!corrected) {
      console.error("Empty response from GigaChat:", resp);
      return NextResponse.json(
        { error: "Пустой ответ от GigaChat" },
        { status: 502 },
      );
    }

    return NextResponse.json({ result: corrected });
  } catch (err: any) {
    console.error("GigaChat route error:", err);
    return NextResponse.json(
      { error: err?.message ?? String(err) },
      { status: 500 },
    );
  }
}

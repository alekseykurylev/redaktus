import { Editor } from "@/components/editor";

export default function Home() {
  return (
    <div className=" m-3 h-[calc(100vh-(--spacing(6)))] overflow-hidden flex rounded-xl">
      <div className="bg-white/85 shrink-0 border-r-1 border-r-gray-200 w-64 flex flex-col p-4">
        <div className="mb-4">
          <div className="text-2xl">Заметкус</div>
          <button type="button" className="border">
            Новая заметка
          </button>
        </div>
        <div className="grow overflow-y-auto">
          <div className="h-16 border p-3">12123123</div>
          <div className="h-16 border p-3">12123123</div>
          <div className="h-16 border p-3">12123123</div>
          <div className="h-16 border p-3">12123123</div>
          <div className="h-16 border p-3">12123123</div>
          <div className="h-16 border p-3">12123123</div>
        </div>
      </div>
      <Editor />
    </div>
  );
}

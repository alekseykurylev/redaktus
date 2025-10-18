import { Note } from "@/components/note";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Note.Root id={id}>
      <Note.Toolbar />
      <Note.Title />
      <Note.Editor />
      <Note.Footer />
    </Note.Root>
  );
}

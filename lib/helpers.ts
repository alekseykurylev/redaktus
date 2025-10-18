import { nanoid } from "nanoid";

export function generateNoteId() {
  const timestamp = Date.now().toString();
  const random = nanoid(12);
  return `${timestamp}_${random}`;
}

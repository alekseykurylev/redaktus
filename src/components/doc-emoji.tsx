import { IconMoodSmile } from "@tabler/icons-react"
import { Button } from "./ui/button"

export function DocEmoji({ id, icon }: { id: string; icon?: string }) {
  console.log(id, icon)

  return (
    <Button size="sm" variant="secondary">
      <IconMoodSmile />
      Emoji
    </Button>
  )
}

import { useState } from "react"
import { IconMoodSmile } from "@tabler/icons-react"
import { Button } from "./ui/button"
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerFooter,
  EmojiPickerSearch,
} from "./ui/emoji-picker"
import { useDocActions } from "@/hooks/use-doc-actions"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

export function DocEmoji({ id, emoji }: { id: string; emoji?: string }) {
  const [currentEmoji, setCurrentEmoji] = useState(emoji)
  const [isOpen, setIsOpen] = useState(false)
  const { handleSaveEmoji } = useDocActions()

  const handleEmoji = (selectedEmoji: string) => {
    setIsOpen(false)
    setCurrentEmoji(selectedEmoji)
    handleSaveEmoji(id, selectedEmoji)
  }

  const handleRemoveEmoji = () => {
    setIsOpen(false)
    setCurrentEmoji(undefined)
    handleSaveEmoji(id, "")
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      {currentEmoji ? (
        <DialogTrigger
          render={
            <button type="button" aria-label="Изменить emoji" className="text-7xl leading-none">
              {currentEmoji}
            </button>
          }
        />
      ) : (
        <DialogTrigger
          render={
            <Button size="sm" variant="secondary" aria-label="Добавить emoji">
              <IconMoodSmile />
              <span>Emoji</span>
            </Button>
          }
        />
      )}
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader className="flex-row items-center justify-between gap-1">
          <button type="button" onClick={handleRemoveEmoji}>
            Удалить
          </button>
          <DialogTitle>Emoji</DialogTitle>
          <DialogClose>Закрыть</DialogClose>
        </DialogHeader>
        <div>
          <EmojiPicker
            locale="ru"
            className="h-[342px]"
            columns={8}
            onEmojiSelect={({ emoji }) => handleEmoji(emoji)}
          >
            <EmojiPickerSearch className="border-t" />
            <EmojiPickerContent />
            <EmojiPickerFooter />
          </EmojiPicker>
        </div>
      </DialogContent>
    </Dialog>
  )
}

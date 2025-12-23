import { Search } from 'lucide-react'

import { Sidebar, Label } from '@/components/ui'

export function SearchForm({ ...props }: React.ComponentProps<'form'>) {
  return (
    <form {...props}>
      <Sidebar.Group className="py-0">
        <Sidebar.GroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Поиск
          </Label>
          <Sidebar.Input id="search" placeholder="Поиск" className="pl-8" />
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </Sidebar.GroupContent>
      </Sidebar.Group>
    </form>
  )
}

import type { ComponentProps } from "react";
import { cx } from "@/lib/cva";

function AppShellRoot({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="app-shell" className={cx("flex", className)} {...props} />
  );
}
AppShellRoot.displayName = "AppShell.Root";

function AppShellBar({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="app-shell-bar"
      className={cx(
        "py-8 px-4 flex flex-col justify-between items-center",
        className,
      )}
      {...props}
    />
  );
}
AppShellBar.displayName = "AppShell.Bar";

function AppShellNotes({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="app-shell-notes"
      className={cx(
        "grow m-3 h-[calc(100vh-(--spacing(6)))] overflow-hidden flex rounded-xl",
        className,
      )}
      {...props}
    />
  );
}
AppShellNotes.displayName = "AppShell.Notes";

function AppShellHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="app-shell-header"
      className={cx("mb-4", className)}
      {...props}
    />
  );
}
AppShellHeader.displayName = "AppShell.Header";

function AppShellSideBar({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="app-shell-sidebar"
      className={cx(
        "bg-white/85 shrink-0 border-r-1 border-r-gray-200 w-64 flex flex-col p-4",
        className,
      )}
      {...props}
    />
  );
}
AppShellSideBar.displayName = "AppShell.SideBar";

function AppShellList({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="app-shell-list"
      className={cx("grow overflow-y-auto", className)}
      {...props}
    />
  );
}
AppShellList.displayName = "AppShell.List";

function AppShellNote({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="app-shell-note"
      className={cx("bg-white w-full", className)}
      {...props}
    />
  );
}
AppShellNote.displayName = "AppShell.Note";

export {
  AppShellRoot as Root,
  AppShellBar as Bar,
  AppShellNotes as Notes,
  AppShellSideBar as SideBar,
  AppShellHeader as Header,
  AppShellList as List,
  AppShellNote as Note,
};

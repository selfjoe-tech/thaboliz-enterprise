"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function Sheet(props: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger(props: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose(props: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal(props: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/60",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        "duration-150 ease-out",
        className
      )}
      {...props}
    />
  )
}

const sideClasses: Record<NonNullable<SheetContentProps["side"]>, string> = {
  right: cn(
    "right-0 top-0 h-dvh w-[320px] sm:w-[360px]",
    "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right"
  ),
  left: cn(
    "left-0 top-0 h-dvh w-[320px] sm:w-[360px]",
    "data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left"
  ),
  top: cn(
    "left-0 top-0 w-full",
    "data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top"
  ),
  bottom: cn(
    "left-0 bottom-0 w-full",
    "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom"
  ),
}

type SheetContentProps = React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          // ✅ content must be above overlay
          "fixed z-[60]",
          "bg-black text-white border-white/10",
          // borders per side (so left side doesn't get a right-border vibe)
          side === "right" ? "border-l" : "",
          side === "left" ? "border-r" : "",
          side === "top" ? "border-b" : "",
          side === "bottom" ? "border-t" : "",
          "gap-4 shadow-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "duration-150 ease-out",
          sideClasses[side],
          className
        )}
        {...props}
      >
        {children}

        {showCloseButton && (
          <SheetPrimitive.Close
            className={cn(
              "absolute right-4 top-4 inline-flex items-center justify-center rounded-xs",
              "opacity-70 transition-opacity hover:opacity-100",
              "focus:outline-hidden focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black",
              "disabled:pointer-events-none"
            )}
          >
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-white font-semibold", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-white/60 text-sm", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

type PagerProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  pageWindow?: number; // how many page buttons to show around current (defaults to 2 => window size 5)
};

function getPageList(current: number, total: number, window = 2) {
  // returns list of items where number = page, "start-ellipsis"/"end-ellipsis" = markers
  if (total <= 1) return [];
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "start-ellipsis" | "end-ellipsis")[] = [];

  // always include first
  pages.push(1);

  const left = Math.max(2, current - window);
  const right = Math.min(total - 1, current + window);

  if (left > 2) pages.push("start-ellipsis");

  for (let p = left; p <= right; p++) pages.push(p);

  if (right < total - 1) pages.push("end-ellipsis");

  pages.push(total);
  return pages;
}

/**
 * Default Pagination wrapper (composed)
 * Use it like:
 * import Pagination from "@/components/ui/pagination";
 * <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
 */
export default function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
  className,
  pageWindow = 2,
}: PagerProps) {
  const pages = getPageList(currentPage, totalPages, pageWindow);

  // Handlers
  const go = (n: number) => {
    if (n < 1 || n > totalPages || n === currentPage) return;
    onPageChange(n);
    // ensure focus management etc if you want
  };

  // Render
  return (
    <Pagination className={className}>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e: any) => {
              e.preventDefault();
              if (currentPage > 1) go(currentPage - 1);
            }}
            aria-disabled={currentPage <= 1}
            className={currentPage <= 1 ? "opacity-40 pointer-events-none" : undefined}
          />
        </PaginationItem>

        {/* Page numbers */}
        {pages.map((p, idx) => {
          if (p === "start-ellipsis" || p === "end-ellipsis") {
            return (
              <PaginationItem key={`${p}-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const pageNum = p as number;
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href="#"
                onClick={(e: any) => {
                  e.preventDefault();
                  go(pageNum);
                }}
                isActive={pageNum === currentPage}
                aria-current={pageNum === currentPage ? "page" : undefined}
                aria-label={`Page ${pageNum}`}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e: any) => {
              e.preventDefault();
              if (currentPage < totalPages) go(currentPage + 1);
            }}
            aria-disabled={currentPage >= totalPages}
            className={currentPage >= totalPages ? "opacity-40 pointer-events-none" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}

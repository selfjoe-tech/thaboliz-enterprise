export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse border border-neutral-200 bg-white">
      <div className="aspect-[4/3] bg-neutral-200" />
      <div className="p-4">
        <div className="mb-3 flex gap-2">
          <div className="h-5 w-16 bg-neutral-200" />
          <div className="h-5 w-20 bg-neutral-200" />
        </div>
        <div className="h-4 w-full bg-neutral-200" />
        <div className="mt-2 h-4 w-2/3 bg-neutral-200" />
        <div className="mt-4 h-6 w-24 bg-neutral-200" />
      </div>
    </div>
  );
}
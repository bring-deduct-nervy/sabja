export function RoomCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
      {/* Image skeleton */}
      <div className="aspect-video w-full animate-pulse bg-gray-200 dark:bg-gray-700" />

      <div className="space-y-4 p-6">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Features skeleton */}
        <div className="grid grid-cols-2 gap-3">
          <div className="h-5 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Amenities skeleton */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-6 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>

        {/* Price skeleton */}
        <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
          <div className="h-8 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Button skeleton */}
        <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}

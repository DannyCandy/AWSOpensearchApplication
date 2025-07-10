
export default function MovieSkeleton() {
  return (
    <div className="min-h-screen relative overflow-hidden">
  {/* Giữ nguyên background như cũ */}
  <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-yellow-50 to-red-100 dark:from-red-950 dark:via-yellow-950 dark:to-red-900">
    <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-300"></div>
    <div className="absolute top-20 left-10 w-32 h-32 opacity-5">
      <div className="w-full h-full bg-red-600 rounded-full transform rotate-45"></div>
      <div className="absolute top-4 left-4 w-24 h-24 bg-yellow-500 rounded-full"></div>
    </div>
    <div className="absolute bottom-20 right-10 w-40 h-40 opacity-5">
      <div className="w-full h-full bg-yellow-600 rounded-full transform -rotate-12"></div>
      <div className="absolute top-6 left-6 w-28 h-28 bg-red-500 rounded-full"></div>
    </div>
    <div className="absolute top-1/4 left-1/4 text-red-300 opacity-20 text-6xl">♪</div>
    <div className="absolute top-3/4 right-1/4 text-yellow-400 opacity-20 text-4xl">♫</div>
    <div className="absolute top-1/2 left-3/4 text-red-400 opacity-20 text-5xl">♬</div>
  </div>

  <div className="relative z-10 container mx-auto px-4 py-12 max-w-[80vw]">
    {/* Header skeleton */}
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-12 w-12 rounded-full bg-gray-400/30 animate-pulse"></div>
        <div className="h-10 w-64 rounded-lg bg-gray-400/30 animate-pulse"></div>
        <div className="h-12 w-12 rounded-full bg-gray-400/30 animate-pulse"></div>
      </div>
      <div className="h-6 w-80 mx-auto rounded-lg bg-gray-400/30 animate-pulse mb-12"></div>

      {/* Search bar & filter skeletons */}
      <div className="flex items-center gap-4 justify-center">
        <div className="h-16 w-full max-w-xl rounded-2xl bg-gray-400/30 animate-pulse"></div>
        <div className="h-16 w-48 rounded-2xl bg-gray-400/30 animate-pulse"></div>
        <div className="h-16 w-48 rounded-2xl bg-gray-400/30 animate-pulse"></div>
      </div>
    </div>

    {/* Result count & page skeleton */}
    <div className="flex justify-between mb-10">
      <div className="h-6 w-64 bg-gray-400/30 rounded animate-pulse"></div>
      <div className="h-6 w-32 bg-gray-400/30 rounded animate-pulse"></div>
    </div>

    {/* List of skeleton cards */}
    <div className="space-y-6 mb-12">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="p-8 rounded-2xl bg-gray-400/20 animate-pulse backdrop-blur-sm border border-gray-300/30 dark:border-gray-600/30"
        >
          <div className="flex gap-6">
            <div className="w-16 h-16 rounded-xl bg-gray-400/30"></div>
            <div className="flex-1 space-y-3">
              <div className="h-6 w-1/2 bg-gray-400/30 rounded"></div>
              <div className="h-4 w-1/3 bg-gray-400/30 rounded"></div>
              <div className="h-4 w-full bg-gray-400/30 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-400/30 rounded"></div>
              <div className="flex gap-2 mt-4">
                <div className="h-6 w-16 bg-gray-400/30 rounded"></div>
                <div className="h-6 w-20 bg-gray-400/30 rounded"></div>
                <div className="h-6 w-12 bg-gray-400/30 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Pagination skeleton */}
    <div className="flex items-center justify-center gap-3">
      <div className="h-12 w-12 rounded-xl bg-gray-400/30 animate-pulse"></div>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-12 w-12 rounded-xl bg-gray-400/30 animate-pulse"></div>
      ))}
      <div className="h-12 w-12 rounded-xl bg-gray-400/30 animate-pulse"></div>
    </div>
  </div>
</div>

  )
}

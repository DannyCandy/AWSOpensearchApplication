export function MovieListSkeleton(){
    return (
        <>
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
        </>
    )
}
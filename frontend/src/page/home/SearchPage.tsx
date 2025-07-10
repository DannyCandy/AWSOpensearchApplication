"use client"

import { useCallback, useEffect, useState } from "react"
import {
  Search,
  Filter,
  // MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Star,
  Eye,
  Users,
  ArrowUpRight,
  Calendar,
  Award,
  AlertTriangle,
  RefreshCw,
  Film,
  List,
  ContactRound,
  Clapperboard,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useCustomQuery from "@/lib/hooks/useCustomQuery"
import useSearchFilter from "@/lib/hooks/useSearchFilter"
import { useDebounce } from "@/lib/hooks/useDebounce"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Movie } from "@/types"
import MovieSkeleton from "@/components/skeleton/SearchPage"


const sortOptions = [
  {label: "Default", value: { sortBy: "", order: ""}},
  {label: "Latest", value: {sortBy: "year", order: "desc"}}, 
  {label: "Title A-Z", value: {sortBy: "title", order: "asc"}},
  {label: "Title Z-A", value: {sortBy: "title", order: "desc"}},
  {label: "Most rating", value: {sortBy: "rating", order: "desc"}}, 
  {label: "Most view", value: {sortBy: "view", order: "desc"}},
]
const filterOptions = [
  { label: "Random", value: { filter: ""} },
  { label: "Horror", value: { filter: "Horror" } },
  { label: "Drama", value: { filter: "Drama" } },
  { label: "Romance", value: { filter: "Romance" } },
  { label: "Comedy", value: { filter: "Comedy" } },
  { label: "Short", value: { filter: "Short" } },
  { label: "Crime", value: { filter: "Crime" } },
  { label: "Mystery", value: { filter: "Mystery" } },
  { label: "Western", value: { filter: "Western" } },
  { label: "Animation", value: { filter: "Animation" } },
  { label: "War", value: { filter: "War" } },
  { label: "History", value: { filter: "History" } },
  { label: "Thriller", value: { filter: "Thriller" } },
  { label: "Biography", value: { filter: "Biography" } },
  { label: "Fantasy", value: { filter: "Fantasy" } }
];


function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("Random")
  const [sort, setSort] = useState("Default")
  const [ query, updateQuery ] = useCustomQuery({
    q:"",
    page: 1,
    filter: "",
  });
  const { data, isLoading, isError, isPlaceholderData, error, refetch, isFetching } = useSearchFilter<Movie>( query, "/search/movies");
  const debouncedSearch = useDebounce(searchQuery, 700);
  useEffect(() => {
    const filtered = debouncedSearch.trim().replace(/\s+/g, " ");
    updateQuery({
      q: filtered,
      page:1
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[debouncedSearch])
  console.log("data", data);
  const [pageRange, setPageRange] = useState<number[]>([]);
  useEffect(() => {
    const totalPages = data?.totalPages || 1;
    if(totalPages < 4){
      setPageRange(Array.from({ length: totalPages },(_, i) => i + 1))
      return;
    }else{
      if (data?.hasNextPage && data?.hasPrevPage) {
      setPageRange([data.page - 1, data.page, data.page + 1])
      return;
      }

      if (data?.hasNextPage && !data?.hasPrevPage) {
      setPageRange([data.page, data.page + 1, data.page + 2]);
      return;
      }

      if (!data?.hasNextPage && data?.hasPrevPage) {
      setPageRange([data.page - 2, data.page - 1, data.page])
      return;
      }
    }
  },[data])
  const handleSort = (indexOtp: number) => {
    setSort(sortOptions[indexOtp].label);
    updateQuery({...sortOptions[indexOtp].value, page:1});
  }

  const handleFilter = (indexOtp: number) => {
    setFilter(filterOptions[indexOtp].label);
    updateQuery({...filterOptions[indexOtp].value, page:1});
  }
  const goToPage = (page: number) => {
    updateQuery({page});
  }

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  if (isLoading || isFetching) {
    return (
      <MovieSkeleton />
    )
  }

  if (isError) {
    return (
      <div className='flex items-center justify-center py-8 space-y-4'>
        <Alert className="border-red-500/20 bg-red-500/10">
          <AlertTriangle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-400">
              <div className="flex items-center justify-between">
                <div>
                  <strong>Error loading songs:</strong> {error.message}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  className="bg-transparent border-red-500/30 text-red-400 hover:bg-red-500/20"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                  Retry
                </Button>
              </div>
            </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with Vietnamese traditional pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-yellow-50 to-red-100 dark:from-red-950 dark:via-yellow-950 dark:to-red-900">
        {/* Traditional Vietnamese pattern overlay */}
        <div
          className="absolute inset-0 opacity-10 bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-300"
        ></div>


        {/* Lotus flower decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 opacity-5">
          <div className="w-full h-full bg-red-600 rounded-full transform rotate-45"></div>
          <div className="absolute top-4 left-4 w-24 h-24 bg-yellow-500 rounded-full"></div>
        </div>

        <div className="absolute bottom-20 right-10 w-40 h-40 opacity-5">
          <div className="w-full h-full bg-yellow-600 rounded-full transform -rotate-12"></div>
          <div className="absolute top-6 left-6 w-28 h-28 bg-red-500 rounded-full"></div>
        </div>

        {/* Musical notes floating */}
        <div className="absolute top-1/4 left-1/4 text-red-300 opacity-20 text-6xl">♪</div>
        <div className="absolute top-3/4 right-1/4 text-yellow-400 opacity-20 text-4xl">♫</div>
        <div className="absolute top-1/2 left-3/4 text-red-400 opacity-20 text-5xl">♬</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-[80vw]">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="h-12 w-12 text-red-600" />
            <h1 className="text-5xl font-bold text-red-800 dark:text-red-200">Movies storage</h1>
            <Film className="h-12 w-12 text-yellow-600" />
          </div>
          <p className="text-xl text-red-700 dark:text-red-300 mb-12">Explore the world of movies</p>

          {/* Search Bar with Sort Filter - 80% width */}
          <div className="w-full max-w-none mx-auto">
            <div className="flex items-center gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-red-400 h-6 w-6 z-10" />
                <Input
                  placeholder="Tìm kiếm phim,..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-16 pr-6 h-16 text-lg bg-white/90 dark:bg-slate-800/90 border-red-200 dark:border-red-700 shadow-lg rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>

              {/* Simple Sort Select */}
                <Select onValueChange={(e) => handleSort(Number(e))}>
                    <SelectTrigger className="w-48 min-h-16 rounded-2xl bg-white/90 dark:bg-slate-800/90 border-red-200 dark:border-red-700 shadow-lg backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                          <Filter className="h-5 w-5 text-red-500" />
                          <SelectValue placeholder="Default" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm">
                      {sortOptions.map((opt, i) => (
                        <SelectItem key={i} value={i.toString()} className="text-black hover:bg-green-600">
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                </Select>
                <Select onValueChange={(e) => handleFilter(Number(e))}>
                    <SelectTrigger className="w-48 min-h-16 rounded-2xl bg-white/90 dark:bg-slate-800/90 border-red-200 dark:border-red-700 shadow-lg backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                          <Filter className="h-5 w-5 text-red-500" />
                          <SelectValue placeholder="Random" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm">
                      {filterOptions.map((opt, i) => (
                        <SelectItem key={i} value={i.toString()} className="text-black hover:bg-green-600">
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                </Select>
            </div>
          </div>
        </div>

        {/* Results Header with Pagination Info */}
        <div className="flex items-center justify-between mb-10">
          {/* Left: Results Count */}
          <div>
            <p className="text-red-700 dark:text-red-300 text-lg">
              Showing{" "}
              <span className="font-semibold text-red-800 dark:text-red-200">
                {data?.docs.length}
              </span>{" "}
              in <span className="font-semibold text-red-800 dark:text-red-200">{data?.totalDocs}</span> matched movies
            </p>
            <div className="flex items-center gap-2 mt-2">
              {searchQuery && (
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">
                  Search: "{searchQuery}"
                </span>
              )}
              {sort && (<span className="px-2 py-1 bg-orange-500 text-gray-800 rounded text-xs">Sort: {sort}</span>)}
              {filter && (<span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Filter: {filter}</span>)}
            </div>
          </div>

          {/* Right: Page Info */}
          <div>
            <p className="text-red-700 dark:text-red-300 text-lg">
              Page <span className="font-semibold text-red-800 dark:text-red-200">{data?.page}</span> of{" "}
              <span className="font-semibold text-red-800 dark:text-red-200">10</span>
            </p>
          </div>
        </div>

        {/* Search Results - Vietnamese Folk Songs */}
        <div className="w-full">
          <div className="space-y-4 mb-8">
            {data?.docs.map((result) => (
              <Card
                key={result._id}
                className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-red-200 dark:border-red-700 hover:border-yellow-400 dark:hover:border-yellow-500 bg-white/90 dark:bg-slate-800/90 overflow-hidden backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    {/* Artist Avatar */}
                    {/* <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {result.}
                      </div>
                    </div> */}

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-red-800 dark:text-red-200 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                              {/* {result.title} */}
                              {result.hasHighlightedTitle 
                                ? <span dangerouslySetInnerHTML={{__html: result.highlightedFields.title}} />
                                : result.title
                              }
                            </h3>
                            <Badge className="bg-gradient-to-r from-yellow-400 to-red-500 text-white border-0 shadow-md">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              {result.rated}
                            </Badge>
                            <div className="text-right ml-auto">
                              <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 mb-1">
                                <List className="h-5 w-5" />
                                <span className="text-xl font-bold">{result.genres.join(', ')}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6 text-red-600 dark:text-red-400 mb-3">
                            <div className="flex items-center gap-2">
                              <Clapperboard className="h-5 w-5 text-red-500" />
                              <span className="font-semibold text-red-800 dark:text-red-200">
                                {result.directors.join(', ')}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <ContactRound className="h-5 w-5 text-red-500" />
                              <span className="font-semibold text-red-800 dark:text-red-200">
                                {result.cast.join(', ')}
                              </span>
                            </div>
                            {/* <div className="flex items-center gap-2">
                              <MapPin className="h-5 w-5 text-yellow-500" />
                              <span>{result.region}</span>
                            </div> */}
                            <div className="flex items-center gap-2">
                              <Clock className="h-5 w-5 text-red-500" />
                              <span>{result.runtime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-5 w-5 text-yellow-500" />
                              <span>{result.year}</span>
                            </div>
                          </div>

                          <p className="text-red-700 dark:text-red-300 text-sm leading-relaxed mb-4">
                            {/* {result.plot} */}
                            {result.hasHighlightedPlot
                              ? <span dangerouslySetInnerHTML={{__html: result.highlightedFields.plot}} />
                              : result.plot
                            }
                          </p>
                          <p className="text-red-700 dark:text-red-300 text-sm leading-relaxed mb-4">
                            {/* {result.fullplot} */}
                            {result.hasHighlightedFullplot
                              ? <span dangerouslySetInnerHTML={{__html: result.highlightedFields.fullplot}} />
                              : result.fullplot
                            }
                          </p>

                          {/* Tags */}
                          <div className="flex items-center gap-2 mb-4">
                            {result.countries.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-yellow-100 dark:hover:bg-yellow-900 transition-colors"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Stats */}
                          <div className="flex items-center gap-6 text-sm text-red-500">
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{result.tomatoes?.viewer ? result.tomatoes.viewer.numReviews : 0} lượt xem</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{result.imdb.votes} đánh giá</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Award className="h-4 w-4" />
                              <span>Rating: {result.imdb.rating}</span>
                            </div>
                            <div className="flex items-center gap-1 ml-auto">
                              <Button className="bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                                Watch
                                <ArrowUpRight className="h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                              </Button>
                            </div>
                            
                          </div>
                        </div>

                        {/* Right Section */}
                        {/* <div className="flex flex-col items-end gap-4">
                          <div className="text-right inline">
                            <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 mb-1">
                              <List className="h-5 w-5" />
                              <span className="text-xl font-bold">{result.genres.join(', ')}</span>
                            </div>
                          </div>

                          <Badge
                            variant="outline"
                            className="border-yellow-200 text-yellow-700 dark:border-yellow-700 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/20"
                          >
                            {result.difficulty}
                          </Badge>
                          <Button className="bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                            Watch
                            <ArrowUpRight className="h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </Button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Enhanced Pagination */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={() => goToPage(query.page - 1)}
            disabled={isPlaceholderData || !data?.hasPrevPage}
            className="h-12 w-12 p-0 rounded-xl border-2 border-red-200 hover:border-yellow-400 disabled:opacity-50 bg-white/80 backdrop-blur-sm"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {pageRange.map((pageNum) => (
            <Button
              key={pageNum}
              variant={query.page === pageNum ? "default" : "outline"}
              size="lg"
              onClick={() => goToPage(pageNum)}
              className={`h-12 w-12 p-0 rounded-xl border-2 transition-all duration-200 backdrop-blur-sm ${
                query.page === pageNum
                  ? "bg-gradient-to-r from-red-600 to-yellow-600 text-white shadow-lg border-transparent"
                  : "border-red-200 hover:border-yellow-400 bg-white/80"
              }`}
            >
              {pageNum}
            </Button>
          ))}

          <Button
            variant="outline"
            size="lg"
            onClick={() => goToPage(query.page + 1)}
            disabled={isPlaceholderData || !data?.hasNextPage}
            className="h-12 w-12 p-0 rounded-xl border-2 border-red-200 hover:border-yellow-400 disabled:opacity-50 bg-white/80 backdrop-blur-sm"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
export default SearchPage
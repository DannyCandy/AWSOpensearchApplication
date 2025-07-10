
export interface Movie {
  _id: string; // ObjectId dưới dạng string
  title: string;
  plot: string;
  fullplot: string;
  genres: string[];
  runtime: number;
  rated: string;
  cast: string[];
  languages: string[];
  released: Date;
  directors: string[];
  writers: string[];
  awards: {
    wins: number;
    nominations: number;
    text: string;
  };
  lastupdated: string; // ngày ở dạng chuỗi (có thể là ISO string)
  year: number;
  imdb: {
    rating: number;
    votes: number;
    id: number;
  };
  countries: string[];
  type: string; // fallback string nếu có các giá trị khác
  tomatoes?: {
    viewer: {
      rating: number;
      numReviews: number;
      meter: number;
    };
    dvd?: Date;
    lastUpdated?: Date;
  };
  num_mflix_comments: number;
  hasHighlightedTitle: boolean;
  hasHighlightedPlot: boolean;
  hasHighlightedFullplot: boolean;
  highlightedFields: {
    title: string;
    plot: string;
    fullplot: string;
  };
}
export interface AggregatedPaginatedResult<T> {
	docs: T[];
	totalDocs: number;
	page: number;
	totalPages: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	prevPage: number | null;
	nextPage: number | null;
}
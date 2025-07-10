// HELPER FUNCTIONS
export function calculatePopularityScore(movie) {
  let score = 0;
  
  if (movie.imdb?.rating) score += movie.imdb.rating * 10;
  if (movie.imdb?.votes) score += Math.log10(movie.imdb.votes) * 5;
  if (movie.tomatoes?.viewer?.rating) score += movie.tomatoes.viewer.rating * 5;
  if (movie.num_mflix_comments) score += movie.num_mflix_comments * 2;
  
  return Math.round(score * 100) / 100;
}

export function generateTitleSuggestions(title) {
  if (!title) return [];
  
  const suggestions = [title];
  const words = title.split(' ').filter(word => word.length > 2);
  
  // Add individual words
  suggestions.push(...words);
  
  // Add partial phrases
  for (let i = 0; i < words.length - 1; i++) {
	suggestions.push(words.slice(i, i + 2).join(' '));
  }
  
  return [...new Set(suggestions)];
}

export function generatePlotSuggestions(plot) {
  if (!plot) return [];
  const words = plot.split(' ')
	.filter(word => word.length > 3)
	.slice(0, 20); // First 20 meaningful words
	
  return words;
}

export function getYearRange(year) {
  if (!year) return ['Unknown'];
  
  if (year < 1950) return ['Classic'];
  if (year < 1980) return ['Vintage'];
  if (year < 2000) return ['Modern'];
  return ['Contemporary'];
}


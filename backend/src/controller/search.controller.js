import { logSearchEvent } from '../lib/cloudwatch-logger.js';

export const searchWithQuery = async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { 
      q = '', 
      sortBy = 'title', 
      order = 'asc',
      filter = '', 
      page = 1,
      size = 10 
    } = req.query;

    const from = (parseInt(page) - 1) * parseInt(size);
    // Build query
    const query = {
      bool: {
        must: [],
        filter: []
      }
    };

    // Add search query if provided
    if (q) {
        query.bool.must.push({
            multi_match: {
            query: q,
            fields: ["title^3","title.autocomplete^2", "plot^1", "fullplot^1"],
            type: "best_fields",
            fuzziness: "AUTO"
            }
        });
    } else {
        query.bool.must.push({ match_all: {} });
    }

    // Add filters
    if (filter) {
        query.bool.filter.push({
            term: { genres: filter }
        });
    }

    // Build sort
    const sortConfig = [];
    if (sortBy === 'title') {
        sortConfig.push({ "title.keyword": { order } });
    } else if (sortBy === 'year') {
        sortConfig.push({ "year": { order } });
    } else if (sortBy === 'rating') {
        sortConfig.push({ "imdb.rating": { order } });
    } else if (sortBy === 'view') {
        sortConfig.push({ "tomatoes.viewer.numReviews": { order } });
    }

    const searchQuery = {
        index: 'movies-optimized',
        body: {
        query,
        sort: sortConfig,
        highlight: {
            pre_tags: ["<mark>"],
            post_tags: ["</mark>"],
            fields: {
            title: { fragment_size: 50, number_of_fragments: 1 },
            plot: { fragment_size: 80, number_of_fragments: 1 },
            fullplot: { fragment_size: 120, number_of_fragments: 2 }
            },
            require_field_match: false
        },
        size: parseInt(size),
        from
        }
    };

    const response = await req.opensearchClient.search(searchQuery);
    
    const totalPages = Math.ceil(response.body.hits.total.value / parseInt(size));
    const hasPrevPage = parseInt(page) > 1;
    const hasNextPage = parseInt(page) < totalPages;
    
    // Process highlights for better frontend handling
    const processedDocs = response.body.hits.hits.map(hit => {
        const doc = {
            ...hit._source,
            _id: hit._id,
            _score: hit._score
        };
        
        // Process highlights
        if (hit.highlight) {
            doc.highlightedFields = {};
            
            // Title highlight
            if (hit.highlight.title) {
            doc.highlightedFields.title = hit.highlight.title[0];
            doc.hasHighlightedTitle = true;
            }
            
            // Plot highlight
            if (hit.highlight.plot) {
            doc.highlightedFields.plot = hit.highlight.plot[0];
            doc.hasHighlightedPlot = true;
            }
            
            // Fullplot highlight
            if (hit.highlight.fullplot) {
            doc.highlightedFields.fullplot = hit.highlight.fullplot.join(' ... ');
            doc.hasHighlightedFullplot = true;
            }
        }
        
        return doc;
    });
    
    const responseTime = Date.now() - startTime;
    
    // Log successful request to CloudWatch
    await logSearchEvent({
      q,
      filter,
      sortBy,
      order,
      resultsCount: response.body.hits.total.value,
      responseTime,
      statusCode: 200,
      success: true
    });
    
    res.json({
        docs: processedDocs,
        hasPrevPage,
        hasNextPage,
        prevPage: hasPrevPage ? parseInt(page) - 1 : null,
        nextPage: hasNextPage ? parseInt(page) + 1 : null,
        page: parseInt(page),
        totalDocs: response.body.hits.total.value,
        totalPages,
    });

  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    console.error('Search error:', error);
    
    // Log error to CloudWatch
    await logSearchEvent({
      q,
      filter,
      sortBy,
      order,
      resultsCount: 0,
      responseTime,
      statusCode: 500,
      success: false,
      errorMessage: error.message,
      errorType: error.name || 'UnknownError'
    });
    
    res.status(500).json({ error: 'Search failed' });
  }
}
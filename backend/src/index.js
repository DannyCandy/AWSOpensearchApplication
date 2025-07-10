import { MongoClient } from 'mongodb';
import { Client } from '@opensearch-project/opensearch';
import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { calculatePopularityScore} from "./lib/helper.js";
import searchRoutes from './routes/search.js';
import { createServer } from "http";

dotenv.config();
const PORT = process.env.PORT;
const MONGO_CONNECT_URL = process.env.MONGO_CONNECT_URL;

// OpenSearch connection
const opensearchClient = new Client({
  node: 'https://search-dannydomain-vjfwlnkm6cgdknezpklqyruypi.ap-southeast-1.es.amazonaws.com',
  auth: {
    username: 'dannycandy',
    password: 'dankb273V@'
  }
});

const app = express();
const httpServer = createServer(app);
app.use(
	cors({
		origin: (origin, callback) => {
			// Allow requests with no origin (mobile apps, etc.)
			if (!origin) return callback(null, true);
			
			// Allow localhost and any IP on port 3000
			if (origin.includes('localhost:3000') || origin.includes(':3000')) {
				return callback(null, true);
			}
			
			callback(new Error('Not allowed by CORS'));
		},
		credentials: true,
	})
);
app.use(express.json());

// Middleware to attach opensearch client
app.use((req, res, next) => {
  req.opensearchClient = opensearchClient;
  next();
});

// Routes
app.use('/api/search', searchRoutes);
httpServer.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});


// OPTIMIZED INDEX CONFIGURATION FOR 40K MOVIES
async function createOptimizedMovieIndex() {
  try {
	await opensearchClient.indices.create({
		index: 'movies-optimized',
		body: {
			settings: {
			// Performance settings for 40K docs
			number_of_shards: 2,
			number_of_replicas: 0,
			refresh_interval: '30s',
			max_result_window: 50000,
			
			analysis: {
				// CUSTOM ANALYZERS
				analyzer: {
				// 1. Movie text analyzer - Tối ưu cho plot/fullplot
					movie_text_analyzer: {
						type: 'custom',
						tokenizer: 'standard',
						filter: [
							'lowercase',
							'movie_stop_filter',
							'movie_stemmer',
						]
					},
					
					// 2. Title analyzer - Tối ưu cho title search
					title_analyzer: {
						type: 'custom',
						tokenizer: 'standard',
						filter: [
							'lowercase',
							'title_stop_filter',
						]
					},
					
					// 3. Autocomplete analyzer - Edge n-gram
					autocomplete_analyzer: {
						type: 'custom',
						tokenizer: 'standard',
						filter: [
							'lowercase',
							'autocomplete_edge_ngram'
						]
					},
					
					// 4. Search analyzer - Cho autocomplete search
					autocomplete_search_analyzer: {
						type: 'custom',
						tokenizer: 'standard',
						filter: ['lowercase']
					},
					
					// 5. Name analyzer - Cho cast/directors
					name_analyzer: {
						type: 'custom',
						tokenizer: 'keyword',
						filter: ['lowercase', 'trim']
					}
				},
				
				// CUSTOM FILTERS
				filter: {
					// Stop words cho movie content
					movie_stop_filter: {
						type: 'stop',
						stopwords: [
							'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
							'movie', 'film', 'story', 'tells', 'about'
						]
					},
					
					// Stop words cho title (ít hơn)
					title_stop_filter: {
						type: 'stop',
						stopwords: ['the', 'a', 'an']
					},
					
					// Stemmer cho English
					movie_stemmer: {
						type: 'stemmer',
						language: 'english'
					},
					
					// Edge n-gram cho autocomplete
					autocomplete_edge_ngram: {
						type: 'edge_ngram',
						min_gram: 2,
						max_gram: 15
					}
				}
			}
			},
			
			mappings: {
			properties: {
				// SEARCH FIELDS với AUTOCOMPLETE
				title: {
				type: 'text',
				analyzer: 'title_analyzer',
				search_analyzer: 'title_analyzer',
				fields: {
					keyword: { 
					type: 'keyword',
					normalizer: 'lowercase'
					},
					autocomplete: {
					type: 'text',
					analyzer: 'autocomplete_analyzer',
					search_analyzer: 'autocomplete_search_analyzer'
					},
				}
				},

				plot: {
				type: 'text',
				analyzer: 'movie_text_analyzer',
				search_analyzer: 'movie_text_analyzer',
				fields: {
					autocomplete: {
					type: 'text',
					analyzer: 'autocomplete_analyzer',
					search_analyzer: 'autocomplete_search_analyzer'
					},
				}
				},
				
				fullplot: {
				type: 'text',
				analyzer: 'movie_text_analyzer',
				search_analyzer: 'movie_text_analyzer',
				fields: {
					autocomplete: {
					type: 'text',
					analyzer: 'autocomplete_analyzer',
					search_analyzer: 'autocomplete_search_analyzer'
					}
				}
				},
				
				// FILTER FIELDS
				genres: {
				type: 'keyword',
				fields: {
					text: {
					type: 'text',
					analyzer: 'standard'
					}
				}
				},
				
				cast: {
				type: 'keyword',
				fields: {
					text: {
					type: 'text',
					analyzer: 'name_analyzer'
					}
				}
				},
				
				directors: {
				type: 'keyword',
				fields: {
					text: {
					type: 'text',
					analyzer: 'name_analyzer'
					}
				}
				},
				
				writers: {
				type: 'keyword',
				},
				
				countries: {
				type: 'keyword'
				},
				
				languages: {
				type: 'keyword'
				},
				
				type: {
				type: 'keyword'
				},
				
				rated: {
				type: 'keyword'
				},
				
				// DATE FIELD với multiple formats
				released: {
				type: 'date',
				format: 'yyyy-MM-dd||yyyy-MM-dd HH:mm:ss||epoch_millis||strict_date_optional_time'
				},
				
				// NUMERIC FIELDS
				year: {
				type: 'integer'
				},
				
				runtime: {
				type: 'integer'
				},
				
				// NESTED OBJECTS
				imdb: {
				type: 'object',
				properties: {
					rating: { type: 'float' },
					votes: { type: 'integer' },
					id: { type: 'integer' }
				}
				},
				
				tomatoes: {
				type: 'object',
				properties: {
					viewer: {
					type: 'object',
					properties: {
						rating: { type: 'float' },
						numReviews: { type: 'integer' },
						meter: { type: 'integer' }
					}
					}
				}
				},
				
				awards: {
				type: 'object',
				properties: {
					wins: { type: 'integer' },
					nominations: { type: 'integer' },
					text: { type: 'text' }
				}
				},
				
				num_mflix_comments: {
				type: 'integer'
				},
				
				// COMPUTED FIELDS cho search optimization
				search_text: {
				type: 'text',
				analyzer: 'movie_text_analyzer'
				},
				
				popularity_score: {
				type: 'float'
				},
				
				decade: {
				type: 'keyword'
				}
			}
			}
		}
	});
	
	console.log('✅ Optimized movie index created successfully');
	
  } catch (error) {
	if (error.body?.error?.type === 'resource_already_exists_exception') {
	  console.log('ℹ️ Index already exists');
	} else {
	  console.error('❌ Error creating index:', error);
	  throw error;
	}
  }
}
async function processBatchOptimized(batch) {
  try {
	const response = await opensearchClient.bulk({
	  body: batch,
	  timeout: '2m',
	  refresh: false // Don't refresh immediately for better performance
	});
	
	if (response.body.errors) {
	  const errors = response.body.items.filter(item => item.index?.error);
	  if (errors.length > 0) {
		console.error(`⚠️ ${errors.length} errors in batch:`, errors[0].index?.error);
	  }
	}
  } catch (error) {
	console.error('❌ Batch processing error:', error);
	throw error;
  }
}
// BULK INSERT với DATA TRANSFORMATION
async function bulkInsertOptimizedMovies() {
	// MongoDB Atlas connection
  const mongoClient = new MongoClient(MONGO_CONNECT_URL);
  
  try {
	console.log('🔄 Starting optimized bulk insert...');
	
	await mongoClient.connect();
	const db = mongoClient.db('sample_mflix');
	const collection = db.collection('movies');
	
	const totalCount = await collection.countDocuments();
	console.log(`📊 Total movies: ${totalCount}`);
	
	const BATCH_SIZE = 500; // Smaller batch for better performance
	let processed = 0;
	
	const cursor = collection.find({}).batchSize(BATCH_SIZE);
	let batch = [];
	
	for await (const movie of cursor) {
	  // TRANSFORM DATA với computed fields
	  const transformedMovie = {
		title: movie.title || '',
		plot: movie.plot || '',
		fullplot: movie.fullplot || movie.plot || '',
		genres: movie.genres || [],
		cast: movie.cast || [],
		directors: movie.directors || [],
		writers: movie.writers || [],
		countries: movie.countries || [],
		languages: movie.languages || [],
		type: movie.type || 'movie',
		rated: movie.rated || 'Not Rated',
		released: movie.released || null,
		year: Number.isInteger(movie.year) ? movie.year : 2025,
		runtime: movie.runtime || null,
		imdb: movie.imdb || {},
		tomatoes: movie.tomatoes || {},
		awards: movie.awards || {},
		num_mflix_comments: movie.num_mflix_comments || 0,
		
		// // COMPUTED FIELDS
		search_text: `${movie.title || ''} ${movie.plot || ''} ${(movie.cast || []).join(' ')}`,
		
		popularity_score: calculatePopularityScore(movie),
		
		decade: movie.year ? `${Math.floor(movie.year / 10) * 10}s` : 'Unknown',
		
		// // SUGGEST FIELDS
		// title_suggest: {
		//   input: generateTitleSuggestions(movie.title),
		//   contexts: {
		// 	genre: movie.genres || [],
		// 	year_range: getYearRange(movie.year)
		//   }
		// },
		
		// plot_suggest: {
		//   input: generatePlotSuggestions(movie.plot)
		// }
	  };
	  
	  batch.push({ index: { _index: 'movies-optimized', _id: movie._id.toString() } });
	  batch.push(transformedMovie);
	  
	  if (batch.length >= BATCH_SIZE * 2) {
		await processBatchOptimized(batch);
		processed += BATCH_SIZE;
		console.log(`📤 Processed ${processed}/${totalCount} movies (${((processed/totalCount)*100).toFixed(1)}%)`);
		batch = [];
	  }
	}
	
	// Process remaining
	if (batch.length > 0) {
	  await processBatchOptimized(batch);
	  processed += batch.length / 2;
	}
	
	console.log(`✅ Optimized bulk insert completed: ${processed} movies`);
	
  } catch (error) {
	console.error('❌ Bulk insert error:', error);
  } finally {
	await mongoClient.close();
  }
}

// MAIN EXECUTION
async function main() {
  try {
	console.log('Server is running on port: '+PORT);
	console.log('🎬 Starting optimized movie index setup...');
	
	// Step 1: Create optimized index
	await createOptimizedMovieIndex();
	
	// Step 2: Bulk insert with optimizations
	await bulkInsertOptimizedMovies();
	
	// Step 3: Refresh index for immediate search
	await opensearchClient.indices.refresh({ index: 'movies-optimized' });
	
	console.log('🎉 Setup completed successfully!');
	console.log('🔍 Ready for search and autocomplete queries');
	
  } catch (error) {
	console.error('❌ Setup failed:', error);
	process.exit(1);
  }
}

// Run the setup (once you run, confirm the existence of "movies-optimized" index then dont run again)
// main();
import { CloudWatchLogsClient, PutLogEventsCommand, CreateLogGroupCommand, CreateLogStreamCommand, DescribeLogGroupsCommand, DescribeLogStreamsCommand } from '@aws-sdk/client-cloudwatch-logs';
// import dotenv from "dotenv";
// dotenv.config()

const client = new CloudWatchLogsClient({
  region: process.env.AWS_REGION || 'ap-southeast-1',
});

const LOG_GROUP = '/movie-search/analytics';
const LOG_STREAM = 'search-logs';

let isInitialized = false;

// Check and create log group/stream only once
async function ensureLogGroupExists() {
  if (isInitialized) {
    console.log('Already initialized, skipping...');
    return;
  }
  
  try {
    // Check if log group exists
    const logGroups = await client.send(new DescribeLogGroupsCommand({
      logGroupNamePrefix: LOG_GROUP
    }));
    
    const groupExists = logGroups.logGroups?.some(group => group.logGroupName === LOG_GROUP);
    
    if (!groupExists) {
      await client.send(new CreateLogGroupCommand({ logGroupName: LOG_GROUP }));
      console.log('Log group created');
    }
    
    // Check if log stream exists
    const logStreams = await client.send(new DescribeLogStreamsCommand({
      logGroupName: LOG_GROUP,
      logStreamNamePrefix: LOG_STREAM
    }));
    
    const streamExists = logStreams.logStreams?.some(stream => stream.logStreamName === LOG_STREAM);
    
    if (!streamExists) {
      await client.send(new CreateLogStreamCommand({
        logGroupName: LOG_GROUP,
        logStreamName: LOG_STREAM
      }));
      console.log('Log stream created');
    }
    
    isInitialized = true;
    console.log('Initialization completed');
    
  } catch (error) {
    console.error('Error ensuring log group exists:', error.message);
  }
}

export async function logSearchEvent(data) {
  try {
    // Ensure log group exists (only runs once)
    await ensureLogGroupExists();
    
    const logEvent = {
      timestamp: Date.now(),
      message: JSON.stringify({
        eventType: data.success ? 'SEARCH_SUCCESS' : 'SEARCH_ERROR',
        searchQuery: data.q || '',
        filter: data.filter || '',
        sortBy: data.sortBy || '',
        sortOrder: data.order || '',
        resultsCount: data.resultsCount || 0,
        responseTime: data.responseTime || 0,
        statusCode: data.statusCode || 200,
        success: data.success !== false,
        errorMessage: data.errorMessage || null,
        errorType: data.errorType || null,
        timestamp: new Date().toISOString(),
        severity: data.statusCode >= 500 ? 'ERROR' : data.statusCode >= 400 ? 'WARN' : 'INFO'
      })
    };

    await client.send(new PutLogEventsCommand({
      logGroupName: LOG_GROUP,
      logStreamName: LOG_STREAM,
      logEvents: [logEvent]
    }));

  } catch (error) {
    console.error('CloudWatch logging failed:', error.message);
  }
}
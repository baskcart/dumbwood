import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();
const tableName = 'Users-1'; // Replace with your DynamoDB table name if different

export const handler = async (event: any) => {
  const item = {
    userId: event.userId || 'unknown',
    name: event.name || 'NoName',
    timestamp: Date.now().toString(),
  };

  const params = {
    TableName: tableName,
    Item: item,
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Item inserted!', item }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Insert failed', details: (error as Error).message }),
    };
  }
};

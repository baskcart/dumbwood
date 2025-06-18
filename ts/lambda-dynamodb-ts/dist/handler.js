"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const tableName = 'Users-1'; // Replace with your DynamoDB table name if different
const handler = async (event) => {
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
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Insert failed', details: error.message }),
        };
    }
};
exports.handler = handler;

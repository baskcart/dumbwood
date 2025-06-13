package dynamodb;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

import java.util.HashMap;
import java.util.Map;

public class DynamoDBLambdaHandler implements RequestHandler<Map<String, Object>, String> {

    private final DynamoDbClient dynamoDbClient = DynamoDbClient.create();
    private static final String TABLE_NAME = "Users"; // Replace if different

    @Override
    public String handleRequest(Map<String, Object> input, Context context) {
        // Accept either "userId" or fallback to "id"
        String userId = (String) input.get("userId");
        if (userId == null) {
            userId = (String) input.get("id"); // Optional fallback
        }

        String name = (String) input.get("name");

        if (userId == null || name == null) {
            return "Error: Missing 'userId' or 'name' in input.";
        }

        Map<String, AttributeValue> item = new HashMap<>();
        item.put("userId", AttributeValue.fromS(userId));  // Must match DynamoDB partition key name
        item.put("name", AttributeValue.fromS(name));

        try {
            PutItemRequest request = PutItemRequest.builder()
                    .tableName(TABLE_NAME)
                    .item(item)
                    .build();

            dynamoDbClient.putItem(request);
            return "Success: Inserted userId = " + userId + ", Name = " + name;

        } catch (DynamoDbException e) {
            return "DynamoDB Error: " + e.getMessage();
        } catch (Exception e) {
            return "Unhandled Error: " + e.getMessage();
        }
    }
}


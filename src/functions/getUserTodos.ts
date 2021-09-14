import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;

  const todo_tasks = await document
    .query({
      TableName: "todos_users",
      KeyConditionExpression: "user_id = :user_id",
      ExpressionAttributeValues: {
        ":user_id": user_id,
      },
      IndexName: "UserIdIndex",
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      todo_tasks,
    }),
  };
};

import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";

interface ICreateTodo {
  id: string;
  user_id: string;
  title: string;
  done: false;
  deadline: Date;
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  const { id, title, done, deadline } = JSON.parse(event.body) as ICreateTodo;

  await document
    .put({
      TableName: "todos_users",
      Item: {
        id,
        user_id,
        title,
        done,
        deadline: new Date(deadline)
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Task created!",
    }),
    headers: {
      "Content-type": "application/json",
    },
  };
};

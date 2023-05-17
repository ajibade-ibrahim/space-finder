import { APIGatewayProxyEvent } from 'aws-lambda'
import { DynamoDBClient, GetItemInput, GetItemCommand, GetItemCommandOutput } from '@aws-sdk/client-dynamodb'

export const getSpaceItem = async (event: APIGatewayProxyEvent, db: DynamoDBClient): Promise<GetItemCommandOutput | null> => {
  if (event.queryStringParameters == null || event.queryStringParameters['id'] == null) {
    return null
  }

  const id = event.queryStringParameters['id'] as string
  const input: GetItemInput = {
    TableName: process.env.TABLE_NAME,
    Key: {
      pk: {
        S: id
      }
    }
  }

  return await db.send(new GetItemCommand(input))
}

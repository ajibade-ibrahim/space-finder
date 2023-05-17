import { APIGatewayProxyEvent } from 'aws-lambda'
import { DynamoDBClient, PutItemCommand, PutItemCommandInput, PutItemCommandOutput } from '@aws-sdk/client-dynamodb'
import { v4 } from 'uuid'

export const putSpaceItem = async (event: APIGatewayProxyEvent, db: DynamoDBClient): Promise<PutItemCommandOutput> => {
  if (event.body == null) {
    throw Error('Event body missing')
  }

  const input: PutItemCommandInput = {
    TableName: process.env.TABLE_NAME,
    Item: {
      pk: {
        'S': v4()
      },
      location: {
        'S': JSON.parse(event.body).location
      }
    }
  }
  return db.send(new PutItemCommand(input))
}

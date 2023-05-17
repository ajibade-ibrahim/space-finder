import { APIGatewayProxyEvent, Context, APIGatewayProxyResultV2 } from 'aws-lambda'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { putSpaceItem } from './put-space'
import { getSpaceItem } from './get-space'

const dbClient = new DynamoDBClient({})

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResultV2> => {
  try {
    switch (event.httpMethod) {
      case 'GET':
        const result = await getSpaceItem(event, dbClient)
        return { statusCode: result == null ? 404: 200, body: JSON.stringify(result?.Item) }
      case 'POST':
        const response = await putSpaceItem(event, dbClient)
        return { statusCode: 201, body: JSON.stringify(response) }
      default:
        console.log('unknown http method')
        return { statusCode: 400 }
    }
  } catch(error){
    console.error(error)
    return {statusCode: 500, body: JSON.stringify(error)}
  }
}

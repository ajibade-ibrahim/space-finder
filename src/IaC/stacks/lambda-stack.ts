import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda'
import { join } from 'path'
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway'
import { ITable } from 'aws-cdk-lib/aws-dynamodb'

interface LambdaStackProps extends StackProps{
  dynamoTable: ITable
}

export class LambdaStack extends Stack {
  public readonly integration: LambdaIntegration

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props)
    const lambdaFunction = new Function(this, 'LambdaFunction', {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(join(__dirname, '..', '..', 'services')),
      handler: 'hello.main',
      environment: {
        TABLE_NAME: props.dynamoTable.tableName
      }
    })

    this.integration = new LambdaIntegration(lambdaFunction)
  }
}

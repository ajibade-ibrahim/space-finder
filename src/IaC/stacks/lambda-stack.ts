import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { join } from 'path'
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway'
import { ITable } from 'aws-cdk-lib/aws-dynamodb'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam'

interface LambdaStackProps extends StackProps{
  dynamoTable: ITable
}

export class LambdaStack extends Stack {
  public readonly integration: LambdaIntegration

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props)
    const lambdaFunction = new NodejsFunction(this, 'LambdaFunction', {
      runtime: Runtime.NODEJS_18_X,
      entry: join(__dirname, '..', '..', 'services', 'spaces', 'space-handler.ts'),
      handler: 'handler',
      environment: {
        TABLE_NAME: props.dynamoTable.tableName
      }
    })

    lambdaFunction.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['s3:ListAllMyBuckets', 's3:ListBucket'],
      resources: ['*']
    }))

    lambdaFunction.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['dynamodb:PutItem', 'dynamodb:GetItem'],
      resources: [props.dynamoTable.tableArn]
    }))

    this.integration = new LambdaIntegration(lambdaFunction)
  }
}

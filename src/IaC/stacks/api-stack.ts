import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { RestApi, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway'

interface ApiStackProps extends StackProps {
  integration: LambdaIntegration
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props)
    const apiGateway = new RestApi(this, 'SpaceApi')
    const spacesResource = apiGateway.root.addResource('spaces')
    spacesResource.addMethod('GET', props.integration)
  }
}

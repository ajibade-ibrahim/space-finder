import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Table, AttributeType, ITable } from 'aws-cdk-lib/aws-dynamodb'
import { getSuffixFromStack } from '../util'

export class DataStack extends Stack {
  public readonly spacesTable: ITable

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    this.spacesTable = new Table(this, 'SpacesTable', {
      tableName: `SpacesTable-${(getSuffixFromStack(this))}`,
      partitionKey: {
        type: AttributeType.STRING,
        name: 'pk'
      }
    })
  }
}

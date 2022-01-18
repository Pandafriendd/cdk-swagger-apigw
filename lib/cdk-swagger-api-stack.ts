import * as cdk from '@aws-cdk/core';
import * as api from '@aws-cdk/aws-apigateway';
import * as assets from '@aws-cdk/aws-s3-assets';

import { join } from 'path';

export class CdkSwaggerApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const fileAsset = new assets.Asset(this, 'SwaggerAsset', {
        path: join(__dirname, '../tmp/swagger_full.yaml')
    });
    
    const restApi = new api.CfnRestApi(this, 'API', {
			endpointConfiguration: {
				types: ['REGIONAL']
			},
	
			bodyS3Location: {
				bucket: fileAsset.s3BucketName,
				key: fileAsset.s3ObjectKey
			}
		});
  }
}

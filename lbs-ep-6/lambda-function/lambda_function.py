import json, boto3
import base64, binascii
from botocore.exceptions import ClientError

def lambda_handler(event, context):
    
    print(event)

    client = boto3.client('sagemaker-runtime')
    
    body = base64.b64decode(event['body'])
    
    try:
        response = client.invoke_endpoint(
            EndpointName='ENDPOINT-NAME-GOES-HERE',
            Body=body,
            ContentType='application/x-image'
        )
        
        body = response['Body']
        data = body.read()
        string = data.decode("utf-8")
        string = string[1:-1]
        values = string.split(",")
        
    except ClientError as e:
        #ret = ("Error: %s" % e)
        values = "Not Sure: {}".format(str(e))

    print(values)

    return {
        'statusCode': 200,
        'headers': {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*",
            "Allow" : "GET, OPTIONS, POST",
            "Access-Control-Allow-Methods" : "GET, OPTIONS, POST",
            "Access-Control-Allow-Headers" : "*"
        },
        'body': json.dumps(values, default=str)
    }
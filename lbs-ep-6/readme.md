# Instructions (Notes)

## Pay attention to your region, make sure that resources are all within the same region. \

These notes are supplimenty to the live stream / video.
(I assume that your SageMaker Endpoint is already live.  Else go back a week...)

Step 1:
- Make note of the SageMaker Endpoint name.
- Create a Lambda function:
    - Paste code into Python function.
    - Insert the SageMaker endpoint name into code.
    - Add SageMaker permissions.

Step 2:
- Create API:
    - HTTP API
    - POST 
    - Select Lambda
 - Make a note of the API URL (inclusing the route).
 - Enable CORS - '*' for everything.

Step 3:
- Create S3 bucket
    - Uncheck "Block all public access"
    - Properties > Static website hosting (get the URL of the bucket).
    - Permisions > Bucket Policy > 

{
  "Version":"2012-10-17",
  "Statement":{
      "Effect":"Allow",
      "Principal": "*",
      "Action":"s3:GetObject",
      "Resource":"ARN/*"
  }
}

Step 4:
 - Edit 'app.js' with the URL for the API.
 - Upload

Step 5:
- Test :) 
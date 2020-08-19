const S3 = require('aws-sdk/clients/s3');

module.exports = new S3({
  region: process.env.AWS_REGION,
  params: { Bucket: process.env.AWS_BUCKET_NAME },
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
});

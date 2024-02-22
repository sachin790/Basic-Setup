const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const crypto = require('crypto');
// Set your AWS credentials and region
const s3Client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
    },
});

// Reusable function to upload a file to S3
async function uploadFileToS3(file, destination, acl = 'public-read') {
    const bucketName = process.env.S3_BUCKET;

    try {
        // Set the parameters for S3 upload
        const params = {
            Bucket: bucketName,
            Key: destination,
            Body: file.data,
            ACL: acl,
        };

        // Upload the file to S3
        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        // Generate a presigned URL for the uploaded object
        let presignedUrl = await getSignedUrl(s3Client, new PutObjectCommand({
            Bucket: bucketName,
            Key: destination,
        }));
        presignedUrl = presignedUrl.split('?')[0];
        return presignedUrl;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}


function genKeyFromFilename(keyBase, fileName, prefixArr) {
    if (fileName.length <= 0) {
        return "";
    }
    var ext = fileName.split(".").pop();
    var key = '';
    if (keyBase && keyBase.length > 0) {
        key += keyBase + "/";
    }
    if (prefixArr && prefixArr.length > 0) {
        key += prefixArr.join("-");
        key += "-";
    }
    key += crypto.randomBytes(8).toString('hex') + "." + ext;

    return key;

};

module.exports = { uploadFileToS3, genKeyFromFilename };
// // Example usage
// const { uploadFileToS3, genKeyFromFilename } = require('../helpers/s3Service');
  // if (payloadData && payloadData.files && payloadData.files.image) {
  //       const file = payloadData.files.image;
  //       let key = genKeyFromFilename(
  //           `productPics`,
  //           file.name || "jpg",
  //           []
  //       );
  //       pararms.imageUrl = await uploadFileToS3(file, key);
  //   }

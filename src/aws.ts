import AWS = require('aws-sdk');
import { config } from './config/config';

const c = config.dev;

//Configure AWS
if(c.aws_profile !== 'DEPLOYED') {
  AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: c.aws_profile});
} else {
  AWS.config.credentials = new AWS.Credentials({
    accessKeyId: c.aws_access_key_id,
    secretAccessKey: c.aws_secret_access_key
  });
}

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: c.aws_region,
  params: {Bucket: c.aws_media_bucket}
});

/* getGetSignedUrl generates an aws signed url to retreive an item
 * @Params
 *    key: string - the filename to be put into the s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getGetSignedUrl( key: string ): string{

  const signedUrlExpireSeconds = 60 * 10
  let url = '';    
  try {
    url = s3.getSignedUrl('getObject', {
      Bucket: c.aws_media_bucket,
      Key: key,
      Expires: signedUrlExpireSeconds
    });
  } catch (e) {
    console.log('getGetSignedUrl', e)
  }
  return url;
}

/* getPutSignedUrl generates an aws signed url to put an item
 * @Params
 *    key: string - the filename to be retreived from s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getPutSignedUrl( key: string ){
  let url = ''  
  const signedUrlExpireSeconds = 60 * 5
  try{
    url = s3.getSignedUrl('putObject', {
      Bucket: c.aws_media_bucket,
      Key: key,
      Expires: signedUrlExpireSeconds
    });
    } catch (e) {
      console.log('getPutSignedUrl ', e)
    }
    return url
}

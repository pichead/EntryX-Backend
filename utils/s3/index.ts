import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { UUID } from 'utils/uuid';
import { extname } from 'path';
import { env } from 'utils/constant';

const AWS_S3_BUCKET = env.s3BucketName;
const AWS_S3_REGION = env.s3BucketRegion;
const AWS_S3_SECRET_ACCESS_KEY = env.s3SecretKey;
const AWS_S3_ACCESS_KEY = env.s3AccessKey;
const cdnUrl = env.s3CdnUrl

const s3 = new S3Client({
  credentials: {
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
  },
  region: AWS_S3_REGION,
});

const save = async (file: Express.Multer.File, folder: string) => {
  const AWS_S3_URL = cdnUrl ? `${cdnUrl}` : `https://s3.${AWS_S3_REGION}.amazonaws.com/${AWS_S3_BUCKET}`;
  const { originalname } = file;
  const id = await UUID();
  const filepath = extname(originalname);
  const fileName = id + "_" + folder + filepath
  const key = `${folder}/${fileName}`;
  const fileType = file.mimetype
  const params = {
    Bucket: AWS_S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: fileType,
  };

  const command = new PutObjectCommand(params);

  try {
    const save = await s3.send(command);
    const fileUrl = `${AWS_S3_URL}/${key}`;

    if (save && save['$metadata'].httpStatusCode === 200) {
      return { src: fileUrl, fileName: fileName, path: key, type: fileType };
    }
    else {
      return null
    }
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw new Error('File upload failed');
  }
};


const remove = async (filename: string, folder: string) => {
  const params = {
    Bucket: AWS_S3_BUCKET,
    Key: `${folder}/${filename}`
  }

  const command = new DeleteObjectCommand(params)

  const removeFile = await s3.send(command)

  return { removeFile }
}


export const S3 = {
  save,
  remove
}





// const s3 = new AWS_S3.S3({
//   // endpoint: AWS_S3_END_POINT,
//   credentials: {
//     accessKeyId: AWS_S3_ACCESS_KEY,
//     secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
//   },
//   region: AWS_S3_REGION,
// });

// export async function saveFile(file: any, folder: string) {
//   const id = await UUID();
//   const s3_upload = async (file, bucket: string, name: string, mimetype) => {

//     const filepath = extname(name)
//     const params = {
//       Bucket: bucket,
//       Key: `${folder}/${id + folder + filepath}`,
//       Body: file,
//       ACL: 'public-read' as const,
//       ContentType: mimetype,
//       ContentDisposition: 'inline',
//       CreateBucketConfiguration: {
//         LocationConstraint: AWS_S3_REGION,
//       },
//     };
//     try {
//       const data = await s3.send(new AWS_S3.PutObjectCommand(params));
//       console.log("s3 data : ", data)
//       return data;
//     } catch (e) {
//       console.log(e);
//       return null
//     }
//   };

//   const { originalname } = file;

//   return await s3_upload(
//     file.buffer,
//     AWS_S3_BUCKET,
//     originalname,
//     file.mimetype,
//   );
// }

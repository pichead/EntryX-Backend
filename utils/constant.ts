
export const cors = [

]


export const env = {
  appClientUrl: process.env.APP_CLIENT_URL,
  appฺฺBackofficeUrl: process.env.APP_BACKOFFICE_URL,
  appPort: process.env.PORT ? process.env.PORT : 3333,
  cors: process.env.CORS_ORIGIN ? JSON.parse(process.env.CORS_ORIGIN) : [],
  appNameTH: process.env.APP_NAME_TH ? process.env.APP_NAME_TH : 'เว็บไซต์',
  appNameEN: process.env.APP_NAME_EN ? process.env.App_NAME_EN : 'Website',

  saltOrRounds: process.env.BCRYPT_SALTORROUNDS
    ? parseInt(process.env.BCRYPT_SALTORROUNDS)
    : 10,
  jwtEmailKey: process.env.JWT_EMAIL_SECRET_KEY,
  jwtAccessKey: process.env.JWT_ACCESS_SECRET_KEY,
  jwtAccessExpTime: process.env.JWT_ACCESS_EXPIRATION_TIME
    ? parseInt(process.env.JWT_ACCESS_EXPIRATION_TIME)
    : 300,
  jwtRefreshKey: process.env.JWT_REFRESH_SECRET_KEY,
  jwtRefreshExpTime: process.env.JWT_REFRESH_EXPIRATION_TIME
    ? parseInt(process.env.JWT_REFRESH_EXPIRATION_TIME)
    : 604800,
  apiPrefix: process.env.API_PREFIX ? process.env.API_PREFIX : '/api',


  emailAuthUser: process.env.EMAIL_AUTH_USER,
  emailAuthPassword: process.env.EMAIL_AUTH_PASSWORD,
  emailNoreplySenderName: process.env.EMAIL_NOREPLY_SENDERNAME,
  emailPromoSenderName: process.env.EMAIL_PROMO_SENDERNAME,
  emailSupportSenderName: process.env.EMAIL_SUPPORT_SENDERNAME,
  emailContactSenderName: process.env.EMAIL_CONTACT_SENDERNAME,
  emailChangePasswordUrl: process.env.RESET_PASSWORD_URL,
  emailExpChangePasswordUrl: process.env.TIME_EXP_RESET_PASSWORD ? parseInt(process.env.TIME_EXP_RESET_PASSWORD) : 900,

  lineNotiAccessToken: process.env.LINE_NOTI_ACCESS_TOKEN,

  firebaseApiKey: process.env.FIREBASE_API_KEY,
  firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
  firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  firebaseAppId: process.env.FIREBASE_APP_ID,
  firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,

  s3CdnUrl: process.env.S3_CDN_URL,
  s3BucketName: process.env.S3_BUCKET_NAME,
  s3BucketRegion: process.env.S3_BUCKET_REGION,
  s3AccessKey: process.env.S3_ACCESS_KEY_ID,
  s3SecretKey: process.env.S3_SECRET_ACCESS_KEY
};

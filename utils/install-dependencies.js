const modules = [
  'nodemailer',
  'firebase',
  'crypto',
  'jsonwebtoken',
  'axios',
  'bcrypt',
  '@aws-sdk/client-s3',
  'uuid',
  'xlsx',
  'path',
  'firebase-admin',
];

const { exec } = require('child_process');

const installDependencies = () => {
  const command = `npm install ${modules.join(' ')}`;
  console.log('Running command:', command);

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error('Error installing dependencies:', err);
      process.exit(1);
    }
    console.log('Dependencies installed successfully');
    console.log(stdout);
    console.error(stderr);
  });
};

installDependencies();

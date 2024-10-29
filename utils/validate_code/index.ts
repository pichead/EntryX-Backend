import { FORMAT } from '../format';
import { TIME } from '../time';

const arg = (argNum: number, data: number, base: number) => {
  if (argNum === 1) {
    return data + base;
  }
  if (argNum === 2) {
    return data * base;
  }
  if (argNum === 3) {
    return data + base + base;
  }
  if (argNum === 4) {
    return data + data;
  }
  if (argNum === 5) {
    return data + data + base;
  }
};

const createCode = (codeBase: string) => {
  const unixNow = TIME.timestampNow();
  const base = FORMAT.oneToTwoString(codeBase.toString());

  const baseNum = parseInt(base); //12
  const random1 = Math.floor(Math.random() * 71); //40
  const code1 = parseInt(base) + random1; //52
  const random2 = Math.floor(Math.random() * 71);
  const code2 = parseInt(base) + random2;
  const random3 = Math.floor(Math.random() * 71);
  const code3 = parseInt(base) + random3;

  const arg1 = Math.floor(Math.random() * 5) + 1;
  const arg2 = Math.floor(Math.random() * 5) + 1;
  const arg3 = Math.floor(Math.random() * 5) + 1;

  const hashdata = () => {
    let data =
      arg(arg1, random1, baseNum) +
      arg(arg2, random2, baseNum) +
      arg(arg3, random3, baseNum);
    return data;
  };

  const result =
    base +
    FORMAT.oneToTwoString(code1.toString()) +
    FORMAT.oneToTwoString(code2.toString()) +
    FORMAT.oneToTwoString(code3.toString()) +
    hashdata() +
    unixNow.toString()[4] +
    unixNow.toString()[5] +
    unixNow.toString()[6] +
    unixNow.toString()[7] +
    unixNow.toString()[8] +
    unixNow.toString()[9] +
    arg1 +
    arg2 +
    arg3;

  return result;
}

const validate = (code: string, exptime?: number) => {
  const stringLen = code.length;
  const unixNow = TIME.timestampNow();
  const unixNowString = unixNow.toString();
  const timeString1 =
    unixNowString[4] +
    unixNowString[5] +
    unixNowString[6] +
    unixNowString[7] +
    unixNowString[8] +
    unixNowString[9];

  const timeNum = parseInt(timeString1);
  const codeTimeString =
    code[stringLen - 9] +
    code[stringLen - 8] +
    code[stringLen - 7] +
    code[stringLen - 6] +
    code[stringLen - 5] +
    code[stringLen - 4];

  const codeTimeNum = parseInt(codeTimeString);


  const validExp = codeTimeNum + exptime > timeNum;

  if (validExp === false) {
    return { status: 'error', message: 'code is expire', messageTH: 'code หมดอายุ' };
  } else {
    const base = code[0] + code[1];
    const baseNum = parseInt(base);

    const random1 = parseInt(code[2] + code[3]) - baseNum;

    const code1 = parseInt(code[2] + code[3]);
    const random2 = parseInt(code[4] + code[5]) - baseNum;
    const code2 = parseInt(code[4] + code[5]);
    const random3 = parseInt(code[6] + code[7]) - baseNum;
    const code3 = parseInt(code[6] + code[7]);

    const arg1 = parseInt(code[stringLen - 3]);
    const arg2 = parseInt(code[stringLen - 2]);
    const arg3 = parseInt(code[stringLen - 1]);

    const hashdata = () => {


      let data =
        arg(arg1, random1, baseNum) +
        arg(arg2, random2, baseNum) +
        arg(arg3, random3, baseNum);

      return data;
    };


    const decode =
      base +
      FORMAT.oneToTwoString(code1.toString()) +
      FORMAT.oneToTwoString(code2.toString()) +
      FORMAT.oneToTwoString(code3.toString()) +
      hashdata() +
      codeTimeString +
      arg1 +
      arg2 +
      arg3;

    if (code === decode) {
      return { status: 'ok', message: 'code is valid', messageTH: 'ยืนยัน code สำเร็จ' };
    } else {
      return { status: 'error', message: 'code is not valid', messageTH: 'ยืนยัน code ไม่สำเร็จ' };
    }
  }
}

export const VALIDATE_CODE = {
  create: createCode,
  validate: validate
}
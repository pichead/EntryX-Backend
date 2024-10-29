import { HttpException } from '@nestjs/common';



export const resOk = (
  code: number,
  en: string,
  th: string,
  data: { [key: string]: any },
) => {

  return {
    messageEn: en,
    messageTh: th,
    statusCode: code,
    data: data,
  };
};

export const resExcept = (code: number, en: string, th: string) => {
  throw new HttpException(
    {
      messageEn: en,
      messageTh: th,
      statusCode: code,
    },
    code,
  );
};

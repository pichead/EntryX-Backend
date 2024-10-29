import * as jwt from 'jsonwebtoken';
import { env } from '../constant';
import { TIME } from '../time';

const exposeAccess = async (
  token: string,
): Promise<{ [key: string]: any } | null> => {
  try {
    const objData = await jwt.decode(token, { json: true });

    if (objData && objData.iat + env.jwtAccessExpTime > TIME.timestampNow()) {
      return objData;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const exposeRefresh = async (
  token: string,
): Promise<{ [key: string]: any } | null> => {
  try {
    const objData = await jwt.decode(token, { json: true });

    if (objData && objData.iat + env.jwtRefreshExpTime > TIME.timestampNow()) {
      return objData;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const generateAccessKey = async (payload: {
  [key: string]: any;
}): Promise<string | null> => {
  try {
    const jwtToken = await jwt.sign({ ...payload, tokenType: "access" }, env.jwtAccessKey);
    return jwtToken || null;
  } catch (error) {
    console.log('error at gen access token');
    console.error(error);
    return null;
  }
};

const generateRefreshKey = async (payload: {
  [key: string]: any;
}): Promise<string | null> => {
  try {
    const jwtToken = await jwt.sign({ ...payload, tokenType: "refresh" }, env.jwtRefreshKey);
    return jwtToken || null;
  } catch (error) {
    console.log('error at gen refresh token');
    console.error(error);
    return null;
  }
};


const changePassword = async (email: string) => {
  try {
    const jwtToken = await jwt.sign({ email, tokenType: "change-password" }, process.env.JWT_REFRESH_SECRET_KEY);
    return jwtToken || null;
  } catch (error) {
    console.log('error at gen refresh token');
    console.error(error);
    return null;
  }
}

const exposeChangePassword = async (token: string) => {

  try {
    const objData = await jwt.decode(token, { json: true });

    if (objData && objData.iat + env.emailExpChangePasswordUrl > TIME.timestampNow()) {
      return objData;
    } else {
      return null;
    }
  } catch (error) {
    console.log('error at expose reset password')
    console.log(error)
    return null
  }

}

export const JWT = {
  access: {
    create: generateAccessKey,
    expose: exposeAccess,
  },
  refresh: {
    create: generateRefreshKey,
    expose: exposeRefresh,
  },
  mail: {
    changePassword: changePassword,
    expose: exposeChangePassword
  }
};

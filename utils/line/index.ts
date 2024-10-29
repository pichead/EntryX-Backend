import axios from 'axios';
import { env } from '../constant';


interface Notify {
  message: string;
  imageThumbnail?: string;
  imageFullsize?: string;
  imageFile?: any;
  stickerPackageId?: number;
  stickerId?: number;
  notificationDisabled?: boolean;
}

const notify = async (payload: Notify) => {
  const formData = new FormData();

  formData.append('message', payload.message);
  if (payload.imageThumbnail)
    formData.append('imageThumbnail', payload.imageThumbnail);
  if (payload.imageFullsize)
    formData.append('imageFullsize', payload.imageFullsize);
  if (payload.imageFile) formData.append('imageFile', payload.imageFile);
  if (payload.stickerPackageId)
    formData.append('stickerPackageId', payload.stickerPackageId.toString());
  if (payload.stickerId)
    formData.append('stickerId', payload.stickerId.toString());
  if (payload.notificationDisabled !== undefined)
    formData.append(
      'notificationDisabled',
      payload.notificationDisabled.toString(),
    );

  try {

    const noti = await axios({
      method: 'POST',
      url: 'https://notify-api.line.me/api/notify',
      headers: { Authorization: `Bearer ${env.lineNotiAccessToken}`, 'content-type': 'multipart/form-data' },
      data: formData
    })

    return noti.data;

  } catch (error) {
    console.log(error);
    return null;
  }
}


export const LINE = {
  notify: notify
}

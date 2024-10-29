import {
  firestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  deleteDoc,
} from './config';

import { UUID } from 'utils/uuid';
import { extname } from 'path';

// const galleryRef = collection(firestore, "gallery");
let storage = getStorage();

const firebaseSaveFile = async (file: any, folderName: string) => {
  try {
    const id = await UUID();
    const pathName = extname(file.originalname)
    const timestamp = String(Math.round(+new Date() / 1000));
    let newFilename = timestamp + id + pathName;
    const storageRef = ref(storage, folderName + '/' + newFilename);
    const fileBuffer = Buffer.from(file.buffer);
    const mimeType = file.mimetype;

    const uploadTask = await uploadBytesResumable(storageRef, fileBuffer, {
      contentType: mimeType,
    });
    const geturl = await getDownloadURL(uploadTask.ref);

    return { name: newFilename, url: geturl, path: folderName + '/' + newFilename };
  } catch (error) {
    console.log(error)
    return null

  }
};

const firebaseDeleteFile = async (filename: string, folderName: string) => {
  const desertRef = ref(storage, '/' + folderName + '/' + filename);
  const remove = await deleteObject(desertRef);
  console.log(remove);
  return 'successfully deleted';
};


export { firebaseSaveFile, firebaseDeleteFile };

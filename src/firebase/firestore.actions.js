import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

export const db = getFirestore();

export const addDocument = async (collectionRef, data) => {
  try {
    const docId = await addDoc(collectionRef, data);
    return { docId };
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllDocuments = async (Query) => {
  const querySnapshot = await getDocs(Query);
  const docs = [];
  querySnapshot.forEach((doc) => {
    docs.push(doc.data());
  });
  return docs;
};

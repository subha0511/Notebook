import { useState } from "react";
import NoteDetail from "./NoteDetail";
import Favourite from "./Favourite";
import { serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firestore.config";
import { ToastLoading, ToastSuccess, ToastError } from "./Toast";
import { toast } from "react-hot-toast";

function Note({ data }) {
  const [openModal, setOpenModal] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  const handleCancel = () => setOpenModal(false);

  let dateString = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
    .format(data?.lastEdited?.toDate())
    .split(" ")
    .join(" ");

  const handlePinned = async () => {
    const documentBody = {
      title: data?.title,
      tagline: data?.tagline,
      body: data?.body,
      createdAt: data?.createdAt,
      colour: data?.colour,
      pinned: !data?.pinned,
      lastEdited: serverTimestamp(),
    };
    const docRef = doc(db, "notes", data?.id);
    setFavLoading(true);
    const toastId = ToastLoading({ message: "Pinning Note..." });
    try {
      await updateDoc(docRef, documentBody);
      setFavLoading(false);
      toast.dismiss(toastId);
      ToastSuccess({ message: "Note Pinned..." });
    } catch (error) {
      console.log(error);
      setFavLoading(false);
      toast.dismiss(toastId);
      ToastError({ message: "Pinning Failed..." });
    }
  };

  return (
    <>
      <div
        className={`p-4 mb-6 h-max break-inside-avoid rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 relative group ${
          data?.colour ? `bg-${data?.colour}-300` : "border-1 bg-gray-100"
        }`}
        onClick={() => setOpenModal(true)}
      >
        <h3 className="mb-1.5 text-2xl antialiased font-medium tracking-tight text-slate-800 line-clamp-2">
          {data?.title}
        </h3>
        <p className="mb-2.5 text-xs italic font-medium text-slate-600">
          {data?.tagline}
        </p>
        <p className="mb-2.5 text-base text-stone-800 line-clamp-6">
          {data?.body}
        </p>
        <div className="text-xs text-right text-stone-800">
          Edited : {dateString}
        </div>
        <div className="absolute transition-all duration-200 scale-0 right-5 top-5 group-hover:scale-100">
          <Favourite
            active={data?.pinned}
            onClick={handlePinned}
            isLoading={favLoading}
          />
        </div>
      </div>
      {openModal && (
        <NoteDetail data={data} isOpen={openModal} close={handleCancel} />
      )}
    </>
  );
}

export default Note;

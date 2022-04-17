import { useRef } from "react";
import { Dialog } from "@headlessui/react";
import { useNoteModal } from "../contexts/modal.context";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./../firebase/firestore.config";
import { ToastError, ToastLoading, ToastSuccess } from "./Toast/index";
import { toast } from "react-hot-toast";

function NoteDetail({ data, isOpen, close, refetch }) {
  const { syncNote } = useNoteModal();
  const initialRef = useRef();

  const handleEdit = () => {
    syncNote(data);
    close();
  };

  const handleDelete = async () => {
    const docRef = doc(db, "notes", data?.id);
    const toastId = ToastLoading({ message: "Deleting Note..." });
    try {
      await deleteDoc(docRef);
      refetch();
      toast.dismiss(toastId);
      ToastSuccess({ message: "Note Deleted..." });
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      ToastError({ message: "Delete Failed..." });
    }
    close();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      initialFocus={initialRef}
      className="fixed inset-0 z-10 overflow-y-auto "
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />

        <div
          className={`relative mx-8 box-content w-full md:w-auto md:max-w-screen-md p-6 md:mx-auto ${
            data?.colour ? `bg-${data?.colour}-300` : "border-1 bg-gray-100"
          } transition-all duration-300 rounded-l-xl rounded-r max-h-[70vh] overflow-y-scroll overflow-x-hidden light-scrollbar overflow-hidden`}
        >
          <div className="max-w-sm min-w-full md:w-96">
            <Dialog.Title>
              <div
                className="mb-3 text-2xl antialiased font-medium tracking-tight break-words text-slate-800"
                ref={initialRef}
              >
                {data?.title}
              </div>
            </Dialog.Title>
            <Dialog.Description className="mb-5 text-xs italic font-medium break-words text-slate-600">
              {data?.tagline}
            </Dialog.Description>

            <div className="mb-2.5 text-base text-stone-800 break-words line-clamp-6">
              {data?.body}
            </div>

            <div className="flex justify-between w-full pt-2">
              <button
                className={`px-5 py-1 font-medium rounded-full focus:outline-none
                    border-2 border-red-400 text-red-500 hover:bg-red-400 hover:text-white transition-all duration-300 cursor-pointer`}
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className={`px-5 py-1 font-medium rounded-full focus:outline-none
                    border-2 border-neutral-500 text-neutral-600 hover:bg-neutral-500 hover:text-white transition-all duration-300 cursor-pointer`}
                onClick={handleEdit}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default NoteDetail;

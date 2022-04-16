import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useNoteModal } from "../contexts/modal.context";
import {
  serverTimestamp,
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ToastLoading, ToastSuccess, ToastError } from "./Toast";
import { toast } from "react-hot-toast";
import { db } from "../firebase/firestore.config";

const collectionRef = collection(db, "notes");

function NoteForm() {
  const {
    open: isOpen,
    closeNote: close,
    data,
    colour,
    setTitle,
    setTagline,
    setBody,
    pinned,
    document_id,
  } = useNoteModal();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const documentBody = {
      ...data,
      colour,
      pinned,
      lastEdited: serverTimestamp(),
    };
    if (!document_id) {
      documentBody.createdAt = serverTimestamp();
      const toastId = ToastLoading({ message: "Saving Note..." });
      try {
        const docId = await addDoc(collectionRef, documentBody);
        setIsLoading(false);
        toast.dismiss(toastId);
        ToastSuccess({ message: "Note Saved..." });
        close();
      } catch (error) {
        console.log(error);
        toast.dismiss(toastId);
        ToastError({ message: "Save Failed..." });
      }
    } else {
      const docRef = doc(db, "notes", document_id);
      const toastId = ToastLoading({ message: "Updating Note..." });
      try {
        await updateDoc(docRef, documentBody);
        setIsLoading(false);
        toast.dismiss(toastId);
        ToastSuccess({ message: "Note Updated..." });
        close();
      } catch (error) {
        console.log(error);
        toast.dismiss(toastId);
        ToastError({ message: "Update Failed..." });
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />

        <div
          className={`relative max-w-screen-md p-6 mx-auto ${colors[colour][3]} transition-all duration-300 w-max w-screen-sm rounded-xl`}
        >
          <div className="w-96">
            <Dialog.Title>
              <div className="mb-2">
                <input
                  className="w-full px-3 py-2 text-xl font-medium text-gray-800 transition-all duration-200 bg-white bg-opacity-0 rounded-lg focus:outline-none placeholder:text-gray-600 placeholder:font-medium placeholder:text-xl hover:bg-opacity-25 focus:bg-opacity-25"
                  placeholder="Title"
                  value={data?.title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={120}
                />
              </div>
            </Dialog.Title>
            <Dialog.Description className="mb-3">
              <input
                className="w-full px-3 py-1 text-xs italic font-medium text-gray-700 transition-all duration-200 bg-white bg-opacity-0 rounded-md focus:outline-none placeholder:text-gray-500 placeholder:font-normal placeholder:text-xs hover:bg-opacity-25 focus:bg-opacity-25 focus:py-2"
                placeholder="Tagline..."
                value={data?.tagline}
                onChange={(e) => setTagline(e.target.value)}
                maxLength={100}
              />
            </Dialog.Description>

            <textarea
              className="w-full px-3 py-2 mb-2 text-base font-medium text-gray-700 transition-all duration-200 bg-white bg-opacity-0 rounded-lg resize-y focus:outline-none placeholder:text-gray-600 placeholder:font-normal placeholder:text-base hover:bg-opacity-25 focus:bg-opacity-25 light-scrollbar caret-transparent focus:caret-black"
              placeholder="Take a note..."
              rows={5}
              value={data?.body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={1000}
            />

            <div className="flex justify-between">
              <div className="flex items-center px-3 gap-x-6">
                <ColorKnobs />
              </div>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`px-5 py-1.5 rounded-lg ${colors[colour][4]} hover:${
                  colors[colour][5]
                } text-white ${isLoading ? "cursor-wait" : "cursor-pointer"} `}
              >
                {isLoading ? (
                  <svg
                    role="status"
                    className="inline w-5 h-5 text-gray-200 animate-spin dark:text-white dark:text-opacity-40 fill-gray-100 dark:fill-gray-100"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : (
                  <>{document_id ? "Update" : "Save"}</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default NoteForm;

const ColorKnobs = () => {
  const { setColour, colour } = useNoteModal();

  return (
    <>
      {Object.keys(colors).map((color) => (
        <div
          key={color}
          className={`w-3 h-3 rounded-full cursor-pointer ${
            colors[color][3]
          } shadow-knob ${colour === color ? "scale-125" : ""}`}
          onClick={() => setColour(color)}
        ></div>
      ))}
    </>
  );
};

const colors = {
  neutral: [
    "bg-neutral-50",
    "bg-neutral-100",
    "bg-neutral-200",
    "bg-neutral-300",
    "bg-neutral-400",
    "bg-neutral-500",
    "bg-neutral-600",
  ],
  cyan: [
    "bg-cyan-50",
    "bg-cyan-100",
    "bg-cyan-200",
    "bg-cyan-300",
    "bg-cyan-400",
    "bg-cyan-500",
    "bg-cyan-600",
    "bg-cyan-700",
    "bg-cyan-800",
    "bg-cyan-900",
  ],
  green: [
    "bg-green-50",
    "bg-green-100",
    "bg-green-200",
    "bg-green-300",
    "bg-green-400",
    "bg-green-500",
    "bg-green-600",
    "bg-green-700",
    "bg-green-800",
    "bg-green-900",
  ],
  yellow: [
    "bg-yellow-50",
    "bg-yellow-100",
    "bg-yellow-200",
    "bg-yellow-300",
    "bg-yellow-400",
    "bg-yellow-500",
    "bg-yellow-600",
    "bg-yellow-700",
    "bg-yellow-800",
    "bg-yellow-900",
  ],
  red: [
    "bg-red-50",
    "bg-red-100",
    "bg-red-200",
    "bg-rose-300",
    "bg-red-400",
    "bg-red-500",
    "bg-red-600",
    "bg-red-700",
    "bg-red-800",
    "bg-red-900",
  ],
  fuchsia: [
    "bg-fuchsia-50",
    "bg-fuchsia-100",
    "bg-fuchsia-200",
    "bg-indigo-300",
    "bg-indigo-400",
    "bg-fuchsia-500",
    "bg-fuchsia-600",
    "bg-fuchsia-700",
    "bg-fuchsia-800",
    "bg-fuchsia-900",
  ],
};

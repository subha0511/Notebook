import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useNoteModal } from "../contexts/modal.context";

function NoteDetail({ data, isOpen, close }) {
  const { syncNote } = useNoteModal();

  const handleEdit = () => {
    syncNote(data);
    close();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      className="fixed inset-0 z-10 overflow-y-auto "
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />

        <div
          className={`relative max-w-screen-md p-6 mx-auto ${
            data?.colour ? `bg-${data?.colour}-300` : "border-1 bg-gray-100"
          } transition-all duration-300 rounded-l-xl rounded-r max-h-[70vh] overflow-y-scroll overflow-x-hidden light-scrollbar overflow-hidden`}
        >
          <div className="w-96">
            <Dialog.Title>
              <div className="mb-3 text-2xl antialiased font-medium tracking-tight text-slate-800">
                {data?.title}
              </div>
            </Dialog.Title>
            <Dialog.Description className="mb-5 text-xs italic font-medium text-slate-600">
              {data?.tagline}
            </Dialog.Description>

            <div className="mb-2.5 text-base text-stone-800 line-clamp-6">
              {data?.body}
            </div>

            <div className="flex justify-between">
              <button
                className={`px-5 py-1 font-medium ml-auto rounded-full focus:outline-none
                    border border-neutral-500 text-neutral-700 hover:scale-105 transition-all duration-300 cursor-pointer`}
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

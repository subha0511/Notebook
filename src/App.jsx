import { useState } from "react";
import Note from "./components/Note";
import "./firebase/firestore.config";
import {
  collection,
  query,
  getDocs,
  getFirestore,
  orderBy,
} from "firebase/firestore";
import NoteForm from "./components/NoteForm";
import { useNoteModal } from "./contexts/modal.context";
import useAsyncInterval from "./hooks/useAsyncInterval";
import { Toaster } from "react-hot-toast";
import Pagination from "./components/Pagination";
import PinnedNotes from "./containers/PinnedNotes";
import UnpinnedNotes from "./containers/UnpinnedNotes";

const db = getFirestore();

const collectionRef = collection(db, "notes");
const getAllNotesQuery = query(
  collection(db, "notes"),
  orderBy("createdAt", "desc")
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState(null);

  const { createNote } = useNoteModal();

  const { data: allDocs, reset } = useAsyncInterval(async () => {
    const querySnapshot = await getDocs(getAllNotesQuery);
    setIsLoading(false);
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
  }, 5000);

  const pinnedDocs = allDocs?.filter((item) => item?.pinned);
  const unpinnedDocs = allDocs?.filter((item) => !item?.pinned);

  const setCurrentNull = () => setCurrent(null);
  const setCurrentPinned = () => setCurrent("PINNED");
  const setCurrentUnpinned = () => setCurrent("UNPINNED");

  return (
    <>
      <div className="relative min-h-screen pt-20 pb-10 max-w-screen">
        <header className="flex justify-between max-w-screen-md mx-8 sm:mx-10 lg:mx-auto mb-10">
          <div className="text-4xl font-bold text-white">Notes</div>
          <div
            className="text-sm font-medium py-2.5 px-4 border border-white rounded-full text-gray-100 cursor-pointer"
            onClick={createNote}
          >
            Add Note
          </div>
        </header>
        {/* <section className="max-w-screen-md mx-auto">
          <div className="p-1.5 text-gray-700 uppercase font-medium">All</div>
          <div className="columns-3 align-items-stretch">
            {isLoading ? (
              <>
                <div
                  className={`bg-gray-300 animate-pulse mb-5 rounded-lg p-5 h-24 break-inside-avoid w-full`}
                ></div>
                <div
                  className={`bg-gray-300 animate-pulse mb-5 rounded-lg p-5 h-56 break-inside-avoid w-full`}
                ></div>
                <div
                  className={`bg-gray-300 animate-pulse mb-5 rounded-lg p-5 h-36 break-inside-avoid w-full`}
                ></div>
                <div
                  className={`bg-gray-300 animate-pulse mb-5 rounded-lg p-5 h-48 break-inside-avoid w-full`}
                ></div>
                <div
                  className={`bg-gray-300 animate-pulse mb-5 rounded-lg p-5 h-72 break-inside-avoid w-full`}
                ></div>
              </>
            ) : (
              <>
                {allDocs
                  ?.slice(pageIndex * 5, (pageIndex + 1) * 5)
                  ?.map((doc) => (
                    <Note data={doc} key={doc.id} />
                  ))}
              </>
            )}
          </div>
          <Pagination
            pageIndex={pageIndex}
            limit={allDocs?.length || 0}
            isLoading={isLoading}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
          />
        </section> */}
        {current !== "UNPINNED" && (
          <PinnedNotes
            isLoading={isLoading}
            data={pinnedDocs}
            active={current === "PINNED"}
            onBack={setCurrentNull}
            seeAll={setCurrentPinned}
          />
        )}
        {current !== "PINNED" && (
          <UnpinnedNotes
            isLoading={isLoading}
            data={unpinnedDocs}
            active={current === "UNPINNED"}
            onBack={setCurrentNull}
            seeAll={setCurrentUnpinned}
          />
        )}
        <div className="h-[50vh] min-h-[16rem] bg-violet-500 absolute left-0 right-0 top-0 -z-10"></div>
        <NoteForm />
      </div>
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;

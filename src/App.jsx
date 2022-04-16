import { useState } from "react";
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
import useFetchInterval from "./hooks/useFetchInterval";
import { Toaster } from "react-hot-toast";
import PinnedNotes from "./containers/PinnedNotes";
import UnpinnedNotes from "./containers/UnpinnedNotes";

const db = getFirestore();

const getAllNotesQuery = query(
  collection(db, "notes"),
  orderBy("createdAt", "desc")
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState(null);

  const { createNote } = useNoteModal();

  const { data: allDocs, refetch } = useFetchInterval(async () => {
    const querySnapshot = await getDocs(getAllNotesQuery);
    setIsLoading(false);
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
  }, 60000);

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
        {current !== "UNPINNED" && (
          <PinnedNotes
            isLoading={isLoading}
            data={pinnedDocs}
            active={current === "PINNED"}
            onBack={setCurrentNull}
            seeAll={setCurrentPinned}
            refetch={refetch}
          />
        )}
        {current !== "PINNED" && (
          <UnpinnedNotes
            isLoading={isLoading}
            data={unpinnedDocs}
            active={current === "UNPINNED"}
            onBack={setCurrentNull}
            seeAll={setCurrentUnpinned}
            refetch={refetch}
          />
        )}
        <div className="h-[50vh] min-h-[16rem] bg-violet-500 absolute left-0 right-0 top-0 -z-10"></div>
        <NoteForm refetch={refetch} />
      </div>
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;

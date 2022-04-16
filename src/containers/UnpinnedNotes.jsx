import React, { useState } from "react";
import Pagination from "../components/Pagination";
import Note from "../components/Note";

function UnpinnedNotes({ data, isLoading, active, onBack, seeAll }) {
  const [pageIndex, setPageIndex] = useState(0);

  const limit = data?.length;

  const handleIncrease = () => {
    if ((pageIndex + 1) * 5 < limit) {
      setPageIndex((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (pageIndex > 0) {
      setPageIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="max-w-screen-md mx-auto">
      <div className="flex items-center justify-between pb-2">
        <div className="p-1.5 text-gray-700 uppercase font-medium">
          UNPINNED
        </div>
        {active ? (
          <div
            className="px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-500 rounded-full cursor-pointer"
            onClick={onBack}
          >
            Back
          </div>
        ) : (
          <div
            className="px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-400 rounded-full cursor-pointer"
            onClick={seeAll}
          >
            See All
          </div>
        )}
      </div>
      <div className="columns-3 align-items-stretch">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {!active ? (
              <>
                {data?.slice(0, 3)?.map((doc) => (
                  <Note data={doc} key={doc.id} />
                ))}
              </>
            ) : (
              <>
                {data?.slice(pageIndex * 5, (pageIndex + 1) * 5)?.map((doc) => (
                  <Note data={doc} key={doc.id} />
                ))}
              </>
            )}
          </>
        )}
      </div>
      {active && (
        <Pagination
          pageIndex={pageIndex}
          limit={limit}
          isLoading={isLoading}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
        />
      )}
    </section>
  );
}

export default UnpinnedNotes;

const LoadingSkeleton = () => {
  return (
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
      {/* <div
        className={`bg-gray-300 animate-pulse mb-5 rounded-lg p-5 h-48 break-inside-avoid w-full`}
      ></div>
      <div
        className={`bg-gray-300 animate-pulse mb-5 rounded-lg p-5 h-72 break-inside-avoid w-full`}
      ></div> */}
    </>
  );
};

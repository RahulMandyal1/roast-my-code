import { useAppContext } from "@/context/AppContext";
import React from "react";
import ResponseSkeleton from "./ResponseSkeleton";

const ResponseRenderer = () => {
  const { response, loading } = useAppContext();

  return (
    <div className="w-1/3 p-4 min-h-screen h-full bg-[#1D232A] ">
      {loading ? (
        <ResponseSkeleton />
      ) : (
        <div className="w-full max-w-[500px] p-4 rounded-md mt-4 text-white">
          <h3 className="text-xl mb-2">AI Response:</h3>
          <p className="mt-4 text-white">{response}</p>
        </div>
      )}
    </div>
  );
};

export default ResponseRenderer;

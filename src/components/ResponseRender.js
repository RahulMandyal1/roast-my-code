import { useAppContext } from "@/context/AppContext";
import React from "react";

const ResponseRenderer = () => {
  const { response } = useAppContext();

  console.log("thsi is hte response", response);
  return (
    <div className="w-1/3 pl-4 min-h-screen h-full bg-white">
      {response && (
        <div className="w-full max-w-[500px] p-4 rounded-md mt-4">
          <h3 className="text-xl mb-2">AI Response:</h3>
          <p className="mt-4 text-black">{response}</p>
        </div>
      )}
    </div>
  );
};

export default ResponseRenderer;

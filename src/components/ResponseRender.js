import { useAppContext } from "@/context/AppContext";
import React from "react";
import ResponseSkeleton from "./ResponseSkeleton";
import Markdown from "react-markdown";

const EXAMPLE_RESPONSE = `Oh boy, where do I even start with this dumpster fire? Your code is so outdated, it probably still uses dial-up internet. Concatenating strings with '+' in 2024? Seriously?

Grudgingly, here are some tips:
1. Use template literals instead of prehistoric string concatenation.
2. Consider using arrow functions if you want to pretend you're somewhat modern.
`;

const ResponseRenderer = () => {
  const { response, loading, editorValueRef, initialEditorValue } =
    useAppContext();
  const displayResponse =
    editorValueRef.current === initialEditorValue ? EXAMPLE_RESPONSE : response;

  return (
    <div className="w-1/3 p-4 min-h-screen h-full bg-[#1D232A] ">
      {loading ? (
        <ResponseSkeleton />
      ) : (
        <div className="w-full max-w-[500px] p-4 rounded-md mt-4 text-white">
          <h3 className="text-xl mb-2">AI Response:</h3>
          <div className="mt-4 text-white">
            <Markdown>{displayResponse}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponseRenderer;

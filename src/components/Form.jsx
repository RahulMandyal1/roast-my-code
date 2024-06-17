import { Editor } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import { oneDarkPro } from "@/utils/darktheme";

const Form = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const [emailVal, setEmail] = useState("");
  const editorRef = useRef(null);

  const handleQuery = () => {
    showValue();
    // queryGemini(prompt);
  };

  const handleEmail = ({ target }) => {
    setEmail(target.value);
  };

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
       alert("WORK IN PROGRESS COME BACK SOON");
  }

  const handleEditorBeforeMount = (monaco) => {
    monaco.editor.defineTheme("OneDarkPro", {
      base: "vs-dark",
      inherit: true,
      ...oneDarkPro, // https://pheralb.dev/post/monaco-custom-theme  Todo : change it
    });
  };

  return (
    <form className="flex flex-col items-center w-full max-w-screen-md">
      <div className="mb-8">
        <Editor
          width={536}
          height={301}
          defaultLanguage="javascript"
          defaultValue="// some comment"
          onMount={handleEditorDidMount}
          beforeMount={handleEditorBeforeMount}
        />
      </div>

      <div className="relative w-full max-w-[500px] mb-5">
        <input
          className="w-full py-3 px-4 rounded-full bg-white bg-opacity-80 text-gray-700 placeholder-gray-700 focus:outline-none "
          placeholder="Enter your email"
          required
          value={emailVal}
          onChange={handleEmail}
        />
      </div>

      <button
        class="w-full py-3 rounded-full mb-12 max-w-[500px] bg-red-400"
        onClick={handleQuery}
      >
        Roast it!
      </button>
    </form>
  );
};

export default Form;

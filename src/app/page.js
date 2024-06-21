"use client"; // This is a client component 👈🏽
import Header from "@/components/Header";
import Form from "@/components/Form";
import { AppProvider } from "@/context/AppContext";
import ResponseRenderer from "@/components/ResponseRender";

export default function Home() {
  return (
    <AppProvider>
      <main className="flex min-h-screen justify-between ">
        <div className="flex flex-col items-center p-1 mx-auto  w-1/2 p-8 ">
          <Header />
          <Form />
        </div>
        <ResponseRenderer />
      </main>
    </AppProvider>
  );
}

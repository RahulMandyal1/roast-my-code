"use client"; // This is a client component 👈🏽
import Header from "@/components/Header";
import Form from "@/components/Form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="flex flex-col items-center p-1 mx-auto max-w-screen-md">
        <Header />
        <Form />
      </div>
    </main>
  );
}

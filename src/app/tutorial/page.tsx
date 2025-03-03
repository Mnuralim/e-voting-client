import React from "react";
import { Device } from "./_components/device";

const Page = () => {
  return (
    <main className="w-1/3 mx-auto text-white">
      <h1 className="font-bold mt-32 text-4xl">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos,
        consectetur?
      </h1>
      <p className="mt-5 text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
        perferendis laudantium fugit sequi dolorem obcaecati totam officia
        cumque molestiae laboriosam?
      </p>
      <h2 className="my-5 font-bold text-3xl">
        Langkah-langkah melakukan voting
      </h2>
      <Device />
    </main>
  );
};

export default Page;

import { Tutorial } from "./_components/tutorial";

export const metadata = {
  title: "Panduan",
  description: "",
};

function Page() {
  return (
    <main className="w-full max-w-7xl mx-auto mt-[76px] md:mt-[120px]">
      <Tutorial />
    </main>
  );
}

export default Page;

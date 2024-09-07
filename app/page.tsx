import SearchBar from "@/components/Search";

export default function Home() {
  return (
    <main className="bg-neutral-200/70 min-h-screen flex flex-col items-center justify-between lg:px-40 md:px-12 px-4">
      <SearchBar/>
    </main>
  );
}

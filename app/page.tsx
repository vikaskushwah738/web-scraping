import Products from "@/components/Product";
import SearchBar from "@/components/Search";

export default function Home() {
  return (
    <main className="h-screen bg-neutral-200/70">
      <div className="flex flex-col items-center justify-between lg:px-40 md:px-12 px-4">

        <SearchBar />
        <Products />

      </div>
    </main>
  );
}

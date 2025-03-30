import { createFileRoute, Link } from "@tanstack/react-router";
import "../index.css";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-41px)] w-full">
        <h1 className="uppercase mb-8 text-4xl font-bold">
          Baza danych użytkowników
        </h1>
        <Link
          to="/users"
          className="text-xl p-3 bg-black text-white rounded-md"
        >
          Przejdź do bazy
        </Link>
      </div>
    </>
  );
}

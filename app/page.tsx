"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormElements extends HTMLFormControlsCollection {
  gameId: HTMLInputElement;
}

interface GameIDElements extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Home() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<GameIDElements>) => {
    e.preventDefault();
    console.log(e.currentTarget.elements.gameId.value);
    router.push(`/game?id=${e.currentTarget.elements.gameId.value}`);
  };

  return (
    <div className="grid grid-cols-1 w-full text-center px-12 gap-8 m-auto">
      <div className="flex flex-col text-md lg:text-xl gap-y-2">
        <div>Welcome to GenGuessr!</div>
        <div className="font-extralight">
          Start a new game or join a game with an ID.
        </div>
      </div>
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex items-center bg-white bg-opacity-10 rounded-md aspect-square">
          <Link
            className="mx-auto"
            href={`${process.env.NEXT_PUBLIC_API_URL}/game/new`}
          >
            <button className="border border-white border-opacity-50 py-2 px-6 text-sm rounded hover:bg-white hover:bg-opacity-90 hover:text-black">
              <span className="inline-block text-xl">&#43;</span> New Game
            </button>
          </Link>
        </div>
        <div className="flex items-center bg-white bg-opacity-10 rounded-md  aspect-square p-8 lg:p-16">
          <div className="flex mx-auto gap-x-4">
            <form
              className="grid gap-4 grid-cols-1 lg:grid-cols-2"
              onSubmit={handleSubmit}
            >
              <textarea
                name="gameId"
                placeholder="ID"
                rows={1}
                className="border resize-none border-white border-opacity-70 rounded p-2 text-white focus:outline-none bg-transparent focus:border-gendo-grey-light/70 focus:ring-0 focus:ring-offset-0"
              ></textarea>
              <button className="bg-white border border-white text-black py-2 px-6 text-sm rounded hover:bg-opacity-0 hover:text-white">
                Join Game
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

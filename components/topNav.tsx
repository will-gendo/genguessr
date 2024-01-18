"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const TopBar: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let gameId = null;

  if (pathname === "/game") {
    gameId = searchParams.get("id");
  }

  return (
    <div className="flex flex-col w-full px-6 bg-[#232323] text-white">
      <div className="flex w-full h-fit justify-center py-4">
        <div className="flex flex-1">
          {gameId && (
            <div className="mr-auto my-auto text-sm text-gray-400">
              Game ID: {gameId}
            </div>
          )}
        </div>
        <div className="flex flex-auto p-4">
          <Link
            className="m-auto pointer-events-none flex place-items-center gap-2 lg:pointer-events-auto"
            href="/"
          >
            <div className="mt-auto text-sm hidden sm:block">GenGuessr By</div>
            <div className="relative w-24 h-6">
              <Image src="/logo.svg" alt="Gendo Logo" fill priority />
            </div>
          </Link>
        </div>
        <div className="flex flex-1">
          {gameId && (
            <Link
              className="ml-auto my-auto"
              href={`${process.env.NEXT_PUBLIC_API_URL}/game/new`}
            >
              <button className="border border-white border-opacity-50 h-fit py-2 px-6 text-sm rounded hover:bg-white hover:bg-opacity-90 hover:text-black">
                <span className="inline-block text-xl">&#43;</span> New Game
              </button>
            </Link>
          )}
        </div>
      </div>
      <hr className="mx-auto w-full white opacity-20" />
    </div>
  );
};

export default TopBar;

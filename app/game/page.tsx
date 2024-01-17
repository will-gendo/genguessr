"use client";

import SelectBlock from "@/components/form/select";
import TopBar from "@/components/topNav";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { BarLoader } from "react-spinners";

// Requires logic for changing role!
const role = "controller";
const subjectOptions = [
  { title: "duck", value: "duck" },
  { title: "dog", value: "dog" },
  { title: "tractor", value: "tractor" },
  { title: "banana", value: "banana" },
];
const locationOptions = [
  { title: "the sky", value: "the sky" },
  { title: "a bath", value: "a bath" },
  { title: "the desert", value: "the desert" },
  { title: "the ocean", value: "the ocean" },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type ImageResult = {
  id: string;
  status: "completed" | "error" | "waiting" | "processing";
  image_url?: string;
};

export default function Game() {
  const searchParams = useSearchParams();
  const gameId = searchParams.get("id");

  const [subject, setSubject] = useState<string>("duck");
  const [location, setLocation] = useState<string>("the sky");
  const [imageResult, setImageResult] = useState<ImageResult | null>();
  const [error, setError] = useState<string | null>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setImageResult({ id: "", status: "waiting" });

    const response = await fetch("/api/images/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `A photo of a ${subject} in ${location}`,
      }),
    });

    let result = await response.json();

    if (response.status !== 200) {
      setError(`An error occurred.`);
      return;
    }

    setImageResult(result);

    while (result.status !== "completed" && result.status !== "failed") {
      await sleep(6000);
      const response = await fetch("/api/images/result/" + result.id);
      result = await response.json();
      if (response.status !== 200) {
        setError(`An error occurred.`);
        return;
      }
      setImageResult(result);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#232323] text-white">
      <TopBar gameId={gameId} />
      <div className="flex flex-col text-center lg:max-w-5xl lg:w-full gap-y-12 mt-6 lg:mt-10 2xl:mt-20">
        <div className="flex mx-auto text-sm uppercase gap-4">
          <div className="my-auto">You are the</div>
          <div className="border border-white rounded py-2 px-4">{role}</div>
        </div>
        <div className="mx-auto">
          {error && (
            <>
              <div className="mb-4 text-red-400 uppercase">{error}</div>
            </>
          )}

          {imageResult && (
            <>
              {imageResult.image_url ? (
                <Image
                  src={imageResult.image_url}
                  alt="Generated image"
                  width={500}
                  height={24}
                  priority
                />
              ) : (
                <div className="flex border border-white rounded w-[500px] h-[500px] border-opacity-60">
                  <div className="m-auto text-gray-400">
                    {imageResult.status.toUpperCase()}
                    <BarLoader color={"#ffffff"} loading={true} />
                  </div>
                </div>
              )}
            </>
          )}

          {!imageResult && (
            <div className="flex border border-white rounded w-[500px] h-[500px] border-opacity-50">
              <div className="m-auto text-gray-400">
                Choose your prompt and generate!
              </div>
            </div>
          )}
        </div>
        <form
          className="flex flex-row text-sm uppercase mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="my-auto">A photo of a</div>
          <div>
            <SelectBlock
              items={subjectOptions}
              label="Subject"
              onChange={setSubject}
            />
          </div>
          <div className="my-auto">in</div>
          <div>
            <SelectBlock
              items={locationOptions}
              label="Location"
              onChange={setLocation}
            />
          </div>
          <div>
            <button
              className="bg-white border border-white text-black h-full px-6 text-sm rounded hover:bg-opacity-0 hover:text-white disabled:opacity-10 disabled:hover:bg-white disabled:hover:text-black"
              type="submit"
              disabled={
                imageResult != null &&
                (imageResult.status == "processing" ||
                  imageResult.status == "waiting")
              }
            >
              Generate
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

"use client";

import initiatePipeline from '~/lib/pipeline';
import { useState } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const [input, setInput] = useState('');
  const [outputUrl, setOutputUrl] = useState('');

  const handleKeyPress = async (event : React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const response = await initiatePipeline(input);
      setOutputUrl(response ?? '');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-themeBlue text-white font-inknut">
      <div className="absolute top-0 left-0 w-full bg-black h-16 pl-8 pt-2">
        <p className="text-3xl">cartovis - visualize your lectures</p>
      </div>
      <div className="chatarea translate-y-[-100%]">
        <div className="p-4">
          <p className="text-2xl">type in your questions</p>
        </div>
        <div className="container flex justify-center">
          <div className="min-w-2xl bg-white p-1 rounded-lg w-[500px] min-h-[50px]">
            <div className="bg-black rounded p-1 min-h-[50px]">
              <input
                className="w-full bg-black text-white focus:outline-none focus:border focus:border-indigo-800 p-3"
                placeholder="what do you want to visualize?"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyPress}
              ></input>
            </div>
          </div>
        </div>
      </div>
      {
          outputUrl && (
            <div className="m-10">
              <Image
                src={outputUrl}
                alt=""
                width={500}
                height={300}
              />
            </div>
          )
        }
      <footer className="absolute bottom-0 left-0 w-full bg-black p-4 text-right text-white">
        <p className="text-lg">leave feedback at jity@mit.edu</p>
      </footer>
    </main>
  );
}

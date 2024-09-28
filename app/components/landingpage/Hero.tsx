'use client';

import React from 'react';
import Navbar from './Navbar';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <>
      <Navbar />
      <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 md:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/assets/paper-pattern.svg')] opacity-20"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl font-bold mb-4 md:text-6xl">
            <span className="typing-animation-line1 block">
              Effortlessly Create
            </span>
            <span className="typing-animation-line2 block">
              & Manage Your Notes
            </span>
          </h1>
          <h2 className="text-xl md:text-2xl font-light mb-8">
            Organize your thoughts with{' '}
            <span className="font-semibold">NestNote</span> — designed to make
            note-taking simple and efficient.
          </h2>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center">
            <Button className="bg-slate-200 text-indigo-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition ease-in-out">
              See how it works
            </Button>
            <Button className="bg-indigo-600 font-semibold px-6 py-3 rounded-full hover:bg-indigo-800 transition ease-in-out">
              Try it
            </Button>
          </div>
        </div>
      </div>

      {/* Tailwind Styles for Animations */}
      <style jsx>{`
        @keyframes typing {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }

        .typing-animation-line1,
        .typing-animation-line2 {
          white-space: nowrap;
          overflow: hidden;
          display: inline-block;
          width: 0;
          animation: typing 3s steps(30, end) forwards;
        }

        .typing-animation-line2 {
          animation-delay: 3s;
        }
      `}</style>
    </>
  );
};

export default Hero;

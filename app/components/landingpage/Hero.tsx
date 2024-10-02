'use client';

import React, { useRef } from 'react';
import Navbar from './Navbar';
import { Button } from '@/components/ui/button';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';

const Hero = () => {
  const howItWorksRef = useRef(null);

  const handleScrollToSection = () => {
    if (howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/paper-pattern.svg')] opacity-20"></div>

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 lg:mb-8">
            <span className="typing-animation-line1 block">
              Effortlessly Create
            </span>
            <span className="typing-animation-line2 block">
              & Manage Your Notes
            </span>
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-6 md:mb-8 lg:mb-10">
            Organize your thoughts with{' '}
            <span className="font-semibold">NestNote</span> — designed to make
            note-taking simple and efficient.
          </h2>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 justify-center">
            <Button
              onClick={handleScrollToSection}
              className="bg-slate-200 text-indigo-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition ease-in-out text-sm md:text-base lg:text-lg"
            >
              See how it works
            </Button>

            <LoginLink>
              <Button className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-indigo-800 transition ease-in-out text-sm md:text-base lg:text-lg">
                Try it
              </Button>
            </LoginLink>
          </div>
        </div>
      </div>

      <HowItWorks ref={howItWorksRef} />

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

const HowItWorks = React.forwardRef((_, ref) => (
  <section
    ref={ref}
    className="flex flex-col items-center justify-center py-16 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20  text-center"
  >
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
      How NestNote Works
    </h2>
    <p className="text-lg sm:text-xl md:text-2xl font-light max-w-3xl mb-8">
      NestNote allows you to create, organize, and manage your notes with ease.
      Our system provides an intuitive interface for categorizing your thoughts,
      setting reminders, and collaborating with others seamlessly.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Create Notes</h3>
        <p className="text-base">
          Quickly jot down your ideas and save them instantly, with a simple and
          easy-to-use interface.
        </p>
      </div>
      <div className="p-6  shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Organize Effortlessly</h3>
        <p className="text-base">
          Use tags and categories to organize your notes and find them when you
          need them.
        </p>
      </div>
      <div className="p-6  shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Collaborate with Others</h3>
        <p className="text-base">
          Share your notes with friends or colleagues and work on ideas
          together.
        </p>
      </div>
    </div>
  </section>
));

HowItWorks.displayName = 'HowItWorks';

export default Hero;

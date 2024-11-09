import React from 'react';
import Navbar from '../LandingPageNavbar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ProfilePicture from '@/app/images/Profile-picture-created-with-ai.jpeg';

const Hero = () => {
  return (
    <>
      <Navbar />
      <div className="py-16 px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
            Find the best people for your company
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Connect with top candidates who can take your company to the next
            level.
          </p>
          <Button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md">
            Get Started
          </Button>
        </div>

        {/* Image Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto items-end py-10">
          {/* Left Side Card (Taller) */}
          <div className="flex flex-col items-center bg-slate-300 p-4 rounded-lg shadow-md h-full">
            <h3 className="text-slate-600 text-center font-semibold mb-2">
              James Samerton
            </h3>
            <p className="text-slate-500 text-sm font-semibold">
              Mobile Developer
            </p>
            <Image
              src={ProfilePicture}
              alt="profile picture"
              width={200}
              height={200}
              className="object-cover w-full h-3/4 shadow-2xl rounded-lg mt-5"
            />
          </div>

          {/* Middle Card 1 (Shorter with top padding) */}
          <div className="flex flex-col items-center bg-slate-200 p-4 rounded-lg shadow-md h-full">
            <h3 className="text-slate-600 text-center font-semibold mb-2">
              James Samerton
            </h3>
            <p className="text-slate-500 text-sm font-semibold">
              Mobile Developer
            </p>
            <Image
              src={ProfilePicture}
              alt="profile picture"
              width={150}
              height={150}
              className="object-cover w-full h-3/4 shadow-xl rounded-lg mt-3"
            />
          </div>

          {/* Middle Card 2 (Shorter with top padding) */}
          <div className="flex flex-col items-center bg-slate-200 p-4 rounded-lg shadow-md h-full">
            <h3 className="text-slate-600 text-center font-semibold mb-2">
              James Samerton
            </h3>
            <p className="text-slate-500 text-sm font-semibold">
              Mobile Developer
            </p>
            <Image
              src={ProfilePicture}
              alt="profile picture"
              width={150}
              height={150}
              className="object-cover w-full h-3/4 shadow-xl rounded-lg mt-3"
            />
          </div>

          {/* Right Side Card (Taller) */}
          <div className="flex flex-col items-center bg-slate-300 p-4 rounded-lg shadow-md h-full">
            <h3 className="text-slate-600 text-center font-semibold mb-2">
              James Samerton
            </h3>
            <p className="text-slate-500 text-sm font-semibold">
              Mobile Developer
            </p>
            <Image
              src={ProfilePicture}
              alt="profile picture"
              width={200}
              height={200}
              className="object-cover w-full h-3/4 shadow-2xl rounded-lg mt-5"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

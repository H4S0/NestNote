import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';

import { ThemeToggle } from '../dashboard/ThemeToggle';
import { Button } from '@/components/ui/button';
const Navbar = () => {
  return (
    <>
      <div className="relative flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <h4 className="text-3xl font-semibold">
              Nest<span className="text-primary">Note</span>
            </h4>
          </Link>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>

        <nav className="hidden md:flex md:justify-end md:space-x-4">
          <ThemeToggle />
          <LoginLink>
            <Button variant="secondary">Sign in</Button>
          </LoginLink>
          <RegisterLink>
            <Button>Sign up</Button>
          </RegisterLink>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

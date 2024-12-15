'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ThemeToggler from './ThemeToggler';

const Header = () => {
  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleStickyNavbar);
  });

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? 'dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition'
            : 'absolute bg-transparent'
        }`}
      >
        <div className='container'>
          <div className='relative -mx-4 flex items-center justify-between'>
            {/* Web app logo */}
            <div className='w-60 max-w-full px-4 xl:mr-12'>
              <Link
                href='/'
                className={`header-logo block w-full ${
                  sticky ? 'py-5 lg:py-2' : 'py-8'
                } `}
              >
                <Image
                  src='/images/logo/logo-2.svg'
                  alt='logo'
                  width={140}
                  height={30}
                  className='w-full dark:hidden'
                />
                <Image
                  src='/images/logo/logo.svg'
                  alt='logo'
                  width={140}
                  height={30}
                  className='hidden w-full dark:block'
                />
              </Link>
            </div>
            <div className='flex w-full items-center justify-between px-4'>
              <div className='flex items-center justify-end pr-16 lg:pr-0'>
                <Link
                  href='/signin'
                  className='hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block'
                >
                  Sign In
                </Link>
                <Link
                  href='/signup'
                  className='ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-primary px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9'
                >
                  Sign Up
                </Link>
                <div>
                  <ThemeToggler />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

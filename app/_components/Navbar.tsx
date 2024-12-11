'use client'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import { navbarLinksOperational, navbarLinksUCCOP } from '../_data';

const Navbar = () => {
  const {data: session} = useSession();

  return (
    <nav className='bg-primary w-full'>
      <div className='mx-auto max-w-[80%]'>
        {session?.user.role === 'OperationalAgent' ? (
          <div className='flex justify-start gap-4 py-1 text-sm text-center sm:text-base'>
            {navbarLinksOperational.map((item) => (
              <Link
                href={item.href}
                key={item.id}
                className="border-b-2 border-transparent hover:border-b-2 hover:border-primary-foreground font-semibold"
                >{item.title}</Link>
            ))}
          </div>
        ) : (
          <div className='flex justify-start gap-4 py-1 text-sm text-center sm:text-base'>
            {navbarLinksUCCOP.map((item) => (
              <Link
                href={item.href}
                key={item.id}
                className="border-b border-transparent hover:border-b-2 hover:border-primary-foreground font-semibold"
                >{item.title}</Link>  
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
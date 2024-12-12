import React from 'react'
import { Button } from './_ui/button'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

const GoogleInput = () => {
    const handleClickGoogleLogin = () => signIn('google')
  return (
    <Button variant="outline" className='max-w-md min-w-[50%] md:min-w-[30%] mx-auto' onClick={handleClickGoogleLogin}>
        <div className='flex items-center justify-center gap-2'>
            <Image 
                src='/google-icon.svg'
                width={30}
                height={30}
                alt='google-icon'
            />
            <h1 className='text-2xl font-bold'>Google</h1>
        </div>
    </Button>
  )
}

export default GoogleInput
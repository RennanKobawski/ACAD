import React from 'react'
import TopHeader from './TopHeader'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardTitle } from './_ui/card'
import { Dialog, DialogContent } from './_ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Button } from './_ui/button'
import { LogInIcon } from 'lucide-react'
import SignInDialog from './SignInDialog'

const Header = () => {
  return (
    <header>
        <TopHeader />
        <div className='md:max-w-[80%] mx-auto'>
          <div className='flex justify-between items-center m-4'>
              <Link href="/">
                  <Image src="/logo-cet.svg" width={160} height={100} alt="Logo CET" />
              </Link>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon">
                    <LogInIcon/>
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%]">
                  <SignInDialog />
                </DialogContent>
              </Dialog>
          </div>
        </div>
    </header>
  )
}

export default Header
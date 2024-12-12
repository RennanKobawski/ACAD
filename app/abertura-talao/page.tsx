'use client'
import { isMatch } from 'date-fns'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React from 'react'
import Header from '../_components/Header'

interface AberturaTalaoProps {
    searchParams: {
        month: string,
    }
}

const AberturaTalaoPage = ({searchParams: {month}}: AberturaTalaoProps) => {
    const {data: session} = useSession()
    
    if(!session) {
        redirect("/")
    }

    const monthIsInvalid = !month || !isMatch(month, "MM");
    if (monthIsInvalid) {
        redirect(`?month=${new Date().getMonth() + 1}`);
    }
  return (
    <div>
        <Header />
        Abertura Talão
    </div>
  )
}

export default AberturaTalaoPage
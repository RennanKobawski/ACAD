'use client'
import React from 'react'
import Header from '../_components/Header'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { isMatch } from "date-fns";

interface AtendimentoProps {
    searchParams: {
        month: string,
        day: string
    }
}

const AtendimentoPage = ({searchParams: {month, day}}: AtendimentoProps) => {
    const {data: session} = useSession()
    
    if(!session) {
        redirect("/")
    }

    const monthIsInvalid = !month || !isMatch(month, "MM");
    const dayIsInvalid = !day || !isMatch(day, "dd");

    if (monthIsInvalid || dayIsInvalid) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; 
        const currentDay = currentDate.getDate();

        redirect(`?month=${currentMonth < 10 ? `0${currentMonth}` : currentMonth}&day=${currentDay < 10 ? `0${currentDay}` : currentDay}`);
    }

    return (
        <div>
            <Header />
            <h1>Atendimento Page</h1>
        </div>
    );
}

export default AtendimentoPage;

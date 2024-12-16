// AtendimentoPage.tsx
"use server";

import { redirect } from "next/navigation";
import { isMatch } from "date-fns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { getEvents } from "../../_actions/getEvents";
import AtendimentoClient from "../../_components/AtendimentoClient";
import Header from "@/app/_components/Header";

interface AtendimentoProps {
  params: {
    month: string;
    day: string;
  };
}

export default async function AtendimentoPage({ params: { month, day } }: AtendimentoProps) {
  const monthIsInvalid = !month || !isMatch(month, "MM");
  const dayIsInvalid = !day || !isMatch(day, "dd");

  if (monthIsInvalid || dayIsInvalid) {
    const currentDate = new Date();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const currentDay = String(currentDate.getDate()).padStart(2, "0");
    redirect(`/atendimento-0800/${currentMonth}/${currentDay}`);
  }

  const events = await getEvents();
  const session = await getServerSession(authOptions);

  return (
    <main>
      <Header />
      <AtendimentoClient events={events} session={session} />
    </main>
  );
}

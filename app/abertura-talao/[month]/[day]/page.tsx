"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import Header from "@/app/_components/Header";
import AberturaTalaoClient from "../../_components/AberturaTalaoClient";
import { getAllTalonsByCurrentDate } from "../../_actions/getAllTalonsByCurrentDate";

interface AberturaTalaoUCCOPProps {
  params: { month: string; day: string };
}

export default async function AberturaTalaoUCCOPPage({
  params: { month, day },
}: AberturaTalaoUCCOPProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const currentDate = new Date();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentDay = String(currentDate.getDate()).padStart(2, "0");

  if (!month || !day || month.length !== 2 || day.length !== 2) {
    redirect(`/abertura-talao/${currentMonth}/${currentDay}`);
  }

  const talonsByCurrentDate = await getAllTalonsByCurrentDate()

  return (
    <main>
      <Header />
      <AberturaTalaoClient talons={talonsByCurrentDate} session={session} />
    </main>
  );
}

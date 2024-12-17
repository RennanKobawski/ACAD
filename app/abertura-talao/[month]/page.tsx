"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import Header from "@/app/_components/Header";
import AberturaTalaoClient from "../_components/AberturaTalaoClient";
import { getAllTalonsByMonth } from "../_actions/getAllTalonsByMonth";

interface AberturaTalaoOperationalProps {
  params: { month: string };
}

export default async function AberturaTalaoOperationalPage({
  params: { month },
}: AberturaTalaoOperationalProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  if (!month || month.length !== 2) {
    redirect(`/abertura-talao/${currentMonth}`);
  }

  const getCurrentMonthTalons = await getAllTalonsByMonth()

  return (
    <main>
      <Header />
      <AberturaTalaoClient talons={getCurrentMonthTalons} session={session} />
    </main>
  );
}

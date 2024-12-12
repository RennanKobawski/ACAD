"use client";
import React, { useEffect, useState } from "react";
import Header from "../_components/Header";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { isMatch } from "date-fns";
import AddEventButton from "../_components/AddEventButton";
import { DataTable } from "../_components/_ui/data-table";
import { ScrollArea } from "../_components/_ui/scroll-area";
import { eventColumns } from "./_columns";
import { getEvents } from "../_actions/getEvents";

interface AtendimentoProps {
  searchParams: {
    month: string;
    day: string;
  };
}

const AtendimentoPage = ({ searchParams: { month, day } }: AtendimentoProps) => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (session) {
      const userId = session.user.id;
      getEvents(userId).then((data) => {
        setEvents(data);
      });
    }
  }, [session]);

  if (!session) {
    redirect("/");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");
  const dayIsInvalid = !day || !isMatch(day, "dd");

  if (monthIsInvalid || dayIsInvalid) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    redirect(
      `?month=${currentMonth < 10 ? `0${currentMonth}` : currentMonth}&day=${
        currentDay < 10 ? `0${currentDay}` : currentDay
      }`
    );
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Atendimento 0800</h1>
          <AddEventButton />
        </div>
        <ScrollArea className="h-full">
          <DataTable
            columns={eventColumns}
            data={events}
          />
        </ScrollArea>
      </div>
    </div>
  );
};

export default AtendimentoPage;

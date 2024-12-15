"use client";
import React, { useEffect, useState } from "react";
import Header from "../../../_components/Header";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { isMatch } from "date-fns";
import { DataTable } from "../../../_components/_ui/data-table";
import { ScrollArea } from "../../../_components/_ui/scroll-area";
import { eventColumns } from "../../_columns";
import { getEvents } from "../../../_actions/getEvents";
import AddEventButton from "../../_components/AddEventButton";

interface AtendimentoProps {
  params: {
    month: string;
    day: string;
  };
}

interface Event {
  id: number;
  userId: string;
  address: string;
  occasion: string;
  vtr: string;
  startTime: Date;
  activationTime: Date | null;
  endTime: Date | null;
  arrivalTime: Date | null;
  note: string;
  createdAt: Date;
  updatedAt: Date;
}

const AtendimentoPage = ({ params: { month, day } }: AtendimentoProps) => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!session) {
      redirect("/");
    }
  }, [session]);

  useEffect(() => {
    const monthIsInvalid = !month || !isMatch(month, "MM");
    const dayIsInvalid = !day || !isMatch(day, "dd");

    if (monthIsInvalid || dayIsInvalid) {
      const currentDate = new Date();
      const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
      const currentDay = String(currentDate.getDate()).padStart(2, '0');
      redirect(`/atendimento-0800/${currentMonth}/${currentDay}`);
    }
  }, [month, day]);

  useEffect(() => {
    if (session) {
      getEvents().then(setEvents);
    }
  }, [session]);

  return (
    <div>
      <Header />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold"></h1>
          <AddEventButton />
        </div>
        <ScrollArea className="h-full">
          <DataTable columns={eventColumns} data={events} />
        </ScrollArea>
      </div>
    </div>
  );
};

export default AtendimentoPage;

"use client";
import React, { useEffect, useState } from "react";
import Header from "../../../_components/Header";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { isMatch } from "date-fns";
import { DataTable } from "../../../_components/_ui/data-table";
import { eventColumns } from "../../_columns";
import { getEvents } from "../../../_actions/getEvents";
import AddEventButton from "../../_components/AddEventButton";
import { Input } from "@/app/_components/_ui/input";

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
  const [searchTerm, setSearchTerm] = useState<string>("");

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
      const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
      const currentDay = String(currentDate.getDate()).padStart(2, "0");
      redirect(`/atendimento-0800/${currentMonth}/${currentDay}`);
    }
  }, [month, day]);

  useEffect(() => {
    if (session) {
      getEvents().then(setEvents);
    }
  }, [session]);

  const filteredEvents = events.filter((event) =>
    Object.values(event).some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    })
  );

  return (
    <div>
      <Header />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <Input
            type="text"
            placeholder="Pesquisar ocorrências..."
            className="px-4 py-4 border-2 rounded-lg text-sm max-w-[150px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AddEventButton />
        </div>
        <DataTable columns={eventColumns} data={filteredEvents} />
      </div>
    </div>
  );
};

export default AtendimentoPage;

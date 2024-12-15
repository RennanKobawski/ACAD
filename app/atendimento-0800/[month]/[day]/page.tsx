'use server';

import Header from "../../../_components/Header";
import { redirect } from "next/navigation";
import { isMatch } from "date-fns";
import { DataTable } from "../../../_components/_ui/data-table";
import { eventColumns } from "../../_columns";
import { getEvents } from "../../../_actions/getEvents";
import AddEventButton from "../../_components/AddEventButton";
import { Input } from "@/app/_components/_ui/input";
import { SearchIcon } from "lucide-react";

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

  const events = await getEvents(); // Busca no servidor
  const filteredEvents = events; // Filtro pode ser ajustado no lado cliente

  return (
    <div>
      <Header />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <div className="relative">
            <Input
              type="text"
              placeholder="Pesquisar..."
              className="pl-4 sm:pr-10 py-4 border-2 rounded-lg text-sm max-w-[150px]"
            />
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <SearchIcon size={22} />
            </div>
          </div>
          <AddEventButton />
        </div>
        <DataTable columns={eventColumns} data={filteredEvents} />
      </div>
    </div>
  );
}

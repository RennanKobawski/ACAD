"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/app/_components/_ui/input";
import { SearchIcon } from "lucide-react";
import { Event } from "@prisma/client";
import { DataTable } from "@/app/_components/_ui/data-table";
import { eventColumns } from "../_columns";
import AddEventButton from "./AddEventButton";

interface AtendimentoClientProps {
  events: Event[];
  session: any;
}

const AtendimentoClient: React.FC<AtendimentoClientProps> = ({ events, session }) => {
  const [search, setSearch] = useState("");

  const filteredEvents = useMemo(() => {
    if (!search) return events;

    return events.filter((event) => {
      const searchLower = search.toLowerCase();
      return Object.values(event).some((value) =>
        String(value).toLowerCase().includes(searchLower)
      );
    });
  }, [search, events]);

  return (
    <div>
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <div className="relative">
            <Input
              type="text"
              placeholder="Pesquisar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-4 sm:pr-10 py-4 border-2 rounded-lg text-sm max-w-[150px]"
            />
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <SearchIcon size={22} />
            </div>
          </div>
          {session?.user.role === "UCCOPAgent" && <AddEventButton />}
        </div>
        <DataTable columns={eventColumns} data={filteredEvents} />
      </div>
    </div>
  );
};

export default AtendimentoClient;

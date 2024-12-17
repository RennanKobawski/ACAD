"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/app/_components/_ui/input";
import { SearchIcon } from "lucide-react";
import { Talon } from "@prisma/client";
import { DataTable } from "@/app/_components/_ui/data-table";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import AddTalonButton from "./AddTalonButton";
import { talonColumns } from "../_columns";

interface AberturaTalaoUCCOPClientProps {
  talons: Talon[];
  session: any;
}

const AberturaTalaoUCCOPClient: React.FC<AberturaTalaoUCCOPClientProps> = ({ talons }) => {
  const [search, setSearch] = useState("");

  const currentDate = format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

  const filteredTalons = useMemo(() => {
    if (!search) return talons;

    return talons.filter((talon) => {
      const searchLower = search.toLowerCase();
      return Object.values(talon).some((value) =>
        String(value).toLowerCase().includes(searchLower)
      );
    });
  }, [search, talons]);

  return (
    <div>
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <h2 className="text-2xl font-bold tracking-tight">{currentDate}</h2>
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
          <AddTalonButton />
        </div>
        <DataTable columns={talonColumns} data={filteredTalons} />
      </div>
    </div>
  );
};

export default AberturaTalaoUCCOPClient;

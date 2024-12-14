'use client'
import { ColumnDef } from "@tanstack/react-table";
import { Event } from "@prisma/client";
import { EVENT_TYPES } from "@/app/_constants/events";
import ActionsCell from "../_components/ActionsCell";

export const eventColumns: ColumnDef<Event>[] = [
  {
    accessorKey: "address",
    header: "Endereço",
  },
  {
    accessorKey: "occasion",
    header: "Ocorrência",
    cell: ({ row: { original: event } }) => {
      const occasionIndex = Number(event.occasion);
      const occasion =
        !isNaN(occasionIndex) &&
        occasionIndex >= 0 &&
        occasionIndex < EVENT_TYPES.length
          ? EVENT_TYPES[occasionIndex]
          : "Desconhecida";
      return occasion;
    },
  },
  {
    accessorKey: "vtr",
    header: "VTR",
  },
  {
    accessorKey: "startTime",
    header: "HI",
    cell: ({ row: { original: event } }) =>
      new Date(event.startTime).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
  {
    accessorKey: "activationTime",
    header: "HA",
    cell: ({ row: { original: event } }) =>
      event.activationTime
        ? new Date(event.activationTime).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "--:--",
  },
  {
    accessorKey: "arrivalTime",
    header: "HC",
    cell: ({ row: { original: event } }) =>
      event.arrivalTime
        ? new Date(event.arrivalTime).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "--:--",
  },
  {
    accessorKey: "endTime",
    header: "HF",
    cell: ({ row: { original: event } }) =>
      event.endTime
        ? new Date(event.endTime).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "--:--",
  },
  {
    accessorKey: "note",
    header: "Observações",
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: event } }) => {
      return <ActionsCell event={event} />; 
    },
  },
];

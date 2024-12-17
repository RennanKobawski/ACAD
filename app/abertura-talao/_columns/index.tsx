'use client'
import { ColumnDef } from "@tanstack/react-table";
import { Talon } from "@prisma/client";
import TalonsActionsCell from "../_components/TalonsActionsCell";

export const talonColumns: ColumnDef<Talon>[] = [
  {
    accessorKey: "dailyIndex",
    header: "N°",
  },
  {
    accessorKey: "ht",
    header: "HT",
  },
  {
    accessorKey: "vtr",
    header: "VTR",
  },
  {
    accessorKey: "responsible",
    header: "Responsável",
  },
  {
    accessorKey: "startHour",
    header: "Hora Início",
    cell: ({ row: { original: talon } }) =>
      new Date(talon.startHour).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
  {
    accessorKey: "endHour",
    header: "Hora Fim",
    cell: ({ row: { original: talon } }) =>
      talon.endHour
        ? new Date(talon.endHour).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "--:--",
  },
  {
    accessorKey: "startKm",
    header: "KM Inicial",
  },
  {
    accessorKey: "endKm",
    header: "KM Final",
  },
  {
    accessorKey: "startQar1",
    header: "QAR1",
    cell: ({ row: { original: talon } }) =>
      talon.startQar1
        ? new Date(talon.startQar1).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "--:--",
  },
  {
    accessorKey: "endQar1",
    header: "QAR1",
    cell: ({ row: { original: talon } }) =>
      talon.endQar1
        ? new Date(talon.endQar1).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "--:--",
  },
  {
    accessorKey: "startQar2",
    header: "QAR2",
    cell: ({ row: { original: talon } }) =>
      talon.startQar2
        ? new Date(talon.startQar2).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "--:--",
  },
  {
    accessorKey: "endQar2",
    header: "QAR2",
    cell: ({ row: { original: talon } }) =>
      talon.endQar2
        ? new Date(talon.endQar2).toLocaleTimeString("pt-BR", {
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
    cell: ({ row: { original: talon } }) => {
      return <TalonsActionsCell talon={talon} />; 
    },
  },
];

"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Talon } from "@prisma/client";
import TalonsActionsCell from "../_components/TalonsActionsCell";
import QarBadge from "../_components/QarBadge";
import { useSession } from "next-auth/react";

export const talonColumns: ColumnDef<Talon>[] = [
  {
    id: "1",
    accessorKey: "dynamicValue",
    header: "N°",
    cell: ({ row: { original: talon } }) => {
      const { data: session } = useSession();

      if (!session) return null;

      if (session.user.role === "UCCOPAgent") {
        return talon.dailyIndex;
      } else if (session.user.role === "OperationalAgent") {
        return talon.monthlyIndex;
      }
    },
  },
  {
    id: "2",
    accessorKey: "ht",
    header: "HT",
  },
  {
    id: "3",
    accessorKey: "vtr",
    header: "VTR",
  },
  {
    id: "4",
    accessorKey: "responsible",
    header: "Responsável",
  },
  {
    id: "5",
    accessorKey: "startHour",
    header: "Hora Início",
    cell: ({ row: { original: talon } }) =>
      new Date(talon.startHour).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
  {
    id: "6",
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
    id: "7",
    accessorKey: "startKm",
    header: "KM Inicial",
  },
  {
    id: "8",
    accessorKey: "endKm",
    header: "KM Final",
  },
  {
    id: "9",
    accessorKey: "qarBadge",
    header: "Status QAR",
    cell: ({ row }) => {
      const { startQar1, startQar2, endQar1, endQar2 } = row.original;

      const isQar1Open = startQar1 && !endQar1;

      const isQar2Open = startQar2 && !endQar2;

      if (isQar1Open || isQar2Open) {
        return (
          <QarBadge
            qar1={
              isQar1Open
                ? new Date(startQar1).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : null
            }
            qar2={
              isQar2Open
                ? new Date(startQar2).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : null
            }
          />
        );
      }
      return null;
    },
  },

  {
    id: "10",
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
    id: "11",
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
    id: "12",
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
    id: "13",
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
    id: "14",
    accessorKey: "note",
    header: "Observações",
  },
  {
    id: "15",
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: talon } }) => {
      return <TalonsActionsCell talon={talon} />;
    },
  },
];

"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Talon } from "@prisma/client";
import TalonsActionsCell from "../_components/TalonsActionsCell";
import QarBadge from "../_components/QarBadge";
import { useSession } from "next-auth/react";

export const talonColumns: ColumnDef<Talon>[] = [
  {
<<<<<<< HEAD
    accessorKey: "dynamicValue",
=======
    accessorKey: "dynamicValue", // A chave fixa, que pode ser qualquer nome
>>>>>>> 3df5ca7a9ef20dc5513082741e2089feb50c21c7
    header: "N°",
    cell: ({ row: { original: talon } }) => {
      const { data: session } = useSession();

      if (!session) return null;

      if (session.user.role === "UCCOPAgent") {
        return talon.dailyIndex;
      } else if (session.user.role === "OperationalAgent") {
        return talon.id;
      }
    },
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

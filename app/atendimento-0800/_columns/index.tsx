import { ColumnDef } from "@tanstack/react-table";
import { Event } from "@prisma/client";
import DeleteEventButton from "../_components/delete-event-button";
import EditEventButton from "../_components/edit-event-button";

export const eventColumns: ColumnDef<Event>[] = [
  {
    accessorKey: "address",
    header: "Endereço",
  },
  {
    accessorKey: "occasion",
    header: "Ocorrência",
  },
  {
    accessorKey: "vtr",
    header: "VTR",
  },
  {
    accessorKey: "startTime",
    header: "HI",
    cell: ({ row: { original: event } }) =>
      new Date(event.startTime).toLocaleDateString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
  {
    accessorKey: "activationTime",
    header: "HA",
    cell: ({ row: { original: event } }) =>
      new Date(event.activationTime).toLocaleDateString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
  {
    accessorKey: "arrivalTime",
    header: "HC",
    cell: ({ row: { original: event } }) =>
      new Date(event.endTime).toLocaleDateString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
  {
    accessorKey: "endTime",
    header: "HF",
    cell: ({ row: { original: event } }) =>
      new Date(event.endTime).toLocaleDateString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
  {
    accessorKey: "note",
    header: "Observações",
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: event } }) => {
      return (
        <div className="space-x-1">
          <EditEventButton event={event} />
          <DeleteEventButton eventId={event.id} />
        </div>
      );
    },
  },
];

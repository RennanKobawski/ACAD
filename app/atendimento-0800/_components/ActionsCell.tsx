'use client'
import { useSession } from "next-auth/react";
import { Event } from "@prisma/client";
import EditEventButton from "./edit-event-button";
import DeleteEventButton from "./delete-event-button";

interface ActionsCellProps {
  event: Event;
}

const ActionsCell: React.FC<ActionsCellProps> = ({ event }) => {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  return (
    <div className="flex">
      <EditEventButton event={event} />
      {userRole === "UCCOPAgent" && <DeleteEventButton eventId={event.id} />}
    </div>
  );
};

export default ActionsCell;

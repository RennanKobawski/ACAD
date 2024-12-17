'use client'
import { useSession } from "next-auth/react";
import { Event } from "@prisma/client";
import EditEventButton from "./EditEventButton";
import DeleteEventButton from "./DeleteEventButton";

interface EventsCellProps {
  event: Event;
}

const EventsCell = ({ event }: EventsCellProps) => {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  return (
    <div className="flex">
      <EditEventButton event={event} />
      {userRole === "UCCOPAgent" && <DeleteEventButton eventId={event.id} />}
    </div>
  );
};

export default EventsCell;

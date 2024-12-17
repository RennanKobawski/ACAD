'use client'
import { useSession } from "next-auth/react";
import { Talon } from "@prisma/client";
import EditTalonButton from "./EditTalonButton";
import DeleteTalonButton from "./DeleteTalonButton";

interface TalonsCellProps {
  talon: Talon;
}

const TalonsCell: React.FC<TalonsCellProps> = ({ talon }) => {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  return (
    <div className="flex">
      <EditTalonButton talon={talon} />
      {userRole === "UCCOPAgent" && <DeleteTalonButton talonId={talon.id} />}
    </div>
  );
};

export default TalonsCell;

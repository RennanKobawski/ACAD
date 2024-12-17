import { Badge } from "@/app/_components/_ui/badge";
import { CircleIcon } from "lucide-react";
import React from "react";

interface QarBadgeProps {
  qar1: string | null;
  qar2: string | null;
}

const QarBadge: React.FC<QarBadgeProps> = ({ qar1, qar2 }) => {
  if (qar1 || qar2) {
    return (
      <Badge variant="outline" className="text-xs">
        <CircleIcon className="mr-[0.25rem] fill-primary" size={10} />
        Fazendo QAR
      </Badge>
    );
  }
  return null;
};

export default QarBadge;

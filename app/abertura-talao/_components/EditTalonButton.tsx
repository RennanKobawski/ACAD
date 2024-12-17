'use client';

import { Button } from "@/app/_components/_ui/button";
import { Talon } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import UpsertTalonDialog from "./UpsertTalonDialog";

interface EditTalonButtonProps {
  talon: Talon;
}

const EditTalonButton = ({ talon }: EditTalonButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>
      <UpsertTalonDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...talon,
          endHour: talon.endHour || undefined,
          endKm: talon.endKm || undefined,
          percKm: talon.percKm || undefined,
          startQar1: talon.startQar1 || undefined,
          endQar1: talon.endQar1 || undefined,
          startQar2: talon.startQar2 || undefined,
          endQar2: talon.endQar2 || undefined,
          note: talon.note,
          
        }}
        talonId={talon.id}
      />
    </>
  );
};

export default EditTalonButton;

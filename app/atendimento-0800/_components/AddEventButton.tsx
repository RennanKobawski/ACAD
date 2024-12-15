"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/app/_components/_ui/button";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/_ui/tooltip";
import UpsertEventDialog from "./UpsertEventDialog";


const AddEventButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-md font-bold px-4 py-1 text-sm max-w-full"
              onClick={() => setDialogIsOpen(true)}
              size={'lg'}
            >
              <span className="hidden sm:block">Adicionar ocorrência</span>
              <PlusIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent></TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertEventDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
    </>
  );
};

export default AddEventButton;

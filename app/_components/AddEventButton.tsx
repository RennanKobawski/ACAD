"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "./_ui/button";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./_ui/tooltip";
import UpsertEventDialog from "./UpsertEventDialog";


const AddEventButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-md font-bold px-2 py-1"
              onClick={() => setDialogIsOpen(true)}
            >
              Adicionar transação
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

"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/app/_components/_ui/button";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/_components/_ui/tooltip";
import UpsertTalonDialog from "./UpsertTalonDialog";

const AddTalonButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-md font-bold px-4 py-1 text-sm max-w-full"
              onClick={() => setDialogIsOpen(true)}
              size="lg"
            >
              <span className="hidden sm:block">Adicionar talão</span>
              <PlusIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent />
        </Tooltip>
      </TooltipProvider>
      <UpsertTalonDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
    </>
  );
};

export default AddTalonButton;

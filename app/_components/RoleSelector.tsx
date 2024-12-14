"use client";

import React, { useState } from "react";
import { Button } from "./_ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { Role } from "@prisma/client";
import { updateRole } from "../_actions/updateRoleUser";

interface RoleSelectorProps {
  userId: string;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ userId }) => {
  const [loading, setLoading] = useState(false);

  const handleUpdateRole = async (role: Role) => {
    setLoading(true);
    try {
      await updateRole(userId, role);
      toast("Setor atualizado com sucesso!", {
        description: `Seu setor foi atribuído. Bom trabalho!`,
      });
    } catch (error) {
      console.error("Erro ao atualizar o setor:", error);
      toast("Erro ao atualizar o setor.", {
        description: "Por favor, tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex border-2 border-primary rounded-lg h-40">
      <div className="flex-1 flex">
        <Button
          variant="ghost"
          className="flex flex-col gap-10 px-6 items-start justify-center h-[90%] w-full md:w-[200px] text-base md:text-xl"
          onClick={() => handleUpdateRole(Role.OperationalAgent)}
          disabled={loading}
        >
          <Image
            src="/operacional.svg"
            width={40}
            height={40}
            alt="operacional-icon"
          />
          Operacional
        </Button>
      </div>

      <div className="border-l-2 border-[#515151] h-[90%] self-center"></div>

      <div className="flex-1 flex">
        <Button
          variant="ghost"
          className="flex flex-col gap-10 px-6 items-end justify-center h-[90%] w-full md:w-[200px] text-base md:text-xl"
          onClick={() => handleUpdateRole(Role.UCCOPAgent)}
          disabled={loading}
        >
          <Image
            src="/uccop.svg"
            width={40}
            height={40}
            alt="uccop-icon"
          />
          UCCOP
        </Button>
      </div>
    </div>
  );
};

export default RoleSelector;

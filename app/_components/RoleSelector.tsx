"use client";

import React from 'react';
import { Button } from './_ui/button';
import Image from 'next/image';
import { toast } from 'sonner';
import { updateRole } from '../_actions/updateRoleUser';
import { Role } from '@prisma/client';

interface RoleSelectorProps {
  userId: string;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ userId }) => {
  const handleUpdateRole = async (role: Role) => {
    try {
      const updatedUser = await updateRole(userId, role);
      toast("Setor Atualizado com sucesso!", {
        description: `Seu setor foi atribuído. Bom Trabalho!`,
      });
    } catch (error) {
      toast("Erro", {
        description: 'Falha ao atribuir o setor. Tente novamente',
      });
    }
  };

  return (
    <div className='flex border-2 border-primary rounded-lg h-40'>
      <div className='flex-1 flex'>
        <Button 
          variant="ghost" 
          className='flex flex-col gap-10 px-6 items-start justify-center h-[90%] w-full md:w-[200px] text-base md:text-xl' 
          onClick={() => handleUpdateRole(Role.OperationalAgent)}>
          <Image src='/operacional.svg' width={40} height={40} alt="operacional-icon" />
          Operacional
        </Button>
      </div>

      <div className='border-l-2 border-[#515151] h-[90%] self-center'></div>

      <div className='flex-1 flex'>
        <Button 
          variant="ghost" 
          className='flex flex-col gap-10 px-6 items-end justify-center h-[90%] w-full md:w-[200px] text-base md:text-xl' 
          onClick={() => handleUpdateRole(Role.UCCOPAgent)}>
          <Image src='/uccop.svg' width={40} height={40} alt="uccop-icon" />
          UCCOP
        </Button>
      </div>
    </div>
  );
}

export default RoleSelector;

"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Header from "../_components/Header";
import { Button } from "../_components/_ui/button";
import { ArrowLeftToLine } from "lucide-react";
import { useRouter } from "next/navigation";
import RoleSelector from "./_components/RoleSelector";
import { revalidatePage } from "../_actions/revalidatePage";

const SelectRolePage = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBackToHome = async () => {
    setLoading(true);
    setTimeout(() => {
    router.push("/");
    }, 1500);

    const month = new Date().getMonth() + 1;  
    const day = new Date().getDate();
    const path = `/atendimento-0800/${month}/${day}`;

    // Não esta dando revalidatePath
    await revalidatePage(path);
  };

  return (
    <div>
      <Header />
      <div className="my-20 flex flex-col gap-10 items-center justify-center">
        <h1 className="text-3xl font-semibold text-center">
          Seja Bem-vindo {session?.user?.name}
        </h1>

        <h2 className="text-2xl font-semibold text-[#515151]">
          Escolha seu setor:
        </h2>

        {session?.user && <RoleSelector userId={session.user.id} />}

        <Button
          variant={"outline"}
          onClick={handleBackToHome}
          disabled={loading}
        >
          <ArrowLeftToLine />
          {loading ? "Redirecionando..." : "Voltar para Página Inicial"}
        </Button>
      </div>
    </div>
  );
};

export default SelectRolePage;

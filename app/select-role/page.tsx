"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Header from "../_components/Header";
import RoleSelector from "../_components/RoleSelector";
import { Button } from "../_components/_ui/button";
import { ArrowLeftToLine } from "lucide-react";
import { useRouter } from "next/navigation";

const SelectRolePage = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBackToHome = () => {
    setLoading(true);
    setTimeout(() => {
    router.push("/");
    }, 1500);
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

        {/* Botão precisa de um revalidatePath para a pagina inicial, para "remover" a opção de selecionar setor */}
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

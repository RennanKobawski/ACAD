"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "../_components/Header";
import RoleSelector from "../_components/RoleSelector";
import { Button } from "../_components/_ui/button";
import { ArrowLeftToLine } from "lucide-react";
import Link from "next/link";

const SelectRolePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.createdAt !== session?.user?.updatedAt) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div>
      <Header />
      <div className="my-20 flex flex-col gap-10 items-center justify-center">
        <h1 className="text-3xl font-semibold text-center">
          Seja Bem vindo {session?.user?.name}
        </h1>

        <h2 className="text-2xl font-semibold text-[#515151]">
          Escolha seu setor:
        </h2>

        {session?.user && <RoleSelector userId={session.user.id} />}

        <Link href={"/"}>
          <Button variant={"outline"}>
            <ArrowLeftToLine />
            Voltar para Página Inicial
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SelectRolePage;

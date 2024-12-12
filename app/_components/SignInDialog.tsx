'use client'
import { signIn, useSession } from "next-auth/react";
import { Button } from "./_ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "./_ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignInDialog = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLoginWithGoogleClick = () => signIn("google");

  useEffect(() => {
    if (status === "authenticated" && session.user.isNewUser) {
      router.push("/select-role");
    }
  }, [status, session, router]);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-bold text-center">Faça login para continuar</DialogTitle>
        <DialogDescription className="font-semibold text-center">
          Conecte-se no sistema usando sua conta do Google.
        </DialogDescription>
      </DialogHeader>

      <Button
        variant="outline"
        className="gap-1 font-bold text-lg"
        onClick={handleLoginWithGoogleClick}
      >
        <Image
          alt="Fazer login com o Google"
          src="/google-icon.svg"
          width={20}
          height={20}
        />
        Google
      </Button>
    </>
  );
};

export default SignInDialog;
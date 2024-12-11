"use client";
import { useSession } from "next-auth/react";
import Header from "./_components/Header";
import Navbar from "./_components/Navbar";
import { homePageCards } from "./_data";
import { Card, CardContent, CardHeader } from "./_components/_ui/card";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="p-0 m-0">
      <Header />
      {session?.user ? (
        <main>
          <Navbar />
          <section className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-black mt-10">
              Menu de Acesso Rápido
            </h1>
            <article className="border-2 border-input rounded-lg w-[80%] p-6 mt-10">
              <div className="flex flex-wrap justify-center gap-6">
                {homePageCards.map((card) => (
                  <Link href={card.href} key={card.id}>
                    <Card className="bg-transparent border-2 border-primary p-4 min-w-[200px] w-[250px] h-[300px] flex flex-col items-center justify-between">
                      <CardContent className="flex items-center justify-center h-[50%]">
                        <Image
                          src={card.imageUrl!}
                          alt={card.title}
                          width={50}
                          height={50}
                        />
                      </CardContent>
                      <CardHeader className="text-center font-bold text-xl ">
                        {card.title}
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </article>
          </section>
        </main>
      ) : (
        <main>
          <section className="flex flex-col justify-center items-center mt-10 gap-6">
            <h1 className="text-2xl font-bold text-black">
              Faça login para ter acesso ao sistema
            </h1>
            <p className="text-lg font-semibold text-muted-foreground">
              Conecte-se com a sua conta do Google vinculada ao seu registro.
            </p>
          </section>
        </main>
      )}
    </div>
  );
}

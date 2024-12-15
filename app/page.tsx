"use client";
import { useSession } from "next-auth/react";
import Header from "./_components/Header";
import Navbar from "./_components/Navbar";
import { homePageCards } from "./_data";
import { Card, CardContent, CardHeader } from "./_components/_ui/card";
import Link from "next/link";
import Image from "next/image";
import GoogleInput from "./_components/GoogleInput";
import { generateDynamicUrl } from "./_actions/generateDynamicPath";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="p-0 m-0">
      <Header />
      {session?.user ? (
        <main className="text-center mt-10">
          <Navbar />
          <section className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-black mt-10">
              Menu de Acesso Rápido
            </h1>
            <article className="max-w-[80%] mx-auto border-2 border-input rounded-lg px-6 my-10 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {homePageCards.map((card) => {
                  const href = card.dynamic
                    ? generateDynamicUrl(card.href)
                    : card.href;

                  return (
                    <Link href={href} key={card.id} className="w-full">
                      <Card className="bg-transparent border-2 border-primary p-2 h-[200px] max-w-[200px] flex flex-col items-center justify-between">
                        <CardContent className="flex items-center justify-center h-[50%]">
                          <Image
                            src={card.imageUrl!}
                            alt={card.title}
                            width={50}
                            height={50}
                          />
                        </CardContent>
                        <CardHeader className="text-center font-bold text-lg">
                          {card.title}
                        </CardHeader>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </article>
          </section>
        </main>
      ) : (
        <main>
          <section className="flex flex-col justify-center items-center mt-20">
            <div className="flex flex-col justify-center items-center gap-10">
              <h1 className="text-4xl font-bold text-black">Faça seu login</h1>
              <p className="text-base font-semibold text-muted-foreground">
                Entre com sua conta do Google vinculada a seu registro.
              </p>
            </div>
            <div className="flex items-center w-[80%] mt-20">
              <GoogleInput />
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

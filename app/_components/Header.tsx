"use client";
import React, { useEffect, useState } from "react";
import TopHeader from "./TopHeader";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "./_ui/dialog";
import { Button } from "./_ui/button";
import { LogInIcon } from "lucide-react";
import SignInDialog from "./SignInDialog";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./_ui/avatar";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger } from "./_ui/select";

const Header = () => {
  const { data: session, status } = useSession();
  const handleLogOutClick = () => signOut();

  return (
    <header>
      <TopHeader />
      <div className="sm:max-w-[80%] mx-auto">
        <div className="flex justify-between items-center m-2 xs:my-4 truncate">
          <Link href="/">
            <Image
              src="/logo-cet.svg"
              width={160}
              height={100}
              alt="Logo CET"
              className="min-w-[80px]"
            />
          </Link>

          <div>
            {session?.user ? (
              <div className="flex items-center gap-2">
                <div>
                  <p className="font-bold">{session.user.name}</p>
                  <p className="text-xs">{session.user.email}</p>
                </div>

                <Select>
                  <SelectTrigger className="w-[60px] hidden xs:flex border-none">
                    <Avatar>
                      <AvatarImage src={session.user.image || ""} />
                    </Avatar>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {session.user.role === "OperationalAgent" && session.user.updatedAt === session.user.createdAt && (
                        <SelectLabel>
                          <Link href="/select-role">
                            <Button variant="ghost">Selecione seu setor</Button>
                          </Link>
                        </SelectLabel>
                      )}
                      <SelectLabel>
                        <Button variant="ghost" onClick={handleLogOutClick}>
                          Sair da conta
                        </Button>
                      </SelectLabel>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <h2 className="font-bold text-base hidden sm:flex">Faça seu Login</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="icon" variant={"default"}>
                      <LogInIcon color="#515151" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col w-[80%] md:w-[40%] max-w-full">
                    <SignInDialog />
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

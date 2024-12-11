import React from "react";
import Link from "next/link";
import { linksTopHeader, socialMedias } from "../_data";
import Image from "next/image";
import { Card } from "./_ui/card";

const TopHeader = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const dateWithCapitalizedWeekday = formattedDate.replace(/^\w/, (c) =>
    c.toUpperCase()
  );
  return (
    <Card className="border-none bg-foreground min-h-[40px] px-2 rounded-none flex items-center justify-between font-semibold text-[#DADADA]">
      <div>
        <p className="text-xs">{dateWithCapitalizedWeekday}</p>
      </div>

      <div className="flex gap-2">
        <div className="hidden md:flex text-xs gap-2 md:items-center md:justify-center">
          {linksTopHeader.map((link) => (
            <div className="border-r border-border pr-2" key={link.id}>
              <Link
                href={link.href}
                key={link.id}
                target="_blank"
                className="hover:underline"
              >
                <p>{link.title}</p>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex gap-2 items-center">
          {socialMedias.map((socialMedia) => (
            <Link href={socialMedia.href} key={socialMedia.id} target="_blank">
              <Image
                src={socialMedia.imgUrl}
                alt={socialMedia.alt}
                width={16}
                height={16}
              />
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TopHeader;
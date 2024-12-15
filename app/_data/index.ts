import { generateDynamicUrl } from "../_actions/generateDynamicPath";

export const socialMedias = [
  {
    id: 1,
    href: "https://www.youtube.com/channel/UC2a0YCBfMWEaP5qlTwSsTBA",
    alt: "Youtube channel",
    imgUrl: "/ytb-icon.svg",
  },
  {
    id: 2,
    href: "https://www.instagram.com/cet_santos/?igshid=NzZlODBkYWE4Ng%3D%3D",
    alt: "Instagram profile",
    imgUrl: "/insta-icon.svg",
  },
  {
    id: 3,
    href: "https://www.google.com.br/maps/place/Av.+Rangel+Pestana,+100+-+Vila+Nova,+Santos+-+SP,+11013-550/@-23.9428114,-46.3324167,17z/data=!3m1!4b1!4m5!3m4!1s0x94ce037bb8e31b39:0x583e41573eb9bc05!8m2!3d-23.9428163!4d-46.330228?shorturl=1",
    alt: "CET location",
    imgUrl: "/redirect-icon.svg",
  },
];

export const linksTopHeader = [
  {
    id: 1,
    href: "https://op.cetsantos.com.br/",
    title: "Manual de Fiscalização Eletrônico",
  },
  {
    id: 2,
    href: "https://www.santos.sp.gov.br/",
    title: "Prefeitura de Santos",
  },
  {
    id: 3,
    href: "https://cetsantos.com.br/politica-de-cookies/",
    title: "Política de Privacidade/Cookies",
  },
];

export const navbarLinksUCCOP = [
    {
        id: 1,
        title: "Atendimento 0800",
        href: "/atendimento-0800",
        imageUrl: "/atendimento.png",
        dynamic: true,
      },
      {
        id: 2,
        title: "Abertura de Talão",
        href: "/abertura-talao",
        imageUrl: "/abertura-talao.png",
        dynamic: true,
      },
      {
        id: 3,
        title: "Lista de Materiais",
        href: "externo",
        dynamic: false,
      },
];

export const navbarLinksOperational = [
  {
    id: 1,
    title: "Atendimento 0800",
    href: "/atendimento-0800",
    imageUrl: "/atendimento.png",
    dynamic: true,
  },
  {
    id: 2,
    title: "Abertura de Talão",
    href: "/abertura-talao",
    imageUrl: "/abertura-talao.png",
    dynamic: true,
  },
  {
    id: 3,
    title: "Lista de Materiais",
    href: "externo",
    dynamic: false,
  },
];

export const homePageCards = [
  {
    id: 1,
    title: "Atendimento 0800",
    href: "/atendimento-0800",
    imageUrl: "/atendimento.png",
    dynamic: true,
  },
  {
    id: 2,
    title: "Abertura de Talão",
    href: "/abertura-talao",
    imageUrl: "/abertura-talao.png",
    dynamic: true,
  },
  {
    id: 3,
    title: "Lista de Materiais",
    href: "externo",
    dynamic: false,
  },
  {
    id: 4,
    title: "Todas as Falhas",
    href: "externo",
    dynamic: false,
  },
  {
    id: 5,
    title: "Travessias Escolares",
    href: "externo",
    dynamic: false,
  },
  {
    id: 6,
    title: "Mapa das Áreas e Câmeras",
    href: "externo",
    dynamic: false,
  },
  {
    id: 7,
    title: "Pátio VTX",
    href: "externo",
    dynamic: false,
  },
  {
    id: 8,
    title: "Waze",
    href: "externo",
    dynamic: false,
  },
];

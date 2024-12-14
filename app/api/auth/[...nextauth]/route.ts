import NextAuth from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

// Função GET com três argumentos (req, res, options)
export const GET = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);

// Função POST com três argumentos (req, res, options)
export const POST = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);

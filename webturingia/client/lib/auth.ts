import { authOptions } from "@/app/api/auth/[...nextauth]/config";

import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

import { getServerSession } from "next-auth";
const config = authOptions;
export interface iSessionInfo {
  user: {
    name: string | null;
    email: string;
    image: string | null;
    role: string;
    customerId: string;
    idBusiness: number;
  };
}
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}

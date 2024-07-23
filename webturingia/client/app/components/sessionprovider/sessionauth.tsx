"use client";

import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

const SessionAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
export default SessionAuthProvider;

/*
import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
type Props = {
  children: React.ReactNode;
  session: Session | null | any;
};

export default function SessionProvider({ children, session }: Props) {
  return <Provider>{children}</Provider>;
}*/
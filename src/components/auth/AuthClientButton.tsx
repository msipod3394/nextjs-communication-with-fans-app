"use client";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Session } from "next-auth";

type AuthClientButtonProps = {
  session: Session | null;
  // session: Pick<User, "id" | "name" | "email" | "image"> | null;
};

export const AuthClientButton = ({ session }: AuthClientButtonProps) => {
  // console.log("AuthClientButton", session);

  return (
    <div>
      {session ? (
        <>
          <Button variant="outline" onClick={() => signOut()}>
            ログアウト
          </Button>
        </>
      ) : (
        <Link href="/login">
          <Button variant="outline">ログイン</Button>
        </Link>
      )}
    </div>
  );
};

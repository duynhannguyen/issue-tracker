"use client";

import { Card, Flex } from "@radix-ui/themes";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
export default function Page() {
  const session = useSession();
  const router = useRouter();
  if (session.status === "authenticated") router.push("/dashboard/groups");
  return (
    <Card className="max-w-7xl">
      <Flex
        align={"center"}
        justify={"center"}
        gap={"2"}
        className="w-full"
        direction={"column"}
      >
        <h1 className="font-bold text-lg ">Welcome back</h1>
        <div className="w-full">
          <button
            onClick={() =>
              signIn("google", {
                redirect: false,
                callbackUrl: "/dashboard/groups",
              })
            }
            className=" w-full flex justify-center items-center gap-2 text-sm px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors "
          >
            <p> Sign in with Google</p>
            <FcGoogle className="w-5 h-5" />
          </button>
        </div>
      </Flex>
    </Card>
  );
}

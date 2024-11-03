"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa6";
import classNames from "classnames";
import { Box } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const { status, data: session } = useSession();
  const currentPath = usePathname();
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        {" "}
        <FaBug />
      </Link>
      <ul className="flex space-x-6 ">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classNames({
                "text-slate-300": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-slate-100 transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && (
          <Link href={"/api/auth/signout"}>Log out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href={"/api/auth/signin"}>Login</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;

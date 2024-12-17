import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

type CustomLinkProps = {
  href: string;
  children: string;
};

const CustomLink = ({ href, children }: CustomLinkProps) => {
  return (
    <NextLink
      href={href}
      legacyBehavior
      passHref
    >
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default CustomLink;

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  title: string;
  href: string;
}

const NavLink = ({ title, href }: Props): JSX.Element => {
  const pathname = usePathname();

  return (
    <Link href={href}>
      <button
        type="button"
        className={`rounded-lg no-underline flex h-8 mr-0 pr-5 pl-5 
					items-center border-none cursor-pointer font-bold text-sm 
                    ${pathname === href ? "bg-ink dark:bg-bone text-paper dark:text-charcoal" : "bg-auto"}`}
      >
        {title}
      </button>
    </Link>
  );
};

export default NavLink;

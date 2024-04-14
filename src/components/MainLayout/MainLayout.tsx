"use client";

import { Container } from "@mui/material";
import styles from "./styles.module.css";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

interface ClassIfActiveProps extends LinkProps {
  classIfActive: string;
  className?: string;
  href: string;
  children: React.ReactNode;
}

const ClassIfActive = ({
  classIfActive,
  className,
  href,
  children,
  ...restProps
}: ClassIfActiveProps) => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <Link
      className={classNames(className, { [classIfActive]: pathname === href })}
      href={href}
      {...restProps}
    >
      {children}
    </Link>
  );
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className={styles.headerWrapper}>
        <Container className={styles.headerContainer}>
          <div className={styles.logo}>
            <Image
              src="/illivium.jpg"
              alt="Illivium Logo"
              width="24"
              height="24"
            />
            <span>Illivium</span>
          </div>
          <ClassIfActive
            classIfActive={styles.activeNavLink}
            href="/leaderboard"
          >
            Leaderboard
          </ClassIfActive>
          <ClassIfActive
            classIfActive={styles.activeNavLink}
            href="/score-calculator"
          >
            Score calculator
          </ClassIfActive>
        </Container>
      </div>
      <Container>{children}</Container>
    </div>
  );
}

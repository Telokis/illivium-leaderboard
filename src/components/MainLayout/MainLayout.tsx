import { Container } from "@mui/material";
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className={styles.headerWrapper}>
        <Container className={styles.headerContainer}>
          <Link href="/">
            <div className={styles.logo}>
              <Image src="/illivium.jpg" alt="Illivium Logo" width="24" height="24" />
              <span>Illivium</span>
            </div>
          </Link>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/score-calculator">Score calculator</Link>
        </Container>
      </div>
      <Container>{children}</Container>
    </div>
  );
}

import { Box, TableCell, TableHead, TableRow } from "@mui/material";
import Image from "next/image";
import styles from "./styles.module.css";

export const TableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell></TableCell>
      <TableCell
        className={styles.fortifiedTableBackground}
        colSpan={3}
        align="center"
      >
        <Box className={`simple-flexbox ${styles.headerFlexbox}`}>
          <Image
            src={`/fortified.jpg`}
            alt={`Icon of Fortified affix`}
            width="20"
            height="20"
          />
          <span>Fortified</span>
        </Box>
      </TableCell>
      <TableCell
        className={styles.tyrannicalTableBackground}
        colSpan={3}
        align="center"
      >
        <Box className={`simple-flexbox ${styles.headerFlexbox}`}>
          <Image
            src={`/tyrannical.jpg`}
            alt={`Icon of Tyrannical affix`}
            width="20"
            height="20"
          />
          <span>Tyrannical</span>
        </Box>
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Dungeon</TableCell>
      <TableCell className={styles.fortifiedTableBackground} align="center">
        Key level
      </TableCell>
      <TableCell className={styles.fortifiedTableBackground} align="center">
        Time
      </TableCell>
      <TableCell className={styles.fortifiedTableBackground} align="right">
        Score
      </TableCell>
      <TableCell className={styles.tyrannicalTableBackground} align="center">
        Key level
      </TableCell>
      <TableCell className={styles.tyrannicalTableBackground} align="center">
        Time
      </TableCell>
      <TableCell className={styles.tyrannicalTableBackground} align="right">
        Score
      </TableCell>
      <TableCell align="right">Dungeon score</TableCell>
    </TableRow>
  </TableHead>
);

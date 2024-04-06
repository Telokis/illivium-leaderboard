import { Box, TableCell, TableHead, TableRow } from "@mui/material";
import Image from "next/image";
import styles from "./styles.module.css";

export const TableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell></TableCell>
      <TableCell colSpan={2} align="center">
        <Box className={`simple-flexbox ${styles.headerFlexbox}`}>
          <Image src={`/fortified.jpg`} alt={`Icon of Fortified affix`} width="20" height="20" />
          <span>Fortified</span>
        </Box>
      </TableCell>
      <TableCell colSpan={2} align="center">
        <Box className={`simple-flexbox ${styles.headerFlexbox}`}>
          <Image src={`/tyrannical.jpg`} alt={`Icon of Tyrannical affix`} width="20" height="20" />
          <span>Tyrannical</span>
        </Box>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Dungeon</TableCell>
      <TableCell className={styles.fortifiedTableBackground}>Level</TableCell>
      <TableCell className={styles.fortifiedTableBackground}>Time</TableCell>
      <TableCell className={styles.tyrannicalTableBackground}>Level</TableCell>
      <TableCell className={styles.tyrannicalTableBackground}>Time</TableCell>
    </TableRow>
  </TableHead>
);

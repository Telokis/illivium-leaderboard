"use client";
import { Box, TableCell, TableRow, TextField, TextFieldProps } from "@mui/material";
import styles from "./styles.module.css";
import Image from "next/image";
import { DungeonSpec } from "$/types/DungeonSpec";

export interface DungeonRowProps {
  dungeon: DungeonSpec;
  fortifiedLevel: number;
  fortifiedTime: number;
  tyrannicalLevel: number;
  tyrannicalTime: number;
  updateFunction: (key: string, value: string) => void;
}

export function DungeonRow({
  dungeon,
  updateFunction,
  fortifiedLevel,
  fortifiedTime,
  tyrannicalLevel,
  tyrannicalTime,
}: DungeonRowProps) {
  const numberFieldProps: TextFieldProps = {
    type: "number",
    variant: "standard",
  };

  const fortifiedLevelQueryKey = `${dungeon.shortName}_F_Level`;
  const fortifiedTimeQueryKey = `${dungeon.shortName}_F_Time`;
  const tyrannicalLevelQueryKey = `${dungeon.shortName}_T_Level`;
  const tyrannicalTimeQueryKey = `${dungeon.shortName}_T_Time`;

  return (
    <TableRow className={styles.styledTableRow} key={dungeon.fullName}>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            gap: "8px",
          }}
        >
          <Image
            src={`/dungeons/${dungeon.shortName}.jpg`}
            alt={`Icon of ${dungeon.fullName}`}
            width="20"
            height="20"
          />
          {dungeon.fullName}
        </Box>
      </TableCell>
      <TableCell>
        <TextField
          {...numberFieldProps}
          defaultValue={fortifiedLevel}
          onChange={(e) => updateFunction(fortifiedLevelQueryKey, e.target.value)}
        />
      </TableCell>
      <TableCell>
        <TextField
          {...numberFieldProps}
          defaultValue={fortifiedTime}
          onChange={(e) => updateFunction(fortifiedTimeQueryKey, e.target.value)}
        />
      </TableCell>
      <TableCell>
        <TextField
          {...numberFieldProps}
          defaultValue={tyrannicalLevel}
          onChange={(e) => updateFunction(tyrannicalLevelQueryKey, e.target.value)}
        />
      </TableCell>
      <TableCell>
        <TextField
          {...numberFieldProps}
          defaultValue={tyrannicalTime}
          onChange={(e) => updateFunction(tyrannicalTimeQueryKey, e.target.value)}
        />
      </TableCell>
    </TableRow>
  );
}

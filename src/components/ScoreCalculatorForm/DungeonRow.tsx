"use client";

import { Box, TableCell, TableRow, TextField, TextFieldProps } from "@mui/material";
import styles from "./styles.module.css";
import Image from "next/image";
import { DungeonSpec } from "$/types/DungeonSpec";
import { computeScore } from "$/helpers/computeScore";
import { getDungeonQueryParamKeys } from "$/helpers/getDungeonQueryParamKeys";

export interface DungeonRowProps {
  dungeon: DungeonSpec;
  fortifiedLevel: number;
  fortifiedTime: number;
  tyrannicalLevel: number;
  tyrannicalTime: number;
  updateFunction: (key: string, value: string) => void;
}

const DungeonRow = ({
  dungeon,
  updateFunction,
  fortifiedLevel,
  fortifiedTime,
  tyrannicalLevel,
  tyrannicalTime,
}: DungeonRowProps) => {
  const numberFieldProps: TextFieldProps = {
    type: "number",
    variant: "standard",
    style: {
      maxWidth: "100px",
    },
  };

  const { fortifiedLevelQueryKey, fortifiedTimeQueryKey, tyrannicalLevelQueryKey, tyrannicalTimeQueryKey } =
    getDungeonQueryParamKeys(dungeon);

  const fortifiedScore = computeScore(fortifiedLevel, fortifiedTime, dungeon.referenceTime);
  const tyrannicalScore = computeScore(tyrannicalLevel, tyrannicalTime, dungeon.referenceTime);

  const score = Math.max(fortifiedScore, tyrannicalScore) * 1.5 + Math.min(fortifiedScore, tyrannicalScore) * 0.5;

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
      <TableCell className={styles.fortifiedTableBackground}>
        <TextField
          {...numberFieldProps}
          defaultValue={fortifiedLevel}
          onChange={(e) => updateFunction(fortifiedLevelQueryKey, e.target.value)}
        />
      </TableCell>
      <TableCell className={styles.fortifiedTableBackground}>
        <TextField
          {...numberFieldProps}
          defaultValue={fortifiedTime}
          onChange={(e) => updateFunction(fortifiedTimeQueryKey, e.target.value)}
        />
      </TableCell>
      <TableCell className={styles.tyrannicalTableBackground}>
        <TextField
          {...numberFieldProps}
          defaultValue={tyrannicalLevel}
          onChange={(e) => updateFunction(tyrannicalLevelQueryKey, e.target.value)}
        />
      </TableCell>
      <TableCell className={styles.tyrannicalTableBackground}>
        <TextField
          {...numberFieldProps}
          defaultValue={tyrannicalTime}
          onChange={(e) => updateFunction(tyrannicalTimeQueryKey, e.target.value)}
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
};

export { DungeonRow };

"use client";

import {
  Box,
  TableCell,
  TableRow,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import styles from "./styles.module.css";
import Image from "next/image";
import { DungeonSpec } from "$/types/DungeonSpec";
import { computeScore } from "$/helpers/computeScore";
import { getDungeonQueryParamKeys } from "$/helpers/getDungeonQueryParamKeys";
import DurationInput from "../DurationInput/DurationInput";
import { DungeonScore } from "./DungeonScore";

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
  const {
    fortifiedLevelQueryKey,
    fortifiedTimeQueryKey,
    tyrannicalLevelQueryKey,
    tyrannicalTimeQueryKey,
  } = getDungeonQueryParamKeys(dungeon);

  const fortifiedScore = computeScore(
    fortifiedLevel,
    fortifiedTime,
    dungeon.referenceTime,
  );
  const tyrannicalScore = computeScore(
    tyrannicalLevel,
    tyrannicalTime,
    dungeon.referenceTime,
  );

  const score =
    Math.max(fortifiedScore, tyrannicalScore) * 1.5 +
    Math.min(fortifiedScore, tyrannicalScore) * 0.5;

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
        <DungeonScore
          dungeon={dungeon}
          level={fortifiedLevel}
          time={fortifiedTime}
          isBigger={fortifiedScore > tyrannicalScore}
          onLevelChange={(value) =>
            updateFunction(fortifiedLevelQueryKey, String(value))
          }
          onTimeChange={(value) =>
            updateFunction(fortifiedTimeQueryKey, String(value))
          }
        />
      </TableCell>
      <TableCell className={styles.tyrannicalTableBackground}>
        <DungeonScore
          dungeon={dungeon}
          level={tyrannicalLevel}
          time={tyrannicalTime}
          isBigger={tyrannicalScore >= fortifiedScore}
          onLevelChange={(value) =>
            updateFunction(tyrannicalLevelQueryKey, String(value))
          }
          onTimeChange={(value) =>
            updateFunction(tyrannicalTimeQueryKey, String(value))
          }
        />
      </TableCell>
      <TableCell align="right">
        <Typography>{score.toFixed(1)}</Typography>
      </TableCell>
    </TableRow>
  );
};

export { DungeonRow };

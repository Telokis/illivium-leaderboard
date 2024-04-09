"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./styles.module.css";
import { dungeons } from "$/static-data";
import { TableHeader } from "./TableHeader";
import { DungeonRow } from "./DungeonRow";
import { useCallback } from "react";
import { parseIntFallback } from "$/helpers/parseIntFallback";
import { computeScore } from "$/helpers/computeScore";
import { getDungeonQueryParamKeys } from "$/helpers/getDungeonQueryParamKeys";
import { DungeonSpec } from "$/types/DungeonSpec";

function extractDungeonInfoFromQueryParams(
  dungeon: DungeonSpec,
  searchParams: ReadonlyURLSearchParams,
) {
  const {
    fortifiedLevelQueryKey,
    fortifiedTimeQueryKey,
    tyrannicalLevelQueryKey,
    tyrannicalTimeQueryKey,
  } = getDungeonQueryParamKeys(dungeon);

  const fortifiedLevel = parseIntFallback(searchParams.get(fortifiedLevelQueryKey) ?? "0", 0);
  const fortifiedTime = parseIntFallback(searchParams.get(fortifiedTimeQueryKey) ?? "0", 0);
  const tyrannicalLevel = parseIntFallback(searchParams.get(tyrannicalLevelQueryKey) ?? "0", 0);
  const tyrannicalTime = parseIntFallback(searchParams.get(tyrannicalTimeQueryKey) ?? "0", 0);

  return { fortifiedLevel, fortifiedTime, tyrannicalLevel, tyrannicalTime };
}

export default function ScoreCalculatorForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changeParams = useCallback(
    (key: string, value: string) => {
      const newParams = new URLSearchParams(searchParams.toString());

      newParams.set(key, value);
      router.replace(`${pathname}?${newParams.toString()}`);
    },
    [searchParams, pathname, router],
  );

  const totalScore = dungeons.reduce((acc, dungeon) => {
    const { fortifiedLevel, fortifiedTime, tyrannicalLevel, tyrannicalTime } =
      extractDungeonInfoFromQueryParams(dungeon, searchParams);

    const fortifiedScore = computeScore(fortifiedLevel, fortifiedTime, dungeon.referenceTime);
    const tyrannicalScore = computeScore(tyrannicalLevel, tyrannicalTime, dungeon.referenceTime);

    const score =
      Math.max(fortifiedScore, tyrannicalScore) * 1.5 +
      Math.min(fortifiedScore, tyrannicalScore) * 0.5;

    return acc + score;
  }, 0);

  return (
    <Paper className={styles.wrapper}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHeader />
          <TableBody>
            {dungeons.map((dungeon) => {
              const { fortifiedLevel, fortifiedTime, tyrannicalLevel, tyrannicalTime } =
                extractDungeonInfoFromQueryParams(dungeon, searchParams);

              return (
                <DungeonRow
                  key={dungeon.fullName}
                  dungeon={dungeon}
                  fortifiedLevel={fortifiedLevel}
                  fortifiedTime={fortifiedTime}
                  tyrannicalLevel={tyrannicalLevel}
                  tyrannicalTime={tyrannicalTime}
                  updateFunction={(key, value) => changeParams(key, value)}
                />
              );
            })}
            <TableRow>
              <TableCell colSpan={3}></TableCell>
              <TableCell align="right">
                <Typography>{totalScore.toFixed(1)}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

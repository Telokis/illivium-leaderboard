"use client";

import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./styles.module.css";
import { dungeons } from "$/static-data";
import { TableHeader } from "./TableHeader";
import { DungeonRow } from "./DungeonRow";
import { useCallback } from "react";
import { parseIntFallback } from "$/helpers/parseIntFallback";

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

  return (
    <Paper className={styles.wrapper}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHeader />
          <TableBody>
            {dungeons.map((dungeon) => {
              const fortifiedLevelQueryKey = `${dungeon.shortName}_F_Level`;
              const fortifiedTimeQueryKey = `${dungeon.shortName}_F_Time`;
              const tyrannicalLevelQueryKey = `${dungeon.shortName}_T_Level`;
              const tyrannicalTimeQueryKey = `${dungeon.shortName}_T_Time`;

              const fortifiedLevel = parseIntFallback(searchParams.get(fortifiedLevelQueryKey) ?? "0", 0);
              const fortifiedTime = parseIntFallback(searchParams.get(fortifiedTimeQueryKey) ?? "0", 0);
              const tyrannicalLevel = parseIntFallback(searchParams.get(tyrannicalLevelQueryKey) ?? "0", 0);
              const tyrannicalTime = parseIntFallback(searchParams.get(tyrannicalTimeQueryKey) ?? "0", 0);

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
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

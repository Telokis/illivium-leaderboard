"use client";

import {
  Box,
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import styles from "./styles.module.css";
import { dungeons } from "$/static-data";
import { TableHeader } from "./TableHeader";
import { DungeonRow } from "./DungeonRow";
import { useCallback, useState } from "react";
import { parseIntFallback } from "$/helpers/parseIntFallback";
import { computeScore } from "$/helpers/computeScore";
import { getDungeonQueryParamKeys } from "$/helpers/getDungeonQueryParamKeys";
import { DungeonSpec } from "$/types/DungeonSpec";
import ImportCharacterModal from "./ImportCharacterModal";
import { TotalScore } from "./TotalScore";

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

  const fortifiedLevel = parseIntFallback(
    searchParams.get(fortifiedLevelQueryKey) ?? "0",
    0,
  );
  const fortifiedTime = parseIntFallback(
    searchParams.get(fortifiedTimeQueryKey) ?? "0",
    0,
  );
  const tyrannicalLevel = parseIntFallback(
    searchParams.get(tyrannicalLevelQueryKey) ?? "0",
    0,
  );
  const tyrannicalTime = parseIntFallback(
    searchParams.get(tyrannicalTimeQueryKey) ?? "0",
    0,
  );

  return { fortifiedLevel, fortifiedTime, tyrannicalLevel, tyrannicalTime };
}

export default function ScoreCalculatorForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);

  const changeParams = useCallback(
    (key: string, value: string) => {
      const newParams = new URLSearchParams(searchParams.toString());

      newParams.set(key, value);
      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const totalScore = dungeons.reduce((acc, dungeon) => {
    const { fortifiedLevel, fortifiedTime, tyrannicalLevel, tyrannicalTime } =
      extractDungeonInfoFromQueryParams(dungeon, searchParams);

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

    return acc + score;
  }, 0);

  return (
    <Paper className={styles.wrapper}>
      <ImportCharacterModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          M+ Score Calculator
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to the Mythic Plus Dungeon Score Calculator! This tool helps
          you evaluate your performance in Mythic Plus dungeons by calculating
          your score based on your highest key levels and completion times for
          both Tyrannical and Fortified weeks.
        </Typography>
        <Typography variant="body1" paragraph>
          To get started, simply fill in the highest key level you&apos;ve
          completed and the time it took you to complete each dungeon for both
          Tyrannical and Fortified affix weeks. The calculator will
          automatically compute your overall score and show you how different
          dungeon performances affect it.
        </Typography>
        <Typography variant="body1" paragraph>
          Use this tool to plan your dungeon runs strategically, prioritize
          dungeons that will contribute most to your score, and track your
          progress over time. Happy dungeon crawling!
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div style={{ alignSelf: "center" }}>
            <TotalScore totalScore={totalScore} />
          </div>
          <div style={{ position: "absolute", right: "0" }}>
            <Button
              variant="contained"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Import Character
            </Button>
          </div>
        </Box>
      </Box>
      <TableContainer component={Paper} className={styles.mainScoreTable}>
        <Table size="small">
          <TableHeader />
          <TableBody>
            {dungeons.map((dungeon) => {
              const {
                fortifiedLevel,
                fortifiedTime,
                tyrannicalLevel,
                tyrannicalTime,
              } = extractDungeonInfoFromQueryParams(dungeon, searchParams);

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
      <Box p={2} bgcolor="#114355" color="#FFFFFFAD" textAlign="center">
        <Typography variant="body2">
          Code available on{" "}
          <Link
            href="https://github.com/telokis/illivium-leaderboard/"
            color="inherit"
            underline="always"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Link>
          . Calculations based on the formula from{" "}
          <Link
            href="https://old.reddit.com/r/wow/comments/13vqsbw/an_accurate_formula_for_m_score_calculation_in/"
            color="inherit"
            underline="always"
            target="_blank"
            rel="noopener noreferrer"
          >
            Xodiv
          </Link>{" "}
          on Reddit.
        </Typography>
      </Box>
    </Paper>
  );
}

import React, { Suspense } from "react";
import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Paper,
} from "@mui/material";
import { Character } from "$/types/Character";
import SpecImage from "$/components/SpecImage";
import ClassImage from "$/components/ClassImage";
import Link from "next/link";
import { getRankColor } from "$/helpers/getRankColor";
import { loadAllCharactersFromGuilds } from "$/helpers/loadData";
import { guilds } from "$/static-data";
import { Metadata } from "next";
import styles from "./styles.module.css";
import { getClassColor } from "$/helpers/getClassColor";

export const metadata: Metadata = {
  title: "Classement M+ Illivium",
  description: "Comparez votre score M+ avec les autres membres de la guilde Illivium.",
};

function CharacterTable({ characters }: { characters: Character[] }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Spec</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {characters.map((character, i) => (
            <TableRow className={styles.styledTableRow} key={character.name}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <ClassImage size={27} klass={character.class} />
                  <SpecImage size={27} klass={character.class} spec={character.active_spec_name} />
                </Box>
              </TableCell>
              <TableCell>
                <Link
                  style={{ color: getClassColor(character.class) }}
                  href={`https://raider.io/characters/${character.region}/${character.realm}/${character.name}`}
                >
                  {character.name}
                </Link>
              </TableCell>
              <TableCell>
                <span
                  style={{
                    color: getRankColor(character.mythic_plus_scores_by_season[0].scores.all),
                  }}
                >
                  {Math.floor(character.mythic_plus_scores_by_season[0].scores.all)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default async function Page() {
  const chars = await loadAllCharactersFromGuilds(guilds);

  return <CharacterTable characters={chars} />;
}

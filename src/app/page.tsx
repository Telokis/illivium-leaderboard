import React, { Suspense } from "react";
import { illiviumCharacters, loadCharacters } from "$/app/loadData";
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
import { StyledTableRow } from "$/components/StyledTableRow";
import Link from "next/link";
import { getRankColor } from "$/helpers/getRankColor";

const wowClassToColor = {
  "Death Knight": "#C41F3B",
  "Demon Hunter": "#A330C9",
  Druid: "#FF7D0A",
  Evoker: "#33937F",
  Hunter: "#ABD473",
  Mage: "#40C7EB",
  Monk: "#00FF96",
  Paladin: "#F58CBA",
  Priest: "#FFFFFF",
  Rogue: "#FFF569",
  Shaman: "#0070DE",
  Warlock: "#8787ED",
  Warrior: "#C79C6E",
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
            <StyledTableRow key={character.name}>
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
                  style={{ color: wowClassToColor[character.class] }}
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
                  {Math.ceil(character.mythic_plus_scores_by_season[0].scores.all)}
                </span>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const CharactersPage = async () => {
  try {
    const chars = await loadCharacters(illiviumCharacters);

    return <CharacterTable characters={chars} />;
  } catch (error) {
    console.error(error);
    return <Alert severity="error">{(error as Error).toString()}</Alert>;
  }
};

const Page = () => (
  <Suspense>
    <CharactersPage />
  </Suspense>
);

export default Page;

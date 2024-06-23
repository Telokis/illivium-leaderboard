import { Character, CharacterDungeonInfos } from "$/types/Character";
import { GuildSpec } from "$/types/GuildSpec";
import { loadGuildMembers } from "./loadGuildMembers";

export interface CharacterSpec {
  name: string;
  realm: string;
  region: string;
}

export async function loadCharacter(
  character: CharacterSpec,
): Promise<Character | null> {
  const { name, realm, region } = character;

  // const url = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${name}&fields=gear%2Cmythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_best_runs%2Cmythic_plus_alternate_runs`;
  const url = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${name}&fields=gear%2Cmythic_plus_scores_by_season%3Acurrent`;

  const response = await fetch(url, { next: { revalidate: 10 * 60 } });

  if (!response.ok) {
    console.error("Error loading character", name, realm, region);
    console.error(response);
    return null;
  }

  return response.json();
}

// Function to load multiple characters from a static array of character specs
// Also sort characters by descending score
export async function loadCharacters(
  characters: CharacterSpec[],
): Promise<Array<Character>> {
  return Promise.all(characters.map(loadCharacter)).then((characters) => {
    return characters
      .filter((c) => c !== null)
      .sort((a, b) => {
        const aScore = a.mythic_plus_scores_by_season[0].scores.all;
        const bScore = b.mythic_plus_scores_by_season[0].scores.all;

        return bScore - aScore;
      });
  });
}

// Function to load all characters infos from a list of guilds
export async function loadAllCharactersFromGuilds(
  guilds: Array<GuildSpec>,
): Promise<Array<Character>> {
  const members = await Promise.all(guilds.map(loadGuildMembers));

  const characters = members.flat().map((c) => ({
    name: c.name,
    realm: c.realm,
    region: c.region,
  }));

  return loadCharacters(characters);
}

export async function loadCharacterDungeonInfos(
  character: CharacterSpec,
): Promise<CharacterDungeonInfos> {
  const { name, realm, region } = character;

  const url = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${name}&fields=mythic_plus_best_runs%2Cmythic_plus_alternate_runs`;

  const response = await fetch(url, { next: { revalidate: 10 * 60 } });

  if (!response.ok) {
    console.error("Error loading character:", name, realm, region);
    throw response;
  }

  return response.json();
}

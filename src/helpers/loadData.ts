import { Character } from "$/types/Character";
import { GuildMember, GuildSpec, RawGuildMember } from "$/types/GuildSpec";
import { promiseBatch } from "./promiseBatch";

export interface CharacterSpec {
  name: string;
  realm: string;
  region: string;
}

export async function loadCharacter(character: CharacterSpec): Promise<Character> {
  const { name, realm, region } = character;

  // const url = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${name}&fields=gear%2Cmythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_best_runs%2Cmythic_plus_alternate_runs`;
  const url = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${name}&fields=gear%2Cmythic_plus_scores_by_season%3Acurrent`;

  const response = await fetch(url, { next: { revalidate: 10 * 60 } });

  if (!response.ok) {
    console.error("Error loading character:", response);
    throw response;
  }

  return response.json();
}

// Function to load multiple characters from a static array of character specs
// Also sort characters by descending score
export async function loadCharacters(characters: CharacterSpec[]) {
  return promiseBatch(
    10,
    loadCharacter,
    characters.map((c) => [c] as [CharacterSpec]),
    500,
  ).then((characters) => {
    return characters.sort((a, b) => {
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

// Function to load guild members from an array of guild specs
// It uses the Raider.io API to load the members list
export async function loadGuildMembers(guild: GuildSpec): Promise<Array<GuildMember>> {
  const url = `https://raider.io/api/v1/guilds/profile?region=${guild.region}&realm=${guild.realm}&name=${guild.name}&fields=members`;

  const response = await fetch(url, { next: { revalidate: 60 * 60 } });

  if (!response.ok) {
    console.error("Error loading guild members:", response);
    throw response;
  }

  const data = await response.json();

  return (data.members as Array<RawGuildMember>).map((c) => c.character);
}

import { Character } from "$/types/Character";

export interface CharacterSpec {
  name: string;
  realm: string;
  region: string;
}

export async function loadCharacter(character: CharacterSpec): Promise<Character> {
  const { name, realm, region } = character;

  // const url = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${name}&fields=gear%2Cmythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_best_runs%2Cmythic_plus_alternate_runs`;
  const url = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${name}&fields=gear%2Cmythic_plus_scores_by_season%3Acurrent`;

  const response = await fetch(url);

  if (!response.ok) {
    console.error("Error loading character:", response);
    // Handle the error as needed
    throw response;
  }

  return response.json();
}

// Function to load multiple characters from a static array of character specs
// Also sort characters by descending score
export async function loadCharacters(characters: CharacterSpec[]) {
  return Promise.all(characters.map(loadCharacter)).then((characters) => {
    return characters.sort((a, b) => {
      const aScore = a.mythic_plus_scores_by_season[0].scores.all;
      const bScore = b.mythic_plus_scores_by_season[0].scores.all;

      return bScore - aScore;
    });
  });
}

// Static array of character specs
export const illiviumCharacters: CharacterSpec[] = [
  { name: "Therataur", realm: "ysondre", region: "eu" },
  { name: "Wøøble", realm: "ysondre", region: "eu" },
  { name: "Kesium", realm: "ysondre", region: "eu" },
  { name: "Künlüne", realm: "ysondre", region: "eu" },
  { name: "Krobina", realm: "ysondre", region: "eu" },
  { name: "Mcgønagall", realm: "ysondre", region: "eu" },
  { name: "Abigord", realm: "ysondre", region: "eu" },
  { name: "Alania", realm: "ysondre", region: "eu" },
  { name: "Amzen", realm: "ysondre", region: "eu" },
  { name: "Astréea", realm: "ysondre", region: "eu" },
  { name: "Brôlaf", realm: "ysondre", region: "eu" },
  { name: "Chowhhein", realm: "ysondre", region: "eu" },
  { name: "Eräwf", realm: "ysondre", region: "eu" },
  { name: "Feabona", realm: "ysondre", region: "eu" },
  { name: "Gingek", realm: "ysondre", region: "eu" },
  { name: "Nilihauz", realm: "ysondre", region: "eu" },
  { name: "Rinot", realm: "ysondre", region: "eu" },
  { name: "Telokis", realm: "ysondre", region: "eu" },
  { name: "Torfyn", realm: "ysondre", region: "eu" },
  { name: "Aeternos", realm: "ysondre", region: "eu" },
  { name: "Arkaneos", realm: "ysondre", region: "eu" },
  { name: "Bearazol", realm: "ysondre", region: "eu" },
  { name: "Eleaya", realm: "ysondre", region: "eu" },
  { name: "Feastgranter", realm: "ysondre", region: "eu" },
  { name: "Gingeki", realm: "ysondre", region: "eu" },
  { name: "Kodash", realm: "ysondre", region: "eu" },
  { name: "Lemerlin", realm: "ysondre", region: "eu" },
  { name: "Mélinoë", realm: "ysondre", region: "eu" },
  { name: "Ozychronos", realm: "ysondre", region: "eu" },
  { name: "Perfydie", realm: "ysondre", region: "eu" },
  { name: "Smrt", realm: "ysondre", region: "eu" },
  { name: "Taranïs", realm: "ysondre", region: "eu" },
  { name: "Teloker", realm: "ysondre", region: "eu" },
  { name: "Telokiel", realm: "ysondre", region: "eu" },
  { name: "Telonea", realm: "ysondre", region: "eu" },
  { name: "Teloyong", realm: "ysondre", region: "eu" },
  { name: "Zinøgre", realm: "ysondre", region: "eu" },
  { name: "Glayeul", realm: "ysondre", region: "eu" },
  { name: "Gledemon", realm: "ysondre", region: "eu" },
  { name: "Tanki", realm: "ysondre", region: "eu" },
  { name: "Tênshî", realm: "ysondre", region: "eu" },
  { name: "Konichoa", realm: "ysondre", region: "eu" },
  { name: "Ayaki", realm: "dalaran", region: "eu" },
  { name: "Patmosis", realm: "dalaran", region: "eu" },
  { name: "Krobal", realm: "dalaran", region: "eu" },
  { name: "Crêpochampi", realm: "dalaran", region: "eu" },
];

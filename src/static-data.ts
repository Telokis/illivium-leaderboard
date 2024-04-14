import { DungeonSpec } from "./types/DungeonSpec";
import { GuildSpec } from "./types/GuildSpec";

export const guilds: Array<GuildSpec> = [
  { name: "Illivium", realm: "ysondre", region: "eu" },
  { name: "Salsifi", realm: "dalaran", region: "eu" },
];

export const dungeons: Array<DungeonSpec> = [
  { fullName: "Atal'Dazar", shortName: "AD", referenceTime: 30 * 60 },
  { fullName: "Black Rook Hold", shortName: "BRH", referenceTime: 36 * 60 },
  {
    fullName: "DOTI: Galakrond's Fall",
    shortName: "FALL",
    referenceTime: 34 * 60,
  },
  {
    fullName: "DOTI: Murozond's Rise",
    shortName: "RISE",
    referenceTime: 36 * 60,
  },
  { fullName: "Darkheart Thicket", shortName: "DHT", referenceTime: 30 * 60 },
  { fullName: "The Everbloom", shortName: "EB", referenceTime: 33 * 60 },
  {
    fullName: "Throne of the Tides",
    shortName: "TOTT",
    referenceTime: 34 * 60,
  },
  { fullName: "Waycrest Manor", shortName: "WM", referenceTime: 37 * 60 + 0 },
];

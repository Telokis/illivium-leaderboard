import { DungeonSpec } from "./types/DungeonSpec";
import { GuildSpec } from "./types/GuildSpec";

export const guilds: Array<GuildSpec> = [
  { name: "Illivium", realm: "ysondre", region: "eu" },
  { name: "Salsifi", realm: "dalaran", region: "eu" },
];

export const dungeons: Array<DungeonSpec> = [
  { fullName: "Algeth'ar Academy", shortName: "AA", referenceTime: 32 * 60 },
  { fullName: "Brackenhide Hollow", shortName: "BH", referenceTime: 35 * 60 },
  { fullName: "Halls of Infusion", shortName: "HOI", referenceTime: 35 * 60 },
  { fullName: "Neltharus", shortName: "NELT", referenceTime: 33 * 60 },
  { fullName: "Ruby Life Pools", shortName: "RLP", referenceTime: 30 * 60 },
  { fullName: "The Azure Vault", shortName: "AV", referenceTime: 37 * 60 + 30 },
  { fullName: "The Nokhud Offensive", shortName: "NO", referenceTime: 40 * 60 },
  {
    fullName: "Uldaman: Legacy of Tyr",
    shortName: "ULD",
    referenceTime: 34 * 60,
  },
];

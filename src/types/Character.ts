export type CharClass =
  | "Death Knight"
  | "Demon Hunter"
  | "Druid"
  | "Hunter"
  | "Mage"
  | "Monk"
  | "Paladin"
  | "Priest"
  | "Rogue"
  | "Shaman"
  | "Warlock"
  | "Warrior";

export type CharSpec =
  | "Blood"
  | "Frost"
  | "Unholy"
  | "Havoc"
  | "Vengeance"
  | "Balance"
  | "Feral"
  | "Guardian"
  | "Restoration"
  | "Beast Mastery"
  | "Marksmanship"
  | "Survival"
  | "Arcane"
  | "Fire"
  | "Frost"
  | "Brewmaster"
  | "Mistweaver"
  | "Windwalker"
  | "Holy"
  | "Protection"
  | "Retribution"
  | "Discipline"
  | "Shadow"
  | "Assassination"
  | "Outlaw"
  | "Subtlety"
  | "Elemental"
  | "Enhancement"
  | "Destruction"
  | "Affliction"
  | "Demonology"
  | "Arms"
  | "Fury"
  | "Protection";

export type CharRole = "DPS" | "HEALING" | "TANK";

export interface Character {
  name: string;
  race: string;
  class: CharClass;
  active_spec_name: CharSpec;
  active_spec_role: CharRole;
  gender: string;
  faction: string;
  thumbnail_url: string;
  region: string;
  realm: string;
  last_crawled_at: string;
  profile_url: string;
  profile_banner: string;
  mythic_plus_scores_by_season: ScoreBySeason[];
  mythic_plus_best_runs: Run[];
  mythic_plus_alternate_runs: Run[];
  gear: Gear;
}

interface ScoreBySeason {
  scores: Scores;
}

interface Scores {
  all: number;
  dps: number;
  healer: number;
  tank: number;
  spec_0: number;
  spec_1: number;
  spec_2: number;
  spec_3: number;
}

interface Run {
  dungeon: string;
  short_name: string;
  mythic_level: number;
  completed_at: string;
  clear_time_ms: number;
  par_time_ms: number;
  num_keystone_upgrades: number;
  map_challenge_mode_id: number;
  zone_id: number;
  score: number;
  affixes: Affix[];
  url: string;
}

interface Affix {
  id: number;
  name: string;
  description: string;
  icon: string;
  wowhead_url: string;
}

interface Gear {
  updated_at: string;
  item_level_equipped: number;
}

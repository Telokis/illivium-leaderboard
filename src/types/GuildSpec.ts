export interface GuildSpec {
  name: string;
  realm: string;
  region: string;
}

export interface GuildMember {
  name: string;
  race: string;
  class: string;
  active_spec_name: string;
  active_spec_role: string;
  gender: string;
  faction: string;
  achievement_points: number;
  honorable_kills: number;
  region: string;
  realm: string;
  last_crawled_at: string;
  profile_url: string;
  profile_banner: string;
}

export interface RawGuildMember {
  rank: number;
  character: GuildMember;
}

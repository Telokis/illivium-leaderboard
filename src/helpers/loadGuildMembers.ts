import { GuildMember, GuildSpec } from "$/types/GuildSpec";

export async function loadGuildMembers(guild: GuildSpec): Promise<Array<GuildMember>> {
  const url = `https://raider.io/api/v1/guilds/profile?region=${guild.region}&realm=${guild.realm}&name=${guild.name}&fields=members`;

  const response = await fetch(url, { next: { revalidate: 5 * 60 } });

  if (!response.ok) {
    console.error("Error loading guild members:", response);
    throw response;
  }

  const data = await response.json();

  return data.members;
}

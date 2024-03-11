import { GuildMember, GuildSpec, RawGuildMember } from "$/types/GuildSpec";

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

  console.log(data);

  return (data.members as Array<RawGuildMember>).map((c) => c.character);
}

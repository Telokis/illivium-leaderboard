import { loadAllCharactersFromGuilds } from "$/helpers/loadData";
import { guilds } from "$/static-data";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get("limit");

  // Retrieve all characters from the guilds
  const data = await loadAllCharactersFromGuilds(guilds);

  // Only return up to limit characters
  if (limit) {
    return Response.json(data.slice(0, parseInt(limit, 10)));
  }

  return Response.json(data);
}

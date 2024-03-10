import type { NextRequest } from "next/server";

const { CRON_SECRET, NODE_ENV } = process.env;

const guildsToRefresh = [
  { realmId: 755, realm: "Ysondre", region: "eu", guild: "Illivium", numMembers: 0 },
  { realmId: 554, realm: "Dalaran", region: "eu", guild: "Salsifi", numMembers: 0 },
];

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (NODE_ENV == "production" && authHeader !== `Bearer ${CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  for (const guild of guildsToRefresh) {
    await fetch("https://raider.io/api/crawler/guilds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CRON_SECRET}`,
      },
      body: JSON.stringify(guild),
      next: { revalidate: 0 },
    });
  }

  return Response.json({ success: true });
}

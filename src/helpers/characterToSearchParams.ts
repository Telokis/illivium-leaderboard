import { dungeons } from "$/static-data";
import { CharacterDungeonInfos } from "$/types/Character";
import { getDungeonQueryParamKeys } from "./getDungeonQueryParamKeys";

export function characterToSearchParams(character: CharacterDungeonInfos) {
  const searchParams = new URLSearchParams();
  const allRuns = [
    ...character.mythic_plus_best_runs,
    ...character.mythic_plus_alternate_runs,
  ];

  for (const dungeon of dungeons) {
    const {
      fortifiedLevelQueryKey,
      fortifiedTimeQueryKey,
      tyrannicalLevelQueryKey,
      tyrannicalTimeQueryKey,
    } = getDungeonQueryParamKeys(dungeon);

    // Fortified
    const fortifiedRun = allRuns.find(
      (run) =>
        run.short_name === dungeon.shortName &&
        run.affixes.find((affix) => affix.name === "Fortified"),
    );
    searchParams.set(
      fortifiedLevelQueryKey,
      String(fortifiedRun?.mythic_level ?? 0),
    );
    searchParams.set(
      fortifiedTimeQueryKey,
      String(Math.floor((fortifiedRun?.clear_time_ms ?? 0) / 1000)),
    );

    // Tyrannical
    const tyrannicalRun = allRuns.find(
      (run) =>
        run.short_name === dungeon.shortName &&
        run.affixes.find((affix) => affix.name === "Tyrannical"),
    );
    searchParams.set(
      tyrannicalLevelQueryKey,
      String(tyrannicalRun?.mythic_level ?? 0),
    );
    searchParams.set(
      tyrannicalTimeQueryKey,
      String(Math.floor((tyrannicalRun?.clear_time_ms ?? 0) / 1000)),
    );
  }

  return searchParams;
}

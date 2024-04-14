import { DungeonSpec } from "$/types/DungeonSpec";

export function getDungeonQueryParamKeys(dungeon: DungeonSpec) {
  const fortifiedLevelQueryKey = `${dungeon.shortName}_F_Level`;
  const fortifiedTimeQueryKey = `${dungeon.shortName}_F_Time`;
  const tyrannicalLevelQueryKey = `${dungeon.shortName}_T_Level`;
  const tyrannicalTimeQueryKey = `${dungeon.shortName}_T_Time`;

  return {
    fortifiedLevelQueryKey,
    fortifiedTimeQueryKey,
    tyrannicalLevelQueryKey,
    tyrannicalTimeQueryKey,
  };
}

/**
 * Returns the number of affixes for a given dungeon level.
 * @param level The level of the dungeon.
 * @returns The number of affixes for the given dungeon level.
 */
function affixesForLevel(level: number) {
  if (level >= 14) {
    return 3;
  }

  if (level >= 7) {
    return 2;
  }

  return 1;
}

/**
 * Returns the score offset for a given key time and reference time.
 * @param keyTime The time it took to complete the dungeon in seconds.
 * @param referenceTime The time it took to complete the dungeon at the next level in seconds.
 * @returns The score offset for the given key time and reference time.
 */
function getScoreOffset(keyTime: number, referenceTime: number) {
  const maxBonusTime = referenceTime * 0.4;
  const beatTimerBy = referenceTime - keyTime;
  const bonus = beatTimerBy / maxBonusTime;

  return Math.min(1, Math.max(-1, bonus)) + (keyTime > referenceTime ? -1 : 0);
}

/**
 * Computes the score for a given key level, key time, and reference time.
 * @param keyLevel The level of the key.
 * @param keyTime The time it took to complete the dungeon in seconds.
 * @param referenceTime The time it took to complete the dungeon at the next level in seconds.
 * @returns The score for the given key level, key time, and reference time.
 * @see https://old.reddit.com/r/wow/comments/13vqsbw/an_accurate_formula_for_m_score_calculation_in/
 */
export function computeScore(
  keyLevel: number,
  keyTime: number,
  referenceTime: number,
) {
  if (keyLevel < 2) {
    return 0;
  }

  const scoreOffset = getScoreOffset(keyTime, referenceTime);
  const adjustedKeyLevel = keyLevel + scoreOffset;
  const highKeyBonus = Math.max(0, keyLevel - 10);
  const nAffixes = affixesForLevel(keyLevel);

  return 20 + adjustedKeyLevel * 5 + highKeyBonus * 2 + nAffixes * 10;
}

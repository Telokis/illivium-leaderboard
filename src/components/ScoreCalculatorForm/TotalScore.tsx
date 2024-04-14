import { getRankColor, getRankScale } from "$/helpers/getRankColor";
import { lerp, xerp } from "$/helpers/lerp";
import { CSSProperties } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

function getTotalColorStyle(totalScore: number): CSSProperties {
  const rankScale = getRankScale(totalScore);
  const rankColor = getRankColor(totalScore);

  const result: CSSProperties = {
    color: rankColor,
    borderColor: rankColor,
  };

  if (totalScore >= 1500) {
    result.textShadow = `0px 1px ${Math.round(lerp(rankScale, 0, 5))}px black`;
  }

  if (totalScore >= 2000) {
    result.boxShadow = `0px 0px ${Math.round(xerp(rankScale, 0, 20, 2))}px ${rankColor}`;
  }

  if (totalScore >= 2500) {
    result["--score-pulse-box-shadow-blur-size"] =
      `${Math.round(xerp(rankScale, 0, 20, 2))}px`;
    result["--score-pulse-box-shadow-color"] = rankColor;
    result.animation = `${styles.scorePulseAnimation} 1s infinite`;
  }

  return result;
}

export function TotalScore({ totalScore }: { totalScore: number }) {
  return (
    <span
      className={classNames(styles.totalScoreSpan)}
      style={getTotalColorStyle(totalScore)}
    >
      Total&nbsp;Score:&nbsp;{totalScore.toFixed(1)}
    </span>
  );
}

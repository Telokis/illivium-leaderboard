import { TextField, TextFieldProps, Typography } from "@mui/material";
import DurationInput from "../DurationInput/DurationInput";
import styles from "./styles.module.css";
import { DungeonSpec } from "$/types/DungeonSpec";
import { computeScore } from "$/helpers/computeScore";
import classNames from "classnames";

export interface DungeonScoreProps {
  /** 0 if not timed */
  level: number;

  /** In seconds */
  time: number;

  dungeon: DungeonSpec;

  onLevelChange?: (value: number) => void;
  onTimeChange?: (value: number) => void;

  isBigger?: boolean;
}

export const DungeonScore = ({
  level,
  time,
  onLevelChange,
  onTimeChange,
  isBigger,
  dungeon,
}: DungeonScoreProps) => {
  const score = computeScore(level, time, dungeon.referenceTime);

  const numberFieldProps: TextFieldProps = {
    type: "number",
    variant: "standard",
    onFocus: (event) => {
      event.target.select();
    },
    className: styles.numberField,
  };

  const levelFieldProps: TextFieldProps = {
    ...numberFieldProps,
    inputProps: {
      min: 0,
      max: 99,
    },
  };

  const timeFieldProps: TextFieldProps = {
    ...numberFieldProps,
  };

  return (
    <div className={styles.dungeonScoreBlock}>
      {/* <div className={styles.dungeonScoreBlockPadding} /> */}
      <TextField
        {...levelFieldProps}
        defaultValue={level}
        onChange={(e) => onLevelChange?.(parseInt(e.target.value, 10))}
        label="Level"
      />
      <DurationInput
        {...timeFieldProps}
        label="Time"
        defaultValue={time}
        onChange={onTimeChange}
      />
      <Typography
        className={classNames(styles.scoreText, {
          [styles.biggerScore]: isBigger,
        })}
      >
        {score}
      </Typography>
    </div>
  );
};

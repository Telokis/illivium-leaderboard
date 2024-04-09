import {
  TableCell,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
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

  className?: string;

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
  className,
}: DungeonScoreProps) => {
  const score =
    computeScore(level, time, dungeon.referenceTime) * (isBigger ? 1.5 : 0.5);

  const numberFieldProps = {
    type: "number",
    variant: "standard",
    onFocus: (event) => {
      event.target.select();
    },
    className: styles.numberField,
    sx: {
      "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
        {
          display: "none",
        },
      "& input[type=number]": {
        MozAppearance: "textfield",
      },
      "& input::selection": {
        background: "rgba(255, 255, 255, 0.4)",
      },
      "& .MuiInput-root::before": {
        borderBottom: "none !important",
      },
      "& .MuiInput-root::after": {
        borderBottom: "none !important",
      },
      "& .MuiInput-root.Mui-focused": {
        boxShadow: `-1px -1px 3px rgba(255, 255, 255, 0.2),
        1px 1px 3px rgba(0, 0, 0, 1)`,
      },
    },
  } satisfies TextFieldProps;

  const levelFieldProps = {
    ...numberFieldProps,
    inputProps: {
      min: 0,
      max: 99,
    },
  } satisfies TextFieldProps;

  const timeFieldProps = {
    ...numberFieldProps,
  } satisfies TextFieldProps;

  return (
    <>
      <TableCell className={className} align="center">
        <TextField
          {...levelFieldProps}
          defaultValue={level}
          onChange={(e) => onLevelChange?.(parseInt(e.target.value, 10))}
        />
      </TableCell>
      <TableCell className={className} align="center">
        <DurationInput
          {...timeFieldProps}
          defaultValue={time}
          onChange={onTimeChange}
        />
      </TableCell>
      <TableCell className={className} align="right">
        <Typography
          className={classNames(styles.scoreText, {
            [styles.biggerScore]: isBigger,
          })}
        >
          {score.toFixed(1)}
        </Typography>
      </TableCell>
    </>
  );
};

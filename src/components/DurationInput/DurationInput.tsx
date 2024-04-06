"use client";

import React, { useState, forwardRef } from "react";
import { pad } from "$/helpers/padding";
import { parseIntFallback } from "$/helpers/parseIntFallback";
import { FormControl, Input } from "@mui/material";
import { IMaskInput } from "react-imask";
import styles from "./styles.module.css";

export interface DurationInputProps {
  defaultValue?: number;
  onChange?: (value: number) => void;
}

function textToSeconds(value: string): number {
  const [minutes, seconds] = value.split(":").map((n) => parseIntFallback(n, 0));

  return minutes * 60 + seconds;
}

function secondsToText(value: number): string {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;

  return `${pad(minutes, 2)}:${pad(seconds, 2)}`;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00:00"
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

export default function DurationInput({ defaultValue, onChange }: DurationInputProps) {
  const [textValue, setTextValue] = useState<string>(secondsToText(defaultValue ?? 0));

  const onChangeHandler = (value: string) => {
    if (value.length === 5) {
      setTextValue(value);
      onChange?.(textToSeconds(value));
    }
  };

  return (
    <FormControl variant="outlined">
      <Input
        className={styles.durationInput}
        value={textValue}
        onChange={(e) => onChangeHandler(e.target.value)}
        name="duration"
        inputComponent={TextMaskCustom as any}
      />
    </FormControl>
  );
}
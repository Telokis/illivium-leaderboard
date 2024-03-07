import { Box } from "@mui/material";
import React from "react";

export default function CharIconImage({
  size,
  baseSize,
  offset,
  title,
  imageUrl,
}: {
  baseSize: number;
  offset: readonly [number, number];
  title: string;
  imageUrl: string;
  size?: number;
}) {
  return (
    <Box
      sx={{
        boxSizing: "content-box",
        border: "1px solid #666",
        borderRadius: "4px",
        padding: "1px",
        boxShadow: "1px 1px 1px rgba(0,0,0,.5)",
        alignItems: "center",
        display: "inline-flex",
        height: `${size}px`,
        width: `${size}px`,
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          transform: `scale(${size ? size / baseSize : 1})`,
        }}
      >
        <Box
          sx={{
            width: baseSize,
            height: baseSize,
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: `${offset[0]}px ${offset[1]}px`,
          }}
          title={title}
        />
      </Box>
    </Box>
  );
}

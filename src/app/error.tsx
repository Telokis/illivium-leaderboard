"use client";

import { Alert, Button, Paper } from "@mui/material";
import { useEffect } from "react";
import React from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Paper>
      <Alert
        variant="filled"
        severity="error"
        action={
          <Button
            color="inherit"
            size="small"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Retry
          </Button>
        }
      >
        {error.toString()}
      </Alert>
    </Paper>
  );
}

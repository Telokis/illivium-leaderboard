"use client";

import ScoreCalculatorForm from "$/components/ScoreCalculatorForm/ScoreCalculatorForm";
import { Container } from "@mui/material";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <Container>
      <Suspense>
        <ScoreCalculatorForm />
      </Suspense>
    </Container>
  );
}

import ScoreCalculatorForm from "$/components/ScoreCalculatorForm/ScoreCalculatorForm";
import { Container } from "@mui/material";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "M+ Score Calculator",
  description: "Compute your M+ score with arbitrary dungeon times!",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_INDEX_VERIFICATION_CODE,
  },
};

export default function Page() {
  return (
    <Container>
      <Suspense>
        <ScoreCalculatorForm />
      </Suspense>
    </Container>
  );
}

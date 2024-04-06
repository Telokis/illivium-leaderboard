import React from "react";
import type { CharClass } from "$/types/Character";
import CharIconImage from "./CharIconImage";

const classOffsets = {
  "Death Knight": [0, 0],
  "Demon Hunter": [-64, 0],
  Druid: [0, -64],
  Evoker: [-64, -64],
  Hunter: [-128, 0],
  Mage: [-128, -64],
  Monk: [0, -128],
  Paladin: [-64, -128],
  Priest: [-128, -128],
  Rogue: [-192, 0],
  Shaman: [-192, -64],
  Warlock: [-192, -128],
  Warrior: [0, -192],
} as const;

export default function ClassImage({ klass, size }: { klass: CharClass; size?: number }) {
  const offset = classOffsets[klass];

  return <CharIconImage size={size} baseSize={64} offset={offset} title={klass} imageUrl="/classes_sprites.webp" />;
}

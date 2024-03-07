import React from "react";
import type { CharClass, CharSpec } from "$/types/Character";
import CharIconImage from "./CharIconImage";

const specOffsets = {
  "Death Knight_Blood": [0, 0],
  "Death Knight_Frost": [-64, 0],
  "Death Knight_Unholy": [0, -64],
  "Demon Hunter_Havoc": [-64, -64],
  "Demon Hunter_Vengeance": [-128, 0],
  Druid_Balance: [-128, -64],
  Druid_Feral: [0, -128],
  Druid_Guardian: [-64, -128],
  Druid_Restoration: [-128, -128],
  Evoker_Augmentation: [-192, 0],
  Evoker_Devastation: [-192, -64],
  Evoker_Preservation: [-192, -128],
  "Hunter_Beast Mastery": [0, -192],
  Hunter_Marksmanship: [-64, -192],
  Hunter_Survival: [-128, -192],
  Mage_Arcane: [-192, -192],
  Mage_Fire: [-256, 0],
  Mage_Frost: [-256, -64],
  Monk_Brewmaster: [-256, -128],
  Monk_Mistweaver: [-256, -192],
  Monk_Windwalker: [0, -256],
  Paladin_Holy: [-64, -256],
  Paladin_Protection: [-128, -256],
  Paladin_Retribution: [-192, -256],
  Priest_Discipline: [-256, -256],
  Priest_Holy: [-320, 0],
  Priest_Shadow: [-320, -64],
  Rogue_Assassination: [-320, -128],
  Rogue_Combat: [-320, -192],
  Rogue_Outlaw: [-320, -256],
  Rogue_Subtlety: [0, -320],
  Shaman_Elemental: [-64, -320],
  Shaman_Enhancement: [-128, -320],
  Shaman_Restoration: [-192, -320],
  Warlock_Affliction: [-256, -320],
  Warlock_Demonology: [-320, -320],
  Warlock_Destruction: [-384, 0],
  Warrior_Arms: [-384, -64],
  Warrior_Fury: [-384, -128],
  Warrior_Protection: [-384, -192],
} as const;

export default function SpecImage({
  klass,
  spec,
  size,
}: {
  klass: CharClass;
  spec: CharSpec;
  size?: number;
}) {
  const fullSpec = `${klass}_${spec}`;
  // @ts-ignore
  const offset = fullSpec in specOffsets ? specOffsets[fullSpec] : [-32, -32];

  return (
    <CharIconImage
      size={size}
      baseSize={64}
      offset={offset}
      title={spec}
      imageUrl="/specs_sprites.webp"
    />
  );
}

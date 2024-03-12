import { CharClass } from "$/types/Character";

export function getClassColor(charClass: CharClass): string {
  const classColors = {
    "Death Knight": "#C41F3B",
    "Demon Hunter": "#A330C9",
    Druid: "#FF7D0A",
    Evoker: "#33937F",
    Hunter: "#ABD473",
    Mage: "#40C7EB",
    Monk: "#00FF96",
    Paladin: "#F58CBA",
    Priest: "#FFFFFF",
    Rogue: "#FFF569",
    Shaman: "#0070DE",
    Warlock: "#8787ED",
    Warrior: "#C79C6E",
  };

  return classColors[charClass] ?? "#000";
}

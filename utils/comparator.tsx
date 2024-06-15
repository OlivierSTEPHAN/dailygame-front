import { Characteristics } from "@/model/Characteristics";
import { toast } from "react-toastify";

export function compareGame(
  correctAnswer: Characteristics | undefined,
  result: Characteristics
) {
  if (correctAnswer?.name === result.name) {
    toast.success("GG you got it right!");
    return true;
  }
  return false;
}

export function getMatchingFields(
  answer: Characteristics,
  correctAnswer: Characteristics
) {
  const fields = [
    "name",
    "genres",
    "pov",
    "franchises",
    "companiesName",
    "platforms",
    "year",
    "gameModes",
    "gameEngines",
  ] as const;
  const matches: Record<(typeof fields)[number], boolean> = {
    name: false,
    genres: false,
    pov: false,
    franchises: false,
    companiesName: false,
    platforms: false,
    year: false,
    gameModes: false,
    gameEngines: false,
  };

  if (correctAnswer === undefined) return matches;
  fields.forEach((field) => {
    if (Array.isArray(correctAnswer[field])) {
      matches[field] = (correctAnswer[field] as string[]).some((value) =>
        (answer[field] as string[]).includes(value)
      );
    } else {
      matches[field] = answer[field] === correctAnswer[field];
    }
  });

  return matches;
}

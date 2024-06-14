import { Screenshot } from "@/model/Screenshot";

const BASE_URL = "https://srv541447.hstgr.cloud:8443/api/daily-games";

export const fetchScreenshotsUrl = async (): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/screenshots/url`);
  const data = await response.json();
  return data.screenshots;
};

export const fetchScreenshots = async (): Promise<Screenshot> => {
  const response = await fetch(`${BASE_URL}/screenshots`);
  const data = await response.json();
  return data;
};

export const submitAnswer = async (
  currentIndex: number,
  answer: string
): Promise<boolean> => {
  const response = await fetch(`${BASE_URL}/screenshots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ index: currentIndex, answer }),
  });
  const result = await response.json();
  return !!result; // Assuming the result is a boolean indicating correctness
};

export const fetchSuggestions = async (query: string): Promise<string[]> => {
  if (query.length < 3) return [];
  const response = await fetch(
    `https://srv541447.hstgr.cloud:8443/api/games/autocomplete?name=${query}`
  );
  const data = await response.json();
  return data;
};
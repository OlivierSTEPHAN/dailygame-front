import { Characteristics } from "@/model/Characteristics";
import { Screenshot } from "@/model/Screenshot";
import { toast } from 'react-toastify';

const BASE_URL = "https://srv541447.hstgr.cloud:8443/api/daily-games";


export const fetchScreenshotsUrl = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${BASE_URL}/screenshots/url`);
    const data = await response.json();
    return data.screenshots;
  } catch (error) {
    toast.error(`Error fetching screenshots URL: ${error.message}`);
    return [];
  }
};

export const fetchScreenshots = async (): Promise<Screenshot | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/screenshots`);
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error(`Error fetching screenshots: ${error.message}`);
    return undefined;
  }
};

export const fetchCharacteristics = async (): Promise<Characteristics | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/characteristics`);
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error(`Error fetching characteristics: ${error.message}`);
    return undefined;
  }
};

export const submitAnswerCharacteristics = async (
  answer: string
): Promise<Characteristics | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/characteristics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error(`Error submitting answer for characteristics: ${error.message}`);
    return undefined;
  }
};

export const submitAnswerScreenshot = async (
  currentIndex: number,
  answer: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/screenshots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index: currentIndex, answer }),
    });
    const result = await response.json();
    console.log(!!result);
    return !!result; // Assuming the result is a boolean indicating correctness
  } catch (error) {
    toast.error(`Error submitting answer for screenshot: ${error.message}`);
    return false;
  }
};

export const fetchSuggestions = async (query: string): Promise<string[]> => {
  try {
    if (query.length < 3) return [];
    const response = await fetch(
      `https://srv541447.hstgr.cloud:8443/api/games/autocomplete?name=${query}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error(`Error fetching suggestions: ${error.message}`);
    return [];
  }
};
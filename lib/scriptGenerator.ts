import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function generateVideoScript(rawText: string) {
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    generationConfig: {
      responseMimeType: "application/json",
    }
  });

  const prompt = `
    You are an expert YouTube Shorts producer. Take the following raw text and break it down into a highly engaging, fast-paced 30-60 second video script.
    
    You must output strict JSON in the exact following format:
    {
      "title": "A catchy title for the video",
      "scenes": [
        {
          "narration": "The exact text that will be spoken by the voiceover.",
          "imagePrompt": "A highly detailed, descriptive prompt for an AI image generator to create the background visual for this specific line."
        }
      ]
    }
    
    Keep the scenes short (1-2 sentences max per scene). Aim for 4-6 scenes total.

    Raw text to process:
    "${rawText}"
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const content = response.text();

  if (!content) {
    throw new Error("Failed to generate script from Gemini");
  }

  return JSON.parse(content);
}
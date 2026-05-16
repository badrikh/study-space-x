import OpenAI from "openai";

const getClient = () => {
  const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GROQ_API_KEY or OPENAI_API_KEY environment variable");
  }

  const config = { apiKey };

  if (process.env.GROQ_API_KEY) {
    config.baseURL = "https://api.groq.com/openai/v1";
  }

  return new OpenAI(config);
};

const parseJSONResponse = (content) => {
  const cleaned = content
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  return JSON.parse(cleaned);
};

export const analyzeAnalytics = async (analyticsData) => {
  const client = getClient();

  const response = await client.chat.completions.create({
    model: process.env.GROQ_MODEL || process.env.OPENAI_MODEL || "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "You are an AI business analytics assistant for a space booking and coffee shop system. Return only JSON.",
      },
      {
        role: "user",
        content: `
Analyze this real dashboard data:

${JSON.stringify(analyticsData)}

Return ONLY JSON in this format:
{
  "seatUtilization": {
    "insight": "",
    "recommendation": ""
  },
  "weeklyDemand": {
    "insight": "",
    "recommendation": ""
  },
  "coffeePerformance": {
    "insight": "",
    "recommendation": ""
  }
}
`,
      },
    ],
    temperature: 0.3,
  });

  return parseJSONResponse(response.choices[0].message.content);
};

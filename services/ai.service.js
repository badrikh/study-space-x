import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const analyzeAnalytics = async (analyticsData) => {
  const response = await client.chat.completions.create({
    model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
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

  return JSON.parse(response.choices[0].message.content);
};

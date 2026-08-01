const ai = require("../config/gemini");
const fs = require("fs");

exports.analyzeImage = async (imagePath) => {
    const imageBuffer = fs.readFileSync(imagePath);

    const imageBase64 = imageBuffer.toString("base64");

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                role: "user",
                parts: [
                    {
                        text: `
You are an industrial safety expert.

Analyze this industrial machine image.

Return ONLY valid JSON.

{
  "severity": "Low | Medium | High | Critical",
  "riskScore": 0,
  "rootCause": "",
  "recommendation": "",
  "confidence": 0
}
`,
                    },
                    {
                        inlineData: {
                            mimeType: "image/jpeg",
                            data: imageBase64,
                        },
                    },
                ],
            },
        ],
    });

    console.log(response.text);

    const text = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

    const aiAnalysis = JSON.parse(text);

    return aiAnalysis;
};
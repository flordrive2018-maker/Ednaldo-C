const { GoogleGenAI } = require("@google/genai");

/**
 * Netlify Function to handle chatbot requests.
 * This acts as a backend proxy to keep the API Key secure and avoid CORS issues.
 */
exports.handler = async (event, context) => {
  // CORS Headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { message, history } = JSON.parse(event.body);

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables.");
    }

    const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);
    
    // Using gemini-3-flash-preview for fast and efficient responses
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      systemInstruction: "Você é o Consultor de Obras do Ednaldo. Especialista em construção civil, reformas e manutenção. Responda sempre de forma clara, prática e empática, como um amigo experiente explicando para leigos. Dê exemplos simples e práticos."
    });

    // Start chat with history if provided
    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: text }),
    };
  } catch (error) {
    console.error("Chat Function Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Erro ao processar sua mensagem. Tente novamente mais tarde." }),
    };
  }
};

const Groq = require("groq-sdk");


// Groq Client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


// ================= GENERATE SUMMARY =================

const generateSummary = async (req, res) => {
  try {

    const { content } = req.body;


    // Validation
    if (!content || !content.trim()) {
      return res.status(400).json({
        message: "Blog content is required",
      });
    }


    // Groq AI request

   console.log(
  "Groq API Key exists:",
  !!process.env.GROQ_API_KEY
);
    
    const completion = await groq.chat.completions.create({

      model: "openai/gpt-oss-120b",

      messages: [
        {
          role: "user",

          content: `
Summarize the following blog into important bullet points.

${content}

Return only bullet points.
`,
        },
      ],

      temperature: 0.5,

      max_tokens: 500,
    });


    const summary =
      completion.choices[0].message.content;


    res.status(200).json({
      message: "Summary generated successfully",
      summary,
    });


  } catch (error) {

    console.error("Groq Error:", error);

    res.status(500).json({
      message: "Failed to generate summary",
      error: error.message,
    });

  }
};


module.exports = {
  generateSummary,
};
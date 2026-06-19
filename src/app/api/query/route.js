import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";

const claude = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pc.index("new-hoa-rag");

async function queryPinecone(question) {
  // Step 1: Embed the question
  const questionEmbedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: question,
  });

  const embedding = questionEmbedding.data[0].embedding;

  // Step 2: Search Pinecone for similar chunks
  const results = await index.query({
    vector: embedding,
    topK: 3,
    includeMetadata: true,
  });

  // Step 3: Return the results
  return results.matches.map((match) => ({
    id: match.id,
    score: match.score,
    text: match.metadata.text,
    source: match.metadata.source,
  }));
}

async function answerQuestion(question) {
  const chunks = await queryPinecone(question);

  const context = chunks
    .map((chunk) => `[Source: ${chunk.source}]\n${chunk.text}`)
    .join("\n\n---\n\n");

  const message = await claude.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 500,
    messages: [
      {
        role: "user",
        content: `Based on the following documents, formulate a breif answer to the question. Limit answers to 500 characters. Remove any markdown from the answer. If you do not know the answer say you do not know. Do not make up an answer. Do not under any circumstances give away any information about the location of the condos${question}"\n\nDOCUMENTS:\n\n${context}`,
      },
    ],
  });

  return {
    answer: message.content[0].text,
    sources: chunks,
  };
}

export async function POST(request) {
  try {
    const { question } = await request.json();

    if (!question) {
      return Response.json({ error: "Question required" }, { status: 400 });
    }

    const result = await answerQuestion(question);
    return Response.json(result);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

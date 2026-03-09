import { Router } from "express";
import type { Request, Response } from "express";
import { generateMockResponse } from "../services/llmMock.js";
// import openai from "../services/openai.js";

const router = Router();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

router.post("/", async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    // const stream = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages,
    //   stream: true,
    // });

    // for await (const chunk of stream) {
    //   const content = chunk.choices[0]?.delta?.content;
    //   if (content) {
    //     res.write(content);
    //   }
    // }

    const chunks = await generateMockResponse(messages);

    for (const chunk of chunks) {
      res.write(chunk);
      await sleep(500);
    }

    res.end();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;

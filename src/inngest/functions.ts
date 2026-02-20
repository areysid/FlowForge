import prisma from "@/lib/db";
import { inngest } from "./client";
import {createAnthropic} from "@ai-sdk/anthropic"
import {createOpenAI} from "@ai-sdk/openai"
import {createGoogleGenerativeAI} from "@ai-sdk/google"
import { generateText } from "ai";

const anthropic = createAnthropic();
const openai = createOpenAI();
const google = createGoogleGenerativeAI();

export const execute = inngest.createFunction(
    { id: "execute-ai" },
    { event: "execute/ai" },
    async ({ event, step }) => {
        await step.sleep("pretend", "5s")

        const { steps: anthropicsteps } = await step.ai.wrap("anthropic-generate-text",
            generateText, 
            {
                model: anthropic("claude-sonnet-4-5"),
                system: "You are a helpful assistant.",
                prompt: "What is greater than 8 but less than 10?",
            }
        );
        const { steps: googlesteps } = await step.ai.wrap("google-generate-text",
            generateText, 
            {
                model: google("gemini-2.5-flash"),
                system: "You are a helpful assistant.",
                prompt: "What is greater than 8 but less than 10?",
            }
        );
        const { steps: openaisteps } = await step.ai.wrap("openai-generate-text",
            generateText, 
            {
                model: openai("gpt-4.1-mini"),
                system: "You are a helpful assistant.",
                prompt: "What is greater than 8 but less than 10?",
            }
        );
        return{
            anthropicsteps,
            googlesteps,
            openaisteps
        };
    },
);
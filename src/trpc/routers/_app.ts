
import { inngest } from '@/inngest/client';
import { baseProcedure, createTRPCRouter, premiumProcedure, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import { TRPCError } from '@trpc/server';
import { workflowsRouter } from '@/features/workflows/server/routers';


export const appRouter = createTRPCRouter({
   workflows: workflowsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;


'use server';
/**
 * @fileOverview Analyzes classroom engagement from a video feed.
 * 
 * - analyzeClassroomEngagement - A function that takes video data and returns an analysis of student engagement.
 * - AnalyzeClassroomEngagementInput - The input type for the analyzeClassroomEngagement function.
 * - AnalyzeClassroomEngagementOutput - The return type for the analyzeClassroomEngagement function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeClassroomEngagementInputSchema = z.object({
  videoFrameDataUri: z.string().describe(
    "A single frame from a classroom video feed, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
});
export type AnalyzeClassroomEngagementInput = z.infer<typeof AnalyzeClassroomEngagementInputSchema>;

const AnalyzeClassroomEngagementOutputSchema = z.object({
  engagedStudents: z.number().describe('The number of students who appear to be engaged.'),
  disengagedStudents: z.number().describe('The number of students who appear to be disengaged.'),
  engagementSummary: z.string().describe('A brief summary of the overall classroom engagement level and suggestions for the teacher.'),
});
export type AnalyzeClassroomEngagementOutput = z.infer<typeof AnalyzeClassroomEngagementOutputSchema>;

export async function analyzeClassroomEngagement(
  input: AnalyzeClassroomEngagementInput
): Promise<AnalyzeClassroomEngagementOutput> {
  return analyzeClassroomEngagementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeClassroomEngagementPrompt',
  input: { schema: AnalyzeClassroomEngagementInputSchema },
  output: { schema: AnalyzeClassroomEngagementOutputSchema },
  prompt: `You are an expert in analyzing classroom dynamics and student engagement. Analyze the provided image, which is a frame from a classroom video feed. 

Based on student's body language, facial expressions, and posture, determine how many students are engaged (e.g., looking at the teacher, taking notes) and how many are disengaged (e.g., looking away, sleeping, on their phones).

Provide a count for engaged and disengaged students. Also, provide a concise summary of the overall engagement level and a helpful, brief suggestion for the teacher to improve engagement if necessary.

Image: {{media url=videoFrameDataUri}}`
});

const analyzeClassroomEngagementFlow = ai.defineFlow(
  {
    name: 'analyzeClassroomEngagementFlow',
    inputSchema: AnalyzeClassroomEngagementInputSchema,
    outputSchema: AnalyzeClassroomEngagementOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

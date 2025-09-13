// src/ai/flows/detect-unauthorized-activities.ts
'use server';

/**
 * @fileOverview Detects unauthorized activities like violence or fights via camera and alerts security personnel.
 *
 * - detectUnauthorizedActivities - A function that takes video data and returns a report of detected unauthorized activities.
 * - DetectUnauthorizedActivitiesInput - The input type for the detectUnauthorizedActivities function.
 * - DetectUnauthorizedActivitiesOutput - The return type for the detectUnauthorizedActivities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectUnauthorizedActivitiesInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video of a classroom or campus area, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DetectUnauthorizedActivitiesInput = z.infer<typeof DetectUnauthorizedActivitiesInputSchema>;

const DetectUnauthorizedActivitiesOutputSchema = z.object({
  unauthorizedActivitiesDetected: z
    .boolean()
    .describe('Whether or not unauthorized activities were detected.'),
  activityReport: z
    .string()
    .describe('A description of the unauthorized activities detected.'),
});
export type DetectUnauthorizedActivitiesOutput = z.infer<typeof DetectUnauthorizedActivitiesOutputSchema>;

export async function detectUnauthorizedActivities(
  input: DetectUnauthorizedActivitiesInput
): Promise<DetectUnauthorizedActivitiesOutput> {
  return detectUnauthorizedActivitiesFlow(input);
}

const detectUnauthorizedActivitiesPrompt = ai.definePrompt({
  name: 'detectUnauthorizedActivitiesPrompt',
  input: {schema: DetectUnauthorizedActivitiesInputSchema},
  output: {schema: DetectUnauthorizedActivitiesOutputSchema},
  prompt: `You are a security expert responsible for monitoring video feeds and detecting unauthorized activities, such as violence or fights.

  Analyze the provided video and determine if any unauthorized activities are taking place. If so, generate a detailed report.

  Video: {{media url=videoDataUri}}`,
});

const detectUnauthorizedActivitiesFlow = ai.defineFlow(
  {
    name: 'detectUnauthorizedActivitiesFlow',
    inputSchema: DetectUnauthorizedActivitiesInputSchema,
    outputSchema: DetectUnauthorizedActivitiesOutputSchema,
  },
  async input => {
    const {output} = await detectUnauthorizedActivitiesPrompt(input);
    return output!;
  }
);

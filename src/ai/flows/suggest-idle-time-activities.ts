// src/ai/flows/suggest-idle-time-activities.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting academic tasks and projects
 * to students during their free time, leveraging AI to align with their strengths,
 * interests, and career goals.
 *
 * @exports suggestIdleTimeActivities - An async function that suggests activities for idle time.
 * @exports SuggestIdleTimeActivitiesInput - The input type for the suggestIdleTimeActivities function.
 * @exports SuggestIdleTimeActivitiesOutput - The output type for the suggestIdleTimeActivities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestIdleTimeActivitiesInputSchema = z.object({
  studentId: z.string().describe('The ID of the student.'),
  freeTimeDescription: z
    .string()
    .describe(
      'A description of the student available free time, including duration and context.'
    ),
  studentStrengths: z
    .string()
    .describe('A description of the student strengths and interests.'),
  studentCareerGoals: z
    .string()
    .describe('A description of the student career goals.'),
  recentCourses: z
    .string()
    .describe('List of recent courses that the student has taken.'),
});

export type SuggestIdleTimeActivitiesInput = z.infer<
  typeof SuggestIdleTimeActivitiesInputSchema
>;

const SuggestIdleTimeActivitiesOutputSchema = z.object({
  suggestedActivities: z
    .array(z.string())
    .describe(
      'A list of suggested academic tasks and projects tailored to the student.'
    ),
  reasoning: z
    .string()
    .describe('Explanation of why the activities were suggested'),
});

export type SuggestIdleTimeActivitiesOutput = z.infer<
  typeof SuggestIdleTimeActivitiesOutputSchema
>;

export async function suggestIdleTimeActivities(
  input: SuggestIdleTimeActivitiesInput
): Promise<SuggestIdleTimeActivitiesOutput> {
  return suggestIdleTimeActivitiesFlow(input);
}

const suggestIdleTimeActivitiesPrompt = ai.definePrompt({
  name: 'suggestIdleTimeActivitiesPrompt',
  input: {schema: SuggestIdleTimeActivitiesInputSchema},
  output: {schema: SuggestIdleTimeActivitiesOutputSchema},
  prompt: `You are an AI academic advisor. A student has some free time and you should suggest activities they could perform.

      Consider the student's strengths, interests, career goals, and recent courses to suggest the most relevant and beneficial activities. Provide a brief justification for each suggestion.

      Student ID: {{{studentId}}}
      Free Time Description: {{{freeTimeDescription}}}
      Student Strengths and Interests: {{{studentStrengths}}}
      Student Career Goals: {{{studentCareerGoals}}}
      Recent Courses: {{{recentCourses}}}

      Based on this information, suggest some relevant academic tasks and projects the student can work on during their free time. Format the output as a list of short and specific suggested activities, along with your reasoning for recommending each activity.`,
});

const suggestIdleTimeActivitiesFlow = ai.defineFlow(
  {
    name: 'suggestIdleTimeActivitiesFlow',
    inputSchema: SuggestIdleTimeActivitiesInputSchema,
    outputSchema: SuggestIdleTimeActivitiesOutputSchema,
  },
  async input => {
    const {output} = await suggestIdleTimeActivitiesPrompt(input);
    return output!;
  }
);

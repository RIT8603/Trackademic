'use server';

/**
 * @fileOverview A flow for suggesting personalized academic activities to students based on their strengths, interests, and career goals.
 *
 * - personalizeAcademicPlanner - A function that takes student information and returns personalized activity suggestions.
 * - PersonalizeAcademicPlannerInput - The input type for the personalizeAcademicPlanner function.
 * - PersonalizeAcademicPlannerOutput - The return type for the personalizeAcademicPlanner function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeAcademicPlannerInputSchema = z.object({
  studentId: z.string().describe('The unique identifier for the student.'),
  strengths: z.string().describe('The student\u2019s academic strengths.'),
  interests: z.string().describe('The student\u2019s interests.'),
  careerGoals: z.string().describe('The student\u2019s career goals.'),
  freeTime: z.string().describe('The student\u2019s available free time slots.'),
});
export type PersonalizeAcademicPlannerInput = z.infer<
  typeof PersonalizeAcademicPlannerInputSchema
>;

const PersonalizeAcademicPlannerOutputSchema = z.object({
  suggestedActivities: z
    .array(z.string())
    .describe('A list of suggested academic activities.'),
});
export type PersonalizeAcademicPlannerOutput = z.infer<
  typeof PersonalizeAcademicPlannerOutputSchema
>;

export async function personalizeAcademicPlanner(
  input: PersonalizeAcademicPlannerInput
): Promise<PersonalizeAcademicPlannerOutput> {
  return personalizeAcademicPlannerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeAcademicPlannerPrompt',
  input: {schema: PersonalizeAcademicPlannerInputSchema},
  output: {schema: PersonalizeAcademicPlannerOutputSchema},
  prompt: `You are an AI academic advisor. You will suggest personalized academic activities to students based on their strengths, interests, career goals, and available free time.

  Student ID: {{{studentId}}}
  Strengths: {{{strengths}}}
  Interests: {{{interests}}}
  Career Goals: {{{careerGoals}}}
  Free Time: {{{freeTime}}}

  Based on the above information, suggest a list of academic activities that the student can do during their free time. The activities should align with their strengths, interests, and career goals. Return a JSON array of strings describing the activities.
  `,
});

const personalizeAcademicPlannerFlow = ai.defineFlow(
  {
    name: 'personalizeAcademicPlannerFlow',
    inputSchema: PersonalizeAcademicPlannerInputSchema,
    outputSchema: PersonalizeAcademicPlannerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

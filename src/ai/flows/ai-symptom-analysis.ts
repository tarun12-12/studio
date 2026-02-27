'use server';
/**
 * @fileOverview An AI agent for preliminary symptom analysis and specialist recommendation.
 *
 * - aiSymptomAnalysis - A function that handles the symptom analysis process.
 * - AiSymptomAnalysisInput - The input type for the aiSymptomAnalysis function.
 * - AiSymptomAnalysisOutput - The return type for the aiSymptomAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiSymptomAnalysisInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A detailed description of the patient\'s symptoms.'),
});
export type AiSymptomAnalysisInput = z.infer<typeof AiSymptomAnalysisInputSchema>;

const AiSymptomAnalysisOutputSchema = z.object({
  potentialConditions: z
    .array(z.string())
    .describe(
      'A list of potential medical conditions based on the symptoms. This is a preliminary analysis and not a diagnosis.'
    ),
  recommendedSpecialists: z
    .array(z.string())
    .describe(
      'A list of specialist doctors recommended for these symptoms. E.g., "Cardiologist", "Dermatologist".'
    ),
});
export type AiSymptomAnalysisOutput = z.infer<typeof AiSymptomAnalysisOutputSchema>;

export async function aiSymptomAnalysis(
  input: AiSymptomAnalysisInput
): Promise<AiSymptomAnalysisOutput> {
  return aiSymptomAnalysisFlow(input);
}

const aiSymptomAnalysisPrompt = ai.definePrompt({
  name: 'aiSymptomAnalysisPrompt',
  input: {schema: AiSymptomAnalysisInputSchema},
  output: {schema: AiSymptomAnalysisOutputSchema},
  prompt: `You are a helpful and knowledgeable medical assistant. Your goal is to provide a preliminary analysis of a patient's symptoms, suggesting potential conditions and appropriate specialist doctors for further consultation.

**IMPORTANT**: This is NOT a diagnosis. Always advise the patient to consult with a qualified medical professional for an accurate diagnosis and treatment plan.

Analyze the following symptoms provided by the patient:

Symptoms:
{{{symptoms}}}

Based on these symptoms, identify:
1.  A list of potential medical conditions.
2.  A list of specialist doctors who typically handle these types of symptoms.`,
});

const aiSymptomAnalysisFlow = ai.defineFlow(
  {
    name: 'aiSymptomAnalysisFlow',
    inputSchema: AiSymptomAnalysisInputSchema,
    outputSchema: AiSymptomAnalysisOutputSchema,
  },
  async input => {
    const {output} = await aiSymptomAnalysisPrompt(input);
    return output!;
  }
);

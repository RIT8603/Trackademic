'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { suggestIdleTimeActivities, SuggestIdleTimeActivitiesOutput } from '@/ai/flows/suggest-idle-time-activities';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  freeTimeDescription: z.string().min(10, 'Please describe your free time (e.g., "I have 2 hours free after lunch on Tuesdays").'),
  studentStrengths: z.string().min(5, 'Please list some of your strengths and interests.'),
  studentCareerGoals: z.string().min(5, 'Please describe your career goals.'),
  recentCourses: z.string().min(3, 'Please list a few recent or current courses.'),
});

type FormData = z.infer<typeof formSchema>;

export function IdleTimeSuggestions() {
  const [suggestions, setSuggestions] = useState<SuggestIdleTimeActivitiesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      freeTimeDescription: '',
      studentStrengths: 'Problem-solving, creative writing, interested in AI',
      studentCareerGoals: 'Become a machine learning engineer',
      recentCourses: 'Data Structures, Linear Algebra, Python Programming',
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await suggestIdleTimeActivities({
        studentId: 'user-123', // Mock student ID
        ...values,
      });
      setSuggestions(result);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate suggestions. Please try again.',
      });
    }
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Productivity Boost</CardTitle>
        <CardDescription>Get AI-powered suggestions for your idle time.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="freeTimeDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Free Time Slot</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 1 hour free between classes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentStrengths"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Strengths & Interests</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Python, data analysis" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentCareerGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Career Goals</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Software Developer at a FAANG company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recentCourses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recent Courses</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Intro to AI, Web Development" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Generate Suggestions
            </Button>
          </form>
        </Form>
        {suggestions && (
          <Alert className="mt-6 bg-accent/50">
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Your Personalized Suggestions!</AlertTitle>
            <AlertDescription>
              <p className="font-semibold mt-2 mb-2">{suggestions.reasoning}</p>
              <ul className="list-disc space-y-2 pl-5">
                {suggestions.suggestedActivities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

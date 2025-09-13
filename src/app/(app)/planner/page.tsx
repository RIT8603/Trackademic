
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { personalizeAcademicPlanner, PersonalizeAcademicPlannerOutput } from '@/ai/flows/personalize-academic-planner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  strengths: z.string().min(5, 'Please describe your strengths.'),
  interests: z.string().min(5, 'Please describe your interests.'),
  careerGoals: z.string().min(5, 'Please describe your career goals.'),
  freeTime: z.string().min(5, 'Describe your available free time slots.'),
});

type FormData = z.infer<typeof formSchema>;

export default function PlannerPage() {
  const [suggestions, setSuggestions] = useState<PersonalizeAcademicPlannerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      strengths: '',
      interests: '',
      careerGoals: '',
      freeTime: '',
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await personalizeAcademicPlanner({
        studentId: 'user-123', // Mock student ID
        ...values,
      });
      setSuggestions(result);
      toast({
        title: 'Plan Generated!',
        description: 'Your personalized academic plan is ready.',
      });
    } catch (error) {
      console.error('Error generating plan:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate a plan. Please try again.',
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Academic Planner</h1>
        <p className="text-muted-foreground">Get a personalized plan to help you achieve your academic and career goals.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tell Us About Yourself</CardTitle>
            <CardDescription>The more details you provide, the better the recommendations will be.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="strengths"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Strengths</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Mathematics, logical reasoning" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Interests</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Artificial intelligence, robotics" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="careerGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Career Goals</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Work as a data scientist in the healthcare industry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="freeTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available Free Time</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Weekday afternoons, weekends" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                  Generate My Plan
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Your Suggested Activities</h2>
          {isLoading ? (
             <Card className="flex items-center justify-center min-h-[30rem] lg:min-h-full">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p>Generating your plan...</p>
                </div>
             </Card>
          ) : suggestions ? (
            <Card className="min-h-[30rem] lg:min-h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-accent" />
                        Here is your personalized plan!
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-decimal space-y-3 pl-5 mt-4">
                    {suggestions.suggestedActivities.map((activity, index) => (
                        <li key={index} className="pl-2">{activity}</li>
                    ))}
                    </ul>
                </CardContent>
            </Card>
          ) : (
            <Card className="flex items-center justify-center min-h-[30rem] lg:min-h-full border-dashed">
                <div className="text-center text-muted-foreground p-4">
                    <p>Fill out the form and your suggested activities will appear here.</p>
                </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

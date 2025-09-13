
'use client';
import React, { useState } from 'react';
import { detectUnauthorizedActivities, DetectUnauthorizedActivitiesOutput } from '@/ai/flows/detect-unauthorized-activities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldAlert, Upload } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function SecurityPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<DetectUnauthorizedActivitiesOutput | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setReport(null);
    }
  };

  const handleProcessSecurityFeed = async () => {
    if (!videoFile) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please upload a video file to scan for threats.',
      });
      return;
    }

    setIsLoading(true);
    setReport(null);

    const reader = new FileReader();
    reader.readAsDataURL(videoFile);
    reader.onload = async (e) => {
      const videoDataUri = e.target?.result as string;
      try {
        const result = await detectUnauthorizedActivities({ videoDataUri });
        setReport(result);
        if (result.unauthorizedActivitiesDetected) {
            toast({
                variant: 'destructive',
                title: 'Security Alert!',
                description: 'Unauthorized activities detected. Review the report.',
              });
        } else {
            toast({
                title: 'All Clear',
                description: 'No unauthorized activities were detected.',
            });
        }
      } catch (error) {
        console.error('Error processing security feed:', error);
        toast({
          variant: 'destructive',
          title: 'Processing Error',
          description: 'Failed to analyze the security feed.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
        toast({
            variant: 'destructive',
            title: 'File Read Error',
            description: 'Could not read the selected file.',
          });
        setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Security Monitoring</h1>
        <p className="text-muted-foreground">AI-powered detection of unauthorized activities on campus.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Campus Security Feed Simulation</CardTitle>
          <CardDescription>Upload a video to simulate a campus security camera. The AI will analyze it for threats like violence or fights.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="video-upload">Upload Security Footage</Label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <Input id="video-upload" type="file" accept="video/*" onChange={handleFileChange} />
                <Button onClick={handleProcessSecurityFeed} disabled={isLoading || !videoFile} className="w-full sm:w-auto shrink-0">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                    Scan Feed
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {report && (
        <Card>
            <CardHeader>
                <CardTitle>Security Analysis Report</CardTitle>
            </CardHeader>
            <CardContent>
                {report.unauthorizedActivitiesDetected ? (
                    <Alert variant="destructive">
                        <ShieldAlert className="h-4 w-4" />
                        <AlertTitle>Threat Detected!</AlertTitle>
                        <AlertDescription>
                            <p className="mt-2">{report.activityReport}</p>
                            <p className="mt-4 text-xs">Security personnel have been notified.</p>
                        </AlertDescription>
                    </Alert>
                ) : (
                    <Alert>
                        <ShieldAlert className="h-4 w-4" />
                        <AlertTitle>All Clear</AlertTitle>
                        <AlertDescription>
                            {report.activityReport || 'No unauthorized activities were found in the provided footage.'}
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
      )}
    </div>
  );
}

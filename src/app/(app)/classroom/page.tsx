
'use client';
import { analyzeClassroomEngagement } from '@/ai/flows/analyze-classroom-engagement';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Camera, Group, Info, Loader2, UserCheck, UserX } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

export default function ClassroomPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<{
    engagedStudents: number;
    disengagedStudents: number;
    engagementSummary: string;
  } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Media Devices Not Supported',
          description: 'Your browser does not support camera access.',
        });
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [toast]);

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        return canvas.toDataURL('image/jpeg');
      }
    }
    return null;
  };

  const handleAnalyzeEngagement = async () => {
    const videoFrameDataUri = captureFrame();
    if (!videoFrameDataUri) {
      toast({
        variant: 'destructive',
        title: 'Capture Error',
        description: 'Could not capture a frame from the video feed.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await analyzeClassroomEngagement({ videoFrameDataUri });
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing engagement:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Error',
        description: 'The AI model failed to analyze the classroom engagement.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const totalStudents = (analysis?.engagedStudents ?? 0) + (analysis?.disengagedStudents ?? 0);
  const engagementPercentage = totalStudents > 0 ? Math.round(((analysis?.engagedStudents ?? 0) / totalStudents) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Live Classroom</h1>
        <p className="text-muted-foreground">Monitor real-time student engagement using AI.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Classroom Feed</CardTitle>
          <CardDescription>
            This is a live feed from your classroom camera. Use the button below to analyze the current engagement level.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-md border bg-muted overflow-hidden">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            <canvas ref={canvasRef} className="hidden" />
            {hasCameraPermission === false && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 text-center p-4">
                  <Camera className="h-12 w-12 text-muted-foreground mb-4"/>
                  <h3 className="text-lg font-semibold">Camera Access Required</h3>
                  <p className="text-sm text-muted-foreground">Please grant camera permissions to use this feature.</p>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <Button onClick={handleAnalyzeEngagement} disabled={isLoading || hasCameraPermission !== true}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Info className="mr-2 h-4 w-4" />}
              Analyze Engagement
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle>Engagement Analysis</CardTitle>
            <CardDescription>A real-time snapshot of your classroom's focus.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="flex flex-col items-center justify-center p-4">
                <Group className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-3xl font-bold">{totalStudents}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4">
                <UserCheck className="h-8 w-8 text-green-500 mb-2" />
                <p className="text-3xl font-bold">{analysis.engagedStudents}</p>
                <p className="text-sm text-muted-foreground">Engaged</p>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4">
                <UserX className="h-8 w-8 text-destructive mb-2" />
                <p className="text-3xl font-bold">{analysis.disengagedStudents}</p>
                <p className="text-sm text-muted-foreground">Disengaged</p>
              </Card>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Overall Engagement: {engagementPercentage}%</Label>
              <Progress value={engagementPercentage} className="mt-2" />
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>AI Summary & Suggestion</AlertTitle>
              <AlertDescription>
                {analysis.engagementSummary}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = (props) => <label {...props} />;

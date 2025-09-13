'use client';
import React, { useState } from 'react';
import { automateAttendance, AutomateAttendanceOutput } from '@/ai/flows/automate-attendance';
import { studentList } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Loader2, Upload, XCircle } from 'lucide-react';

export default function AttendancePage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [attendanceRecord, setAttendanceRecord] = useState<AutomateAttendanceOutput['attendanceRecord'] | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setAttendanceRecord(null);
    }
  };

  const handleProcessAttendance = async () => {
    if (!videoFile) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please upload a video file to process attendance.',
      });
      return;
    }

    setIsLoading(true);
    setAttendanceRecord(null);

    const reader = new FileReader();
    reader.readAsDataURL(videoFile);
    reader.onload = async (e) => {
      const cameraFeedDataUri = e.target?.result as string;
      try {
        const result = await automateAttendance({ cameraFeedDataUri, studentList });
        setAttendanceRecord(result.attendanceRecord);
        toast({
          title: 'Success',
          description: 'Attendance processed successfully.',
        });
      } catch (error) {
        console.error('Error processing attendance:', error);
        toast({
          variant: 'destructive',
          title: 'Processing Error',
          description: 'Failed to process attendance. The AI model may have encountered an issue.',
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
        <h1 className="text-3xl font-bold tracking-tight font-headline">Automated Attendance</h1>
        <p className="text-muted-foreground">Use AI to take class attendance automatically from a camera feed.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Simulate Classroom Feed</CardTitle>
          <CardDescription>Upload a video file to simulate the classroom camera. The AI will analyze it to detect students.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="video-upload">Upload Video</Label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <Input id="video-upload" type="file" accept="video/*" onChange={handleFileChange} />
                <Button onClick={handleProcessAttendance} disabled={isLoading || !videoFile} className="w-full sm:w-auto">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                    Process
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {attendanceRecord && (
        <Card>
            <CardHeader>
                <CardTitle>Attendance Results</CardTitle>
                <CardDescription>Results from the automated attendance scan.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student Name</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.entries(attendanceRecord).map(([name, present]) => (
                            <TableRow key={name}>
                                <TableCell className="font-medium">{name}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {present ? (
                                            <>
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                <span>Present</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-5 w-5 text-destructive" />
                                                <span>Absent</span>
                                            </>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      )}
    </div>
  );
}

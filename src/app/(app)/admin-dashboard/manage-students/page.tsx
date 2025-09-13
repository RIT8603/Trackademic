// src/app/(app)/admin-dashboard/manage-students/page.tsx
'use client';
import { useState } from 'react';
import { students } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, Trash2, Edit } from 'lucide-react';

export default function ManageStudentsPage() {
  const [studentData, setStudentData] = useState(students);
  const [isEdit, setIsEdit] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<any>(null);
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    setStudentData(studentData.filter((student) => student.id !== id));
    toast({
        title: "Student Deleted",
        description: "The student record has been successfully deleted.",
    })
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newStudent: any = {
        id: isEdit && currentStudent ? currentStudent.id : `student-${Date.now()}`,
        name: formData.get('name') as string,
        rollNo: formData.get('rollNo') as string,
        email: formData.get('email') as string,
        mobile: formData.get('mobile') as string,
        gender: formData.get('gender') as string,
        branch: formData.get('branch') as string,
        course: formData.get('course') as string,
        session: formData.get('session') as string,
        parent: {
            name: formData.get('parentName') as string,
            email: formData.get('parentEmail') as string,
            mobile: formData.get('parentMobile') as string,
        },
        photoUrl: isEdit && currentStudent ? currentStudent.photoUrl : 'https://picsum.photos/seed/new-student/100/100',
        lateCount: isEdit && currentStudent ? currentStudent.lateCount : 0,
        behavioralFlags: isEdit && currentStudent ? currentStudent.behavioralFlags : 0,
    };
    
    if (isEdit) {
        setStudentData(studentData.map(s => s.id === newStudent.id ? newStudent : s))
        toast({
            title: "Student Updated",
            description: "The student record has been successfully updated.",
        })
    } else {
        setStudentData([...studentData, newStudent]);
        toast({
            title: "Student Added",
            description: "The new student has been successfully added.",
        })
    }

    // This would typically close a dialog
    const closeButton = document.getElementById('dialog-close');
    if(closeButton) closeButton.click();
  };
  
  const openDialog = (student: any = null) => {
      if(student) {
          setIsEdit(true);
          setCurrentStudent(student);
      } else {
          setIsEdit(false);
          setCurrentStudent(null);
      }
  }


  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Manage Students</h1>
        <p className="text-muted-foreground">Add, edit, or remove student records.</p>
      </div>
      <Card>
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <CardTitle>Student List</CardTitle>
                <CardDescription>A complete directory of all students in the institution.</CardDescription>
            </div>
            <Dialog onOpenChange={(isOpen) => !isOpen && openDialog()}>
                <DialogTrigger asChild>
                    <Button onClick={() => openDialog()} className="w-full md:w-auto">
                        <PlusCircle className="mr-2" />
                        Add Student
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{isEdit ? 'Edit Student' : 'Add New Student'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 max-h-[70vh] overflow-y-auto px-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" defaultValue={currentStudent?.name} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rollNo">Roll No</Label>
                            <Input id="rollNo" name="rollNo" defaultValue={currentStudent?.rollNo} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" defaultValue={currentStudent?.email} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="mobile">Mobile Number</Label>
                            <Input id="mobile" name="mobile" defaultValue={currentStudent?.mobile} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Input id="gender" name="gender" defaultValue={currentStudent?.gender} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="branch">Branch</Label>
                            <Input id="branch" name="branch" defaultValue={currentStudent?.branch} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="course">Course</Label>
                            <Input id="course" name="course" defaultValue={currentStudent?.course} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="session">Session</Label>
                            <Input id="session" name="session" defaultValue={currentStudent?.session} />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <h3 className="font-medium mt-2 border-b pb-2">Parent Details</h3>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="parentName">Parent Name</Label>
                            <Input id="parentName" name="parentName" defaultValue={currentStudent?.parent.name} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="parentEmail">Parent Email</Label>
                            <Input id="parentEmail" name="parentEmail" type="email" defaultValue={currentStudent?.parent.email} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="parentMobile">Parent Mobile</Label>
                            <Input id="parentMobile" name="parentMobile" defaultValue={currentStudent?.parent.mobile} />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <h3 className="font-medium mt-2 border-b pb-2">Media</h3>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="photo">Photo</Label>
                            <Input id="photo" name="photo" type="file" accept="image/*" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="video">1-min Face Video</Label>
                            <Input id="video" name="video" type="file" accept="video/*" />
                        </div>
                        <DialogFooter className="md:col-span-2 mt-4">
                            <DialogClose asChild>
                               <Button type="button" variant="secondary" id="dialog-close">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">{isEdit ? 'Save Changes' : 'Add Student'}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Roll No.</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Course</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentData.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell className="hidden md:table-cell">{student.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{student.course}</TableCell>
                  <TableCell className="text-right">
                    <Dialog onOpenChange={(isOpen) => !isOpen && openDialog()}>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DialogTrigger asChild>
                                <DropdownMenuItem onClick={() => openDialog(student)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuItem onClick={() => handleDelete(student.id)} className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                         <DialogContent className="sm:max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Edit Student</DialogTitle>
                            </DialogHeader>
                           <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 max-h-[70vh] overflow-y-auto px-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name-edit">Full Name</Label>
                                    <Input id="name-edit" name="name" defaultValue={currentStudent?.name} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rollNo-edit">Roll No</Label>
                                    <Input id="rollNo-edit" name="rollNo" defaultValue={currentStudent?.rollNo} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email-edit">Email</Label>
                                    <Input id="email-edit" name="email" type="email" defaultValue={currentStudent?.email} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mobile-edit">Mobile Number</Label>
                                    <Input id="mobile-edit" name="mobile" defaultValue={currentStudent?.mobile} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gender-edit">Gender</Label>
                                    <Input id="gender-edit" name="gender" defaultValue={currentStudent?.gender} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="branch-edit">Branch</Label>
                                    <Input id="branch-edit" name="branch" defaultValue={currentStudent?.branch} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="course-edit">Course</Label>
                                    <Input id="course-edit" name="course" defaultValue={currentStudent?.course} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="session-edit">Session</Label>
                                    <Input id="session-edit" name="session" defaultValue={currentStudent?.session} />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <h3 className="font-medium mt-2 border-b pb-2">Parent Details</h3>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="parentName-edit">Parent Name</Label>
                                    <Input id="parentName-edit" name="parentName" defaultValue={currentStudent?.parent.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="parentEmail-edit">Parent Email</Label>
                                    <Input id="parentEmail-edit" name="parentEmail" type="email" defaultValue={currentStudent?.parent.email} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="parentMobile-edit">Parent Mobile</Label>
                                    <Input id="parentMobile-edit" name="parentMobile" defaultValue={currentStudent?.parent.mobile} />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <h3 className="font-medium mt-2 border-b pb-2">Media</h3>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="photo-edit">Photo</Label>
                                    <Input id="photo-edit" name="photo" type="file" accept="image/*" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="video-edit">1-min Face Video</Label>
                                    <Input id="video-edit" name="video" type="file" accept="video/*" />
                                </div>
                                <DialogFooter className="md:col-span-2 mt-4">
                                    <DialogClose asChild>
                                    <Button type="button" variant="secondary" id="edit-dialog-close">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit">Save Changes</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

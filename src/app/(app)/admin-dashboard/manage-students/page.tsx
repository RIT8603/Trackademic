
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
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ManageStudentsPage() {
  const [studentData, setStudentData] = useState(students);
  const [isEdit, setIsEdit] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
        setStudentData([newStudent, ...studentData]);
        toast({
            title: "Student Added",
            description: "The new student has been successfully added.",
        })
    }
    
    setIsDialogOpen(false);
  };
  
  const openDialog = (student: any = null) => {
      if(student) {
          setIsEdit(true);
          setCurrentStudent(student);
      } else {
          setIsEdit(false);
          setCurrentStudent(null);
      }
      setIsDialogOpen(true);
  }

  const commonFormFields = (isEditMode: boolean) => {
    const student = isEditMode ? currentStudent : null;
    const idSuffix = isEditMode ? `edit-${student?.id}`: 'add';
    
    return (
        <ScrollArea className="max-h-[70vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1">
                <div className="space-y-2">
                    <Label htmlFor={`name-${idSuffix}`}>Full Name</Label>
                    <Input id={`name-${idSuffix}`} name="name" defaultValue={student?.name} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`rollNo-${idSuffix}`}>Roll No</Label>
                    <Input id={`rollNo-${idSuffix}`} name="rollNo" defaultValue={student?.rollNo} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`email-${idSuffix}`}>Email</Label>
                    <Input id={`email-${idSuffix}`} name="email" type="email" defaultValue={student?.email} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`mobile-${idSuffix}`}>Mobile Number</Label>
                    <Input id={`mobile-${idSuffix}`} name="mobile" defaultValue={student?.mobile} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`gender-${idSuffix}`}>Gender</Label>
                    <Input id={`gender-${idSuffix}`} name="gender" defaultValue={student?.gender} />
                </div>
                    <div className="space-y-2">
                    <Label htmlFor={`branch-${idSuffix}`}>Branch</Label>
                    <Input id={`branch-${idSuffix}`} name="branch" defaultValue={student?.branch} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`course-${idSuffix}`}>Course</Label>
                    <Input id={`course-${idSuffix}`} name="course" defaultValue={student?.course} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`session-${idSuffix}`}>Session</Label>
                    <Input id={`session-${idSuffix}`} name="session" defaultValue={student?.session} />
                </div>
                <div className="md:col-span-2 space-y-2">
                    <h3 className="font-medium mt-2 border-b pb-2">Parent Details</h3>
                </div>
                    <div className="space-y-2">
                    <Label htmlFor={`parentName-${idSuffix}`}>Parent Name</Label>
                    <Input id={`parentName-${idSuffix}`} name="parentName" defaultValue={student?.parent.name} />
                </div>
                    <div className="space-y-2">
                    <Label htmlFor={`parentEmail-${idSuffix}`}>Parent Email</Label>
                    <Input id={`parentEmail-${idSuffix}`} name="parentEmail" type="email" defaultValue={student?.parent.email} />
                </div>
                    <div className="space-y-2">
                    <Label htmlFor={`parentMobile-${idSuffix}`}>Parent Mobile</Label>
                    <Input id={`parentMobile-${idSuffix}`} name="parentMobile" defaultValue={student?.parent.mobile} />
                </div>
                <div className="md:col-span-2 space-y-2">
                    <h3 className="font-medium mt-2 border-b pb-2">Media</h3>
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`photo-${idSuffix}`}>Photo</Label>
                    <Input id={`photo-${idSuffix}`} name="photo" type="file" accept="image/*" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`video-${idSuffix}`}>1-min Face Video</Label>
                    <Input id={`video-${idSuffix}`} name="video" type="file" accept="video/*" />
                </div>
            </div>
        </ScrollArea>
    );
  };


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
            <Button onClick={() => openDialog()} className="w-full md:w-auto shrink-0">
                <PlusCircle className="mr-2" />
                Add Student
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Roll No.</TableHead>
                <TableHead className="hidden lg:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Course</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentData.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">{student.rollNo}</TableCell>
                  <TableCell className="hidden lg:table-cell">{student.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{student.course}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openDialog(student)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(student.id)} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle>{isEdit ? 'Edit Student' : 'Add New Student'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-4">
                {commonFormFields(isEdit)}
                <DialogFooter className="pt-4">
                    <DialogClose asChild>
                       <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">{isEdit ? 'Save Changes' : 'Add Student'}</Button>
                </DialogFooter>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

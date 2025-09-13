export const studentList = [
    "Olivia Smith", "Noah Johnson", "Emma Williams", "Liam Brown", "Ava Jones", 
    "William Garcia", "Sophia Miller", "James Davis", "Isabella Rodriguez", "Oliver Martinez"
];

export const students = [
    {
        id: "student-1",
        name: "Olivia Smith",
        rollNo: "CS101",
        email: "olivia.smith@example.com",
        mobile: "123-456-7890",
        gender: "Female",
        branch: "Computer Science",
        course: "B.Tech",
        session: "2021-2025",
        parent: {
            name: "David Smith",
            email: "parent.smith@example.com",
            mobile: "098-765-4321",
        },
        photoUrl: "https://picsum.photos/seed/olivia/100/100",
        lateCount: 12,
        behavioralFlags: 3,
    },
    {
        id: "student-2",
        name: "Noah Johnson",
        rollNo: "EE202",
        email: "noah.johnson@example.com",
        mobile: "123-456-7891",
        gender: "Male",
        branch: "Electrical Engineering",
        course: "B.Tech",
        session: "2021-2025",
        parent: {
            name: "Michael Johnson",
            email: "parent.johnson@example.com",
            mobile: "098-765-4322",
        },
        photoUrl: "https://picsum.photos/seed/noah/100/100",
        lateCount: 5,
        behavioralFlags: 1,
    },
    {
        id: "student-3",
        name: "James Davis",
        rollNo: "ME303",
        email: "james.davis@example.com",
        mobile: "123-456-7892",
        gender: "Male",
        branch: "Mechanical Engineering",
        course: "B.Tech",
        session: "2020-2024",
        parent: {
            name: "Robert Davis",
            email: "parent.davis@example.com",
            mobile: "098-765-4323",
        },
        photoUrl: "https://picsum.photos/seed/james/100/100",
        lateCount: 35,
        behavioralFlags: 2,
    },
     {
        id: "student-4",
        name: "Emma Williams",
        lateCount: 32,
        course: "Advanced Physics",
        email: "emma.williams@example.com",
        parent: {
            name: "Chris Williams",
            email: "parent.williams@example.com",
            mobile: "098-765-4324"
        },
        rollNo: "PHY401",
        mobile: "123-456-7893",
        gender: "Female",
        branch: "Physics",
        session: "2020-2024",
        photoUrl: "https://picsum.photos/seed/emma/100/100",
        behavioralFlags: 0,
    },
    {
        id: "student-5",
        name: "Oliver Martinez",
        behavioralFlags: 42,
        course: "Disruptive Behavior",
        email: "oliver.martinez@example.com",
        parent: {
            name: "Jose Martinez",
            email: "parent.martinez@example.com",
            mobile: "098-765-4325"
        },
        rollNo: "PSY101",
        mobile: "123-456-7894",
        gender: "Male",
        branch: "Psychology",
        session: "2022-2026",
        photoUrl: "https://picsum.photos/seed/oliver/100/100",
        lateCount: 18,
    }
];

export const schedule = [
    { time: "09:00 - 10:30", subject: "Advanced Physics", location: "Hall C, Room 201", status: "Ongoing" },
    { time: "10:30 - 11:00", subject: "Free Period", location: "-", status: "Upcoming" },
    { time: "11:00 - 12:30", subject: "Calculus II", location: "Hall A, Room 105", status: "Upcoming" },
    { time: "12:30 - 13:30", subject: "Lunch Break", location: "Cafeteria", status: "Upcoming" },
    { time: "13:30 - 15:00", subject: "Literary Analysis", location: "Hall B, Room 310", status: "Upcoming" }
];

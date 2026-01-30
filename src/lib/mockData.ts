"use client";

// Types
export interface TimelineEvent {
    date: string;
    action: string;
    by: string; // "System", "Admin", "Department"
}

export interface Report {
    id: string; // Changed to string for flexibility
    type: string; // "Road Damage", "Sanitation", etc.
    sdg: number; // 6 (Water/Sanitation) or 9 (Infrastructure)
    location: string; // "Ward 12, Nagpur"
    coordinates: { lat: number, lng: number };
    date: string;
    status: 'Pending' | 'In Review' | 'In Progress' | 'Resolved';
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    image: string;
    description: string;
    timeline: TimelineEvent[];
    userId: string;
}

const STORAGE_KEY = 'infraguard_reports';

const initialReports: Report[] = [
    {
        id: "1001",
        type: "Road Damage",
        sdg: 9,
        location: "Ward 12, Dharampeth, Nagpur",
        coordinates: { lat: 21.1458, lng: 79.0882 },
        date: "2024-01-20",
        status: "In Progress",
        priority: "High",
        image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400",
        description: "Large pothole causing traffic jam near market square.",
        timeline: [
            { date: "2024-01-20 10:30 AM", action: "Report Submitted", by: "Citizen" },
            { date: "2024-01-21 09:00 AM", action: "Verified", by: "Admin" },
            { date: "2024-01-21 02:00 PM", action: "Assigned to PWD", by: "Admin" }
        ],
        userId: "user_1"
    },
    {
        id: "1002",
        type: "Water Leakage",
        sdg: 6,
        location: "Ward 5, Sadar, Nagpur",
        coordinates: { lat: 21.1558, lng: 79.0782 },
        date: "2024-01-22",
        status: "Pending",
        priority: "Medium",
        image: "https://images.unsplash.com/photo-1583307767664-9b8849646452?auto=format&fit=crop&q=80&w=400",
        description: "Pipeline leaking freshwater for 2 days.",
        timeline: [
            { date: "2024-01-22 08:15 AM", action: "Report Submitted", by: "Citizen" }
        ],
        userId: "user_2"
    },
    {
        id: "1003",
        type: "Streetlight Failure",
        sdg: 9,
        location: "Ward 8, Civil Lines, Nagpur",
        coordinates: { lat: 21.1600, lng: 79.0600 },
        date: "2024-01-18",
        status: "Resolved",
        priority: "Low",
        image: "https://images.unsplash.com/photo-1555663782-b13175c531d0?auto=format&fit=crop&q=80&w=400",
        description: "Streetlights not working on main avenue.",
        timeline: [
            { date: "2024-01-18 06:00 PM", action: "Report Submitted", by: "Citizen" },
            { date: "2024-01-19 10:00 AM", action: "Assigned to Electricity Dept", by: "Admin" },
            { date: "2024-01-20 04:00 PM", action: "Repaired", by: "Department" },
            { date: "2024-01-20 05:00 PM", action: "Resolved", by: "System" }
        ],
        userId: "user_3"
    },
    {
        id: "1004",
        type: "Garbage Dump",
        sdg: 6,
        location: "Ward 15, Sitabuldi, Nagpur",
        coordinates: { lat: 21.1400, lng: 79.0900 },
        date: "2024-01-23",
        status: "In Review",
        priority: "Critical",
        image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=400",
        description: "Illegal garbage dumping near school area.",
        timeline: [
            { date: "2024-01-23 09:30 AM", action: "Report Submitted", by: "Citizen" },
            { date: "2024-01-23 10:00 AM", action: "Flagged for Immediate Review", by: "System" }
        ],
        userId: "user_1"
    }
];

export const MockDB = {
    getReports: (): Report[] => {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialReports));
            return initialReports;
        }
        return JSON.parse(stored);
    },

    getReportById: (id: string): Report | undefined => {
        const reports = MockDB.getReports();
        return reports.find(r => r.id === id);
    },

    addReport: (reportData: Partial<Report>) => {
        const reports = MockDB.getReports();
        const newReport: Report = {
            id: (1000 + reports.length + 1).toString(),
            type: reportData.type || "Other",
            sdg: (reportData.type?.includes("Water") || reportData.type?.includes("Garbage")) ? 6 : 9,
            location: reportData.location || "Unknown",
            coordinates: {
                lat: 21.1458 + (Math.random() - 0.5) * 0.05,
                lng: 79.0882 + (Math.random() - 0.5) * 0.05
            },
            date: new Date().toISOString().split('T')[0],
            status: 'Pending',
            priority: (reportData.priority as any) || 'Medium',
            image: reportData.image || "",
            description: reportData.description || "",
            timeline: [
                { date: new Date().toLocaleString(), action: "Report Submitted", by: "Citizen" }
            ],
            userId: reportData.userId || "guest"
        };
        reports.unshift(newReport);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
        return newReport;
    },

    updateReport: (id: string, updates: Partial<Report>) => {
        const reports = MockDB.getReports();
        const index = reports.findIndex(r => r.id === id);

        if (index !== -1) {
            // If status changed, add to timeline
            let newTimeline = reports[index].timeline;
            if (updates.status && updates.status !== reports[index].status) {
                newTimeline = [...newTimeline, {
                    date: new Date().toLocaleString(),
                    action: `Status changed to ${updates.status}`,
                    by: "Admin"
                }];
            }

            reports[index] = { ...reports[index], ...updates, timeline: newTimeline };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
            return reports[index];
        }
        return null;
    },

    // Legacy support wrapper
    updateStatus: (id: number, status: any) => {
        MockDB.updateReport(id.toString(), { status });
    },

    fileToBase64: (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }
};

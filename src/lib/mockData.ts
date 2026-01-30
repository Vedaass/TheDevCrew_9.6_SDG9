"use client";

// Types
export interface Report {
    id: number;
    type: string;
    description: string;
    location: string;
    status: 'Submitted' | 'In Progress' | 'Resolved';
    severity: 'Low' | 'Medium' | 'High';
    date: string;
    image: string; // Base64 or URL
    userId: string; // To filter by user
}

const STORAGE_KEY = 'infraguard_reports';

// Initial Mock Data (to populate if empty)
const INITIAL_REPORTS: Report[] = [
    {
        id: 1001,
        type: 'Road Damage',
        description: 'Large pothole on main road.',
        location: 'MG Road, Pune',
        status: 'In Progress',
        severity: 'High',
        date: '2026-01-28',
        image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        userId: 'default_citizen'
    },
    {
        id: 1002,
        type: 'Streetlight Failure',
        description: 'Streetlights not working for 3 days.',
        location: 'Sector 4, Mumbai',
        status: 'Resolved',
        severity: 'Medium',
        date: '2026-01-20',
        image: 'https://images.unsplash.com/photo-1605656100005-726ddd121d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        userId: 'default_citizen'
    },
];

export const MockDB = {
    getReports: (): Report[] => {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REPORTS));
            return INITIAL_REPORTS;
        }
        return JSON.parse(stored);
    },

    addReport: (report: Omit<Report, 'id' | 'date' | 'status'>) => {
        const reports = MockDB.getReports();
        const newReport: Report = {
            ...report,
            id: 1000 + reports.length + 1,
            date: new Date().toISOString().split('T')[0],
            status: 'Submitted',
        };
        reports.unshift(newReport); // Add to top
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
        return newReport;
    },

    updateStatus: (id: number, status: Report['status']) => {
        const reports = MockDB.getReports();
        const index = reports.findIndex(r => r.id === id);
        if (index !== -1) {
            reports[index].status = status;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
        }
    },

    // Helper to convert file to base64 for local storage
    fileToBase64: (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }
};

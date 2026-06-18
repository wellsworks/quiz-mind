export interface LoginResponse {
    access_token: string;
    token_type: string;
}

export interface Note {
    id: number;
    title: string;
    content: string;
}

export interface Flashcard {
    id: number;
    question: string; 
    answer: string; 
    note_id: number; 
    source: string
}

export interface StudySession {
    id: number;
    mode: string;
    scope: string;
    note_id: any;
}

export interface AIJob {
    job_id: number;
    status: string;
}

export interface NoteSummary extends Note {
    flashcard_count: number;
}
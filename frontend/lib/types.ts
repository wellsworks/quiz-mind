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
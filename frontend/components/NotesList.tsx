interface Note {
    id: string;
    title: string;
    content: string;
}

interface NotesListProps {
    notes: Note[];
    onSelect: (id: string) => void;
}

export default function NotesList({ notes, onSelect }: NotesListProps) {
    return (
        <div className="space-y-4">
            {notes.map((note) => (
                <div 
                    key={note.id}
                    className="p-4 border rounded-xl cursor-pointer hover:bg-gray-50"
                    onClick={() => onSelect(note.id)}
                >
                    <h3 className="font-semibold text-lg">{note.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{note.content}</p>
                </div>
            ))}
        </div>
    );
}
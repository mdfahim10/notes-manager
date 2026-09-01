import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "../styles/AddNotes.css"

export default function AddNotes() {

    const [noteData, setNoteData] = useState({});
    const navigate = useNavigate();
    const handleAddNote = async () => {
        console.log(noteData);
        let result = await fetch("http://localhost:3200/add-notes", {
            method: "POST",
            body: JSON.stringify(noteData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json()
        if (result) {
            navigate("/")
            setNoteData({});
        }
    }
    return (
        <div>
            <h1 className="page-header">Add New Note</h1>
            <div className="container">

                <form>

                    <label>Topic</label>

                    <input
                        onChange={(event) => setNoteData({
                            ...noteData,
                            topic: event.target.value
                        })}
                        type="text"
                        name="topic"
                        placeholder="Enter topic"
                    />

                    <label>Subject</label>

                    <input
                        onChange={(event) => setNoteData({
                            ...noteData,
                            subject: event.target.value
                        })}
                        type="text"
                        name="subject"
                        placeholder="Enter subject"
                    />

                    <label>Description</label>

                    <textarea
                        onChange={(event) => setNoteData({
                            ...noteData,
                            description: event.target.value
                        })}
                        rows={6}
                        name="description"
                        placeholder="Enter notes in details"
                    />

                    <label>Tags</label>

                    <textarea
                        onChange={(event) => setNoteData({
                            ...noteData,
                            tags: event.target.value
                        })}
                        rows={3}
                        name="tags"
                        placeholder="Enter points covered in this note"
                    />

                    <button
                        type="button"
                        className="submit"
                        onClick={handleAddNote}
                    >
                        Add Note
                    </button>

                </form>

            </div>
        </div>
    );

}
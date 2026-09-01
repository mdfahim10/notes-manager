import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faPen
} from "@fortawesome/free-solid-svg-icons";
import "../styles/UpdateNotes.css";

export default function UpdateNotes() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [noteData, setNoteData] = useState({
        topic: "",
        subject: "",
        description: "",
        tags: ""
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getNote();
    }, [id]);
    const getNote = async () => {
        try {
            let result = await fetch(
                `http://localhost:3200/notes/${id}`
            );
            result = await result.json();
            if (result.success) {
                setNoteData({
                    topic: result.result.topic || "",
                    subject: result.result.subject || "",
                    description: result.result.description || "",
                    tags: result.result.tags || ""
                });
            }
        } catch (error) {
            console.log("Error fetching note:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNoteData({
            ...noteData,
            [name]: value
        });
    };
    const updateNote = async (e) => {
        e.preventDefault();
        try {
            let result = await fetch(
                `http://localhost:3200/update/${id}`,
                {
                    method: "PUT",
                    headers: {

                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(noteData)
                }
            );
            result = await result.json();
            if (result.success) {
                navigate("/");
            } else {
                console.log("Note not updated");
            }
        } catch (error) {
            console.log("Error updating note:", error);
        }
    };
    if (loading) {
        return (
            <div className="update-loading">
                Loading note...
            </div>
        );
    }
    return (
        <div className="update-page">
            <div className="update-top">
                <button
                    className="back-button"
                    onClick={() => navigate("/")}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span>
                        Back to Notes
                    </span>
                </button>
            </div>
            <h1 className="page-header">
                Update Note
            </h1>
            <form
                className="update-form"
                onSubmit={updateNote}
            >
                <div className="form-group">
                    <label htmlFor="topic">
                        Topic
                    </label>
                    <input
                        id="topic"
                        type="text"
                        name="topic"
                        value={noteData.topic}
                        onChange={handleChange}
                        placeholder="Enter topic"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">
                        Subject
                    </label>
                    <input
                        id="subject"
                        type="text"
                        name="subject"
                        value={noteData.subject}
                        onChange={handleChange}
                        placeholder="Enter subject"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={noteData.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                        rows="7"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tags">
                        Tags
                    </label>
                    <input
                        id="tags"
                        type="text"
                        name="tags"
                        value={noteData.tags}
                        onChange={handleChange}
                        placeholder="Example: React, JavaScript, MERN"
                    />
                </div>
                <button
                    type="submit"
                    className="update-button"
                >
                    <FontAwesomeIcon icon={faPen} />
                    <span>
                        Update Note
                    </span>
                </button>
            </form>
        </div>
    );
}
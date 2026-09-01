import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faArrowLeft,
    faPen,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import "../styles/View.css";
export default function View() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
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
                setNote(result.result);
            }
        } catch (error) {
            console.log("Error fetching note:", error);
        }
    };
    const deleteNote = async () => {
        try {
            let result = await fetch(
                `http://localhost:3200/delete/${id}`,
                {
                    method: "DELETE"
                }
            );
            result = await result.json();
            if (result.success) {
                navigate("/");
            }
        } catch (error) {
            console.log("Error deleting note:", error);
        }
    };
    if (!note) {
        return (
            <div className="view-loading">
                Loading note...
            </div>
        );
    }
    return (
        <div className="view-page">
            <div className="view-back">
                <button
                    onClick={() => navigate("/")}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Back to Notes
                </button>
            </div>
            <h1 className="page-header">
                Note Details
            </h1>
            <div className="view-container">
                <div className="view-header">
                    <span className="view-label">
                        Topic
                    </span>
                    <h2>
                        {note.topic}
                    </h2>
                </div>
                <div className="view-content">
                    <div className="view-field">
                        <span className="view-label">
                            Subject
                        </span>
                        <p>
                            {note.subject}
                        </p>
                    </div>
                    <div className="view-field">
                        <span className="view-label">
                            Description
                        </span>
                        <p>
                            {note.description}
                        </p>
                    </div>
                    <div className="view-field">
                        <span className="view-label">
                            Tags
                        </span>
                        <div className="view-tags">
                            {note.tags}
                        </div>
                    </div>
                </div>
            </div>
            <div className="note-actions">
                <button
                    className="note-edit"
                    onClick={() => navigate(`/update/${note._id}`)}
                >
                    <FontAwesomeIcon icon={faPen} />
                    Edit
                </button>
                <button
                    className="note-delete"
                    onClick={deleteNote}
                >
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                </button>
            </div>
        </div>
    );
}
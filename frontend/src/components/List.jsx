import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faPen,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/List.css";

export default function List() {
    const [noteData, setNoteData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getListData();
    }, []);
    const getListData = async () => {
        try {
            let list = await fetch("http://localhost:3200/notes");
            list = await list.json();
            if (list.success) {
                setNoteData(list.result);
            }
        } catch (error) {
            console.log("Error fetching notes:", error);
        }
    };

    const deleteNote = async (id) => {
        try {
            let item = await fetch(
                `http://localhost:3200/delete/${id}`,
                {
                    method: "DELETE"
                }
            );
            item = await item.json();
            if (item.success) {
                getListData();
            }
        } catch (error) {
            console.log("Error deleting note:", error);
        }
    };

    const viewNote = (id) => {
        navigate(`/view/${id}`);
    };
    
    const updateNote = (id) => {
        navigate(`/update/${id}`);
    };
    return (
        <div className="list-page">
            <h1 className="page-header">
                Notes List
            </h1>
            <ul className="note-list">
                <li className="list-header">
                    S.No
                </li>
                <li className="list-header">
                    Topic
                </li>
                <li className="list-header">
                    Subject
                </li>
                <li className="list-header">
                    Description
                </li>
                <li className="list-header">
                    Tags
                </li>
                <li className="list-header action-header">
                    Actions
                </li>
                {
                    noteData.map((item, index) => (
                        <Fragment key={item._id}>
                            <li className="list-item serial-number">
                                {index + 1}
                            </li>
                            <li className="list-item">
                                {item.topic}
                            </li>
                            <li className="list-item">
                                {item.subject}
                            </li>
                            <li className="list-item description">
                                {item.description}
                            </li>
                            <li className="list-item">
                                {item.tags}
                            </li>
                            <li className="list-item actions">
                                <button
                                    className="view-button"
                                    onClick={() => viewNote(item._id)}
                                    title="View Note"
                                >
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                                <button
                                    className="edit-button"
                                    onClick={() => updateNote(item._id)}
                                    title="Update Note"
                                >
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => deleteNote(item._id)}
                                    title="Delete Note"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </li>
                        </Fragment>
                    ))
                }
            </ul>
        </div>
    );
}
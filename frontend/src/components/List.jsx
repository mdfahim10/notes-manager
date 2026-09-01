import { useEffect, useState } from "react";
import "../styles/List.css";

export default function List() {

    const [noteData, setNoteData] = useState([]);

    useEffect(() => {
        getListData();
    }, []);

    const getListData = async () => {

        let list = await fetch("http://localhost:3200/notes");

        list = await list.json();

        if (list.success) {
            setNoteData(list.result);
        }
    };

    return (
        <div>

            <h1 className="page-header">Notes List</h1>

            <ul className="note-list">

                <li className="list-header">S.No</li>
                <li className="list-header">Topic</li>
                <li className="list-header">Subject</li>
                <li className="list-header">Description</li>
                <li className="list-header">Tags</li>

                {
                    noteData.map((item, index) => (
                        <>
                            <li className="list-item">{index + 1}</li>
                            <li className="list-item">{item.topic}</li>
                            <li className="list-item">{item.subject}</li>
                            <li className="list-item">{item.description}</li>
                            <li className="list-item">{item.tags}</li>
                        </>
                    ))
                }

            </ul>

        </div>
    );
}
import React, { useState } from "react";
import "./SubmissionForm.css";
import axios from "axios";
import "materialize-css/dist/css/materialize.min.css";

function SubmissionForm() {
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [link, setLink] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Title: title,
            Category: category,
            Type: type,
            CommentAbout: comment,
            LinkToMD: link,
        };

        if (title === "" || category === "" || type === "") {
            alert("Please fill all the fields");
            return;
        }

        axios.post("secret", data)
            .then((response) => {
                console.log(response);
                setTitle("");
                setComment("");
                setLink("");
                setCategory("");
                setType("");
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-field">
                <input
                    required
                    type="text"
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <label htmlFor="title">Title:</label>
            </div>
            <div className="input-field">
                <textarea
                    required
                    id="comment"
                    className="materialize-textarea"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                />
                <label htmlFor="comment">Comment About:</label>
            </div>
            <div className="input-field">
                <input
                    required
                    type="text"
                    id="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                />
                <label htmlFor="category">Category:</label>
            </div>
            <div className="input-field">
                <input
                    required
                    type="text"
                    id="type"
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                />
                <label htmlFor="type">Type:</label>
            </div>
            <div className="input-field">
                <input
                    type="text"
                    id="link"
                    value={link}
                    onChange={(event) => setLink(event.target.value)}
                />
                <label htmlFor="link">Link to Website:</label>
            </div>

            <button onClick={handleSubmit} type="submit" className="btn waves-effect waves-light">Submit</button>
        </form>
    );
}

export default SubmissionForm;

import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import { getTitles, deleteData } from './index';
function DeleteForm() {
    const [titles, setTitles] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState('');

    useEffect(() => {
        async function fetchTitles() {
            const { data, error } = await getTitles();
            if (data) {
                setTitles(data);
            } else {
                console.log(error);
            }
        }
        fetchTitles();
    }, []);

    const handleTitleChange = (e) => {
        setSelectedTitle(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedTitle) {
            M.toast({ html: 'Please select a title to delete!', classes: 'rounded' });
            return;
        }

        const { data, error } = await deleteData(selectedTitle);
        if (error===null) {
            console.log('deleted');
            M.toast({ html: 'Item deleted!', classes: 'rounded' });
            setSelectedTitle('');
            window.location.reload();
        } else if (error) {
            console.log(error);
            M.toast({ html: 'Error deleting item!', classes: 'rounded' });
        }
        //if title not found

    };

    return (
        <div className="container">
            <h1>Delete Item</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <label htmlFor="title" className="select-label">
                        Select a title to delete:
                    </label>
                    <select
                        name="title"
                        onChange={handleTitleChange}
                        value={selectedTitle}
                        className="browser-default"
                        style={{ paddingLeft: '8px' }}
                    >
                        <option value="">Choose a title</option>
                        {titles.map((title) => (
                            <option key={title.id} value={title.title} style={{ paddingLeft: '8px' }}>
                                {title.title}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="btn waves-effect waves-light" type="submit" name="action">
                    Delete
                    <i className="material-icons right">delete</i>
                </button>
            </form>
        </div>
    );
}

export default DeleteForm;

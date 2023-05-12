import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import {uploadData} from "./index";
import {categoryList, DataScienceWorkFlowList} from './categories';
import './SubmitForm.css';
import Select from 'react-select';

function SubmitForm() {
    const [customTypeValue, setCustomTypeValue] = useState([]);

    let customTypeSelect = null
    const [formData, setFormData] = useState({
        title: '',
        CommentAbout: '',
        LinkToMD: '',
        category: '',
        customType: '',
        rating: '',
        price: '',
        coverSrc: '',
        score: '',
    });

    const [customType, setCustomType] = useState([]);

    useEffect(() => {
        updateCustomType(formData.category);
    }, [formData.category]);

    useEffect(() => {
        if (customTypeSelect) {
            M.FormSelect.init(customTypeSelect);
        }
    }, [customType, customTypeSelect]);


    useEffect(() => {
        if (customTypeSelect) {
            M.FormSelect.init(customTypeSelect);
        }
    }, [customType, customTypeSelect]);


    const handleCustomTypeChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setCustomTypeValue(selectedOptions);
    };


    const updateCustomType = (selectedCategory) => {
        if (selectedCategory === 'db') {
            setCustomType([
                { id: 1, checked: false, label: 'Distributed' },
                { id: 2, checked: false, label: 'Relational' },
                { id: 3, checked: false, label: 'Document' },
                { id: 4, checked: false, label: 'Key-value' },
                { id: 5, checked: false, label: 'Time-series' },
                { id: 6, checked: false, label: 'Graph' },
                { id: 7, checked: false, label: 'Stream' },
                { id: 8, checked: false, label: 'Batch' },
                { id: 9, checked: false, label: 'Big-Data' },
                { id: 10, checked: false, label: 'Vector Database' },
            ]);
        } else if (selectedCategory === 'mining') {
            setCustomType([
                { id: 1, checked: false, label: 'Performance' },
                { id: 2, checked: false, label: 'Scalability' },
                { id: 3, checked: false, label: 'Reliability' },
                { id: 4, checked: false, label: 'Usability' },
                { id: 5, checked: false, label: 'Functionality' },
                { id: 6, checked: false, label: 'Auxiliary Tasks' },
                { id: 7, checked: false, label: 'General Characteristics' },
            ]);
        } else if (selectedCategory === 'dv') {
            setCustomType([
                { id: 2, checked: false, label: 'Interactivity' },
                { id: 3, checked: false, label: 'Customizability' },
                { id: 4, checked: false, label: 'Export options' },
                { id: 5, checked: false, label: 'Real-time data visualization' },
                { id: 6, checked: false, label: 'Integration with other tools' },
            ]);
        } else {
            setCustomType([

                { id: 1, checked: false, label: 'Human-Centric' },
                { id: 2, checked: false, label: 'Workshop-based' },
                { id: 3, checked: false, label: 'Neutrally facilitated' },
                { id: 4, checked: false, label: 'Lightly processed' },
                { id: 5, checked: false, label: 'Modular' },
                { id: 6, checked: false, label: 'Scalable' },
                { id: 7, checked: false, label: 'Visual' },
            ]);
        }
    }

    const handleChange = (e) => {
        //make category and subcategory mutually exclusive and  reset the other one
        if (e.target.name === 'category') {
            setFormData({ ...formData, customType: [] });
        } else if (e.target.name === 'customType') {
            setFormData({ ...formData, category: '' });
        }

        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    const handleTypeChange = (e) => {
        const value = e.target.value;
        const types = [...formData.type];
        if (e.target.checked) {
            //make lowercase
            types.push(value.toLowerCase());
        } else {
            types.splice(types.indexOf(value), 1);
        }
        setFormData({ ...formData, type: types });
    };

    //make Category and subcategory mutually exclusive


    const handleSubmit = async (e) => {
        e.preventDefault();


        //lowecase the custom type
        const submittedData = {
            ...formData,
            type: customTypeValue ? customTypeValue.map((type) => type.toLowerCase()) : [],
            score: formData.score ? [parseFloat(formData.score)] : [],
            customType: customTypeValue ? customTypeValue.map((type) => type.toLowerCase()) : [],
        };

        // Remove the id field
        delete submittedData.id;

        // Convert price to double precision
        submittedData.price = parseFloat(submittedData.price);

        console.log(submittedData);

        const { data, error } = await uploadData(submittedData);
        if (data) {
            console.log("uploaded");
            M.toast({ html: 'Form submitted!', classes: 'rounded' });
        } else if (error) {
            console.log(error);
            M.toast({ html: 'Error submitting form!', classes: 'rounded' });
        }
    };




    return (
        <div className="container">
            <h1>Submit Information</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input id="title" type="text" name="title" onChange={handleChange} required />
                    <label htmlFor="title">Title</label>
                </div>
                <div className="input-field">
                    <input id="CommentAbout" type="text" name="CommentAbout" onChange={handleChange} required />
                    <label htmlFor="CommentAbout">Comment About</label>
                </div>
                <div className="input-field">
                    <input id="LinkToMD" type="url" name="LinkToMD" onChange={handleChange} required />
                    <label htmlFor="LinkToMD">Link to More Details</label>
                </div>

                <div className="input-field">
                    <label htmlFor="rating" className="select-label">Data Science WorkFlow</label>
                    <select
                        name="rating"
                        onChange={handleChange}
                        value={formData.rating}
                        required
                        style={{ paddingLeft: '8px' }}
                        className="browser-default"
                    >
                        <option value="" >
                            Choose a rating
                        </option>
                        {DataScienceWorkFlowList.map((rating) => (
                            <option key={rating.id} value={rating.value}>
                                {rating.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="input-field">
                    <label htmlFor="category" className="select-label">Technology Category</label>
                    <select
                        name="category"
                        onChange={handleChange}
                        value={formData.category}
                        required
                        className="browser-default"
                        style={{ paddingLeft: '8px' }}
                    >
                        <option value="" >
                            Choose a category
                        </option>
                        {categoryList.map((category) => (
                            <option key={category.id} value={category.value} style={{ paddingLeft: '8px' }}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="input-field">
                    <input id="price" type="number" step="0.01" name="price" onChange={handleChange} required />
                    <label htmlFor="price">Price</label>
                </div>
                <div className="input-field">
                    <input id="coverSrc" type="url" name="coverSrc" onChange={handleChange} required />
                    <label htmlFor="coverSrc">Cover Image URL</label>
                </div>
                <div className="input-field">
                    <input id="score" type="number" step="0.1" name="score" onChange={handleChange} required />
                    <label htmlFor="score">Score</label>
                </div>
                <div className="input-field">
                    <label htmlFor="customType">Criteria</label>
                    <Select
                        isMulti
                        options={customType.map((type) => ({ value: type.label, label: type.label }))}
                        value={customTypeValue.map((type) => ({ value: type, label: type }))}
                        onChange={(selectedOptions) =>
                            setCustomTypeValue(selectedOptions ? selectedOptions.map((option) => option.value) : [])
                        }
                    />
                </div>

                <button className="btn waves-effect waves-light right" type="submit" name="action">
                    Submit
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>
    );

};
export  default SubmitForm;

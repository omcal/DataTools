import React  from "react";
import myStyle from "./style.css";
import {colors} from "@material-ui/core";
const Contacts = () => {

    return (

        <div>

        <div className="HomePageContact">
            <a href="/">Home</a>
        </div>

        <div
            style={myStyle} className="contact">

            <div>
                <h3>Contacts</h3>
                <p>email:
                    <a  href="mailto:
                    ">omeremail</a>
                </p>
                <p>email:
                    <a  href="mailto:
                    ">suleemail</a>
                </p>
                <p>phone number: 123456789</p>
                <p>address: 1234 street</p>

            </div>
        </div>
    </div>



    );

}

export default Contacts;
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
                <p>Email:
                    <a  href="mailto:
                    "> TempMail@Mail.me</a>
                </p>

                <p>Phone number: +90 11111 1111 111 </p>
                <p>Address: Hacettepe University</p>

            </div>
        </div>
    </div>



    );

}

export default Contacts;
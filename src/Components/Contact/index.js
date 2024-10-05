import React, { Component } from "react";
import "../../Assets/Styles/Contact.css"
import { GrLocation } from 'react-icons/gr';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { FiMail } from 'react-icons/fi';
import { Grid } from 'semantic-ui-react'


class Contact extends Component {

    state = {

    }

    setCookies() {
 
        let name = "stayyoung";
        let value = "test";
        let days = 7;
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        console.log(name);
        console.log(value);
        console.log(expires);
        console.log('comes here');
        document.cookie = name + "=" + value + expires + ";path=/";
        console.log('comes here1');
        return;
    }

    render() {
        return (
            <div className="contact-container">
                <h2 onClick={this.setCookies} style={{ textAlign: "center" }}>Contact Us</h2>
                <Grid>
                    <Grid.Column  mobile={16} tablet={9} computer={9}>
                        <div style={{paddingLeft:"10%"}}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "3%" }}>
                            <div style={{ display: "flex", marginTop: "4%" }}>
                                    <GrLocation style={{ fontSize: "35px", marginRight: "3%" }} />
                                    <div style={{ width: "80%" }}>
                                        <h4>Address</h4>
                                        <p>Address: 123, kabilan garden,  kothai nagar, karur, 639008
                                        </p>
                                    </div>
                                </div>
                                <div style={{ display: "flex", marginTop: "4%" }}>
                                    <BiSolidPhoneCall style={{ fontSize: "35px", marginRight: "3%" }} />
                                    <div style={{ width: "80%" }}>
                                        <h4>Phone</h4>
                                        <p>+91 9842439397
                                        </p>
                                    </div>
                                </div>
                                <div style={{ display: "flex" ,marginTop: "4%" }}>
                                    <FiMail style={{ fontSize: "35px", marginRight: "3%" }} />
                                    <div style={{ width: "80%" }}>
                                        <h4>Mail</h4>
                                        <p>vikashini.stayyoung@gmail.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid.Column>
                    <Grid.Column  mobile={16} tablet={5} computer={7}>
                        <div className="customer-details">
                            <div style={{ paddingLeft: "6%", paddingTop: "8%" }}>
                                <h3>Send Message</h3>
                                <div>Subject:</div>
                                <input
                                    type="text"
                                    className="contact-text"
                                    placeholder="Enter Subject"
                                    onChange={ (e) => { this.setState({ subject: e.target.value }) }}
                                />
                                <div style={{ marginTop: "3%" }}>Type Your Message:</div>
                                <input
                                    type="text"
                                    className="contact-text"
                                    placeholder="Type Your Message"
                                    onChange={ (e) => { this.setState({ body: e.target.value }) }}
                                />
                            </div>
                            <a href={"mailto:vikashini.stayyoung@gmail.com?&subject="+this.state.subject+"&body="+this.state.body}>
                                <button className="send-button">
                                    Send
                                </button>
                            </a>
                        </div>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Contact;
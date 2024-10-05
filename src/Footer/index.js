import React, { Component } from "react";
import logoBY from "../Assets/Images/logo-img.png"
import logoText from "../Assets/Images/logo-text.png"
import { FaWhatsapp } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import { motion } from "framer-motion";
import { AiOutlineInstagram, AiOutlinePhone } from "react-icons/ai";
import "../Assets/Styles/Footer.css"
import { gql } from "@apollo/client";
import { SHOP_ID } from "../env";
import { Link } from "react-router-dom";
import { FaInstagramSquare } from "react-icons/fa";
import { Grid, GridColumn } from "semantic-ui-react";

const GetShopQuery = gql`
  query MasterCategories($filter: MasterCategoryInput) {
    masterCategories(filter: $filter) {
      id
      shopId
      category
      position
      image
      status
      addedon
    }
  }
`;

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: [],
        };
    }

    componentDidMount() {
        this.getShopOptions();
    }


    getShopOptions = async () => {
        try {
            const { data } = await this.props.client.query({
                query: GetShopQuery,
                variables: {
                    filter: {
                        shopId: SHOP_ID,
                    },
                },
            });
            let menu = [];
            data.masterCategories.map((c) => {
                menu.push({ key: c.category })
            })
            this.setState({ menu });
        } catch (error) {
            alert(error)
            console.error("Error:", error);
        }
    };

    scrollShop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    render() {
        const ProductsOptions = [
            { key: 1, text: 'Our Story', value: 1, href: "/ourstory" },
            { key: 2, text: 'Best Sellers', value: 2, href: "/bestsellers" },
            { key: 3, text: 'Blog', value: 3, href: "/blogs" },
            { key: 4, text: 'Hot Deals', value: 4, href: "/hot-deals" },
        ];

        let navigation = [
            { key: 1, text: 'Search', value: 1, href: "shop" },
            { key: 2, text: 'Cancellation and Refund', value: 2, href: "shipping-and-return-policy" },
            { key: 3, text: 'Privacy Policy', value: 3, href: "privacy-policy" },
            { key: 4, text: 'Term & Contitions', value: 4, href: "terms" },
            { key: 5, text: 'Contact Us', value: 5, href: "contact" },
        ]
        return (
            <footer className="footer">
                <div className="footer-container">
                    <Grid 
                    // className="footer-container1"
                    >
                        <GridColumn computer={5} tablet={8} mobile={16} 
                        // style={{ marginTop: "0.5rem" }}
                        >
                            <div className="footer-log">
                                <img
                                    src={logoText}
                                    className="logo-text"
                                    alt="stayyoung-logo"
                                />
                                <img
                                    src={logoBY}
                                    className="logo-image"
                                    alt="stayyoung-logo"
                                />
                            </div>
                            <p className="footer-para">
                                Stay Young offers authentic Korean skincare, haircare, and body care products from trusted brands for lasting beauty. We at Stay Young consider your skincare not as a matter of luxury but as an element of self-care. We have spent quite a while exploring the beauty market so that you can save precious time choosing the right product for your skin. We make sure that you end up with the perfect solution for your skincare.
                            </p>
                            <p style={{ fontSize: "1.05rem", paddingTop: "1rem" }}>
                                Follow us on our Social Media Channels to know more about us.
                            </p>
                            <div style={{ display: "flex", marginRight: "1.5rem" }} >
                                <ul className="social" >
                                    <motion.li whileHover={{ y: -4 }}>
                                        <a
                                            href="tel:+919842439397"
                                            rel="noreferrer"
                                            target="_blank"
                                            className=""
                                        >
                                            <AiOutlinePhone size={20} color="Purple" />
                                        </a>
                                    </motion.li>

                                    <motion.li whileHover={{ y: -4 }}>
                                        <a
                                            href="mailto:vikashini.stayyoung@gmail.com"
                                            rel="noreferrer"
                                            target="_blank"
                                            className=""
                                        >
                                            <BiMailSend size={20} color="Purple" />
                                        </a>
                                    </motion.li>

                                    <motion.li whileHover={{ y: -4 }}>
                                        <a
                                            href="https://wa.me/+919842439397"
                                            rel="noreferrer"
                                            target="_blank"
                                            className=""
                                        >
                                            <FaWhatsapp size={20} color="Purple" />
                                        </a>
                                    </motion.li>

                                    <motion.li whileHover={{ y: -4 }}>
                                        <a
                                            href="https://www.instagram.com/stayyoungindia?igsh=MTM3dmM4emVjNDJ0bw=="
                                            rel="noreferrer"
                                            target="_blank"
                                            className=""
                                        >
                                            <FaInstagramSquare size={20} color="Purple" />
                                        </a>
                                    </motion.li>

                                    

                                    {/* <motion.li whileHover={{ y: -4 }}>
                                        <a href="/" rel="noreferrer" target="_blank" className="">
                                            <AiOutlineInstagram size={20} color="Purple" />
                                        </a>
                                    </motion.li> */}
                                </ul>
                            </div>
                        </GridColumn>

                        <GridColumn  style={{marginTop:"2%",paddingBottom:"0"}} computer={3} tablet={8} mobile={16}  
                        className="footer-category-container no-gap">
                            <div  >
                                <div   >
                                    <h2 style={{fontWeight:"800"}} className="footer-container-heading">
                                        Quick Links
                                    </h2>
                                    <ul   role="list" style={{
                                        listStyle: "none", color: "#111827", margin: "0",
                                        padding: "0"
                                    }}>
                                        {ProductsOptions.map((item) => (
                                            <li key={item.name} style={{ paddingBottom: "5px", cursor: "pointer" }}>
                                                <Link
                                                    to={item.href}
                                                    onClick={() => {
                                                        this.scrollShop(item.text)
                                                    }}
                                                    className="footer-category-list"
                                                >
                                                    {item.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            

                        </GridColumn >
                        <GridColumn style={{marginTop:"2%",paddingBottom:"0"}}  computer={3} tablet={8} mobile={16}   className="footer-container-heading no-gap">
                                <div  >
                                    <h2 style={{fontWeight:"800"}} className="footer-container-heading">
                                        Help
                                    </h2>
                                    <ul   role="list" style={{
                                        listStyle: "none", color: "#111827", margin: "0",
                                        padding: "0"
                                    }}>
                                        {navigation.map((item) => (
                                            <li key={item.name}  style={{ paddingBottom: "5px", cursor: "pointer" }}>
                                                <Link
                                                    onClick={() => {
                                                        this.scrollShop(item.text)
                                                    }}
                                                    to={item.href}
                                                    className="footer-category-list "
                                                >
                                                    {item.text == 'Cancellation and Refund' ? 'Shipping and Return Policy' : item.text}
                                                </Link>
                                            </li>
                                        ))}

                                    </ul>
                                </div>
                            </GridColumn >
                        <GridColumn style={{marginTop:"2%",paddingTop:"0"}}  computer={3} tablet={8} mobile={16}  
                        className="footer-contact no-gap">
                            <div   className="md:mt-0 ">
                                <h2 style={{fontWeight:"800"}} className="footer-container-heading">
                                    Contact
                                </h2>
                                <ul   style={{
                                    listStyle: "none", color: "#111827", margin: "0",
                                    padding: "0"
                                }}>
                                    <li className="li">
                                        <span>
                                            Call us
                                        </span>
                                        {/* <a
                                            href="tel:+919734567890"
                                            className="contact-number"
                                        >
                                            {`+91 9734567890`}
                                        </a> */}
                                        <a
                                            href="tel:+9842439397"
                                            className="contact-number"
                                        >
                                            {`+91 9842439397`}
                                        </a>
                                    </li>
                                    <p className="li" style={{ paddingTop: "3%" }}>
                                        <span>
                                            Mail to
                                        </span>
                                        <a
                                            href="mailto:help@stayyoung.co.in"
                                            className="contact-number"
                                        >
                                            help@stayyoung.co.in
                                        </a>
                                    </p>
                                </ul>
                            </div>
                        </GridColumn >
                    </Grid>
                    <div className="footer-update-container">
                        <p className="text-xs leading-5 text-gray-500">
                            &copy; {new Date().getFullYear()} Stay Young. All rights reserved.
                        </p>
                        <p className="text-xs leading-5 text-gray-500 group">
                            Made with ❤️ by{" "} Strackit
                        </p>
                    </div>
                </div>
            </footer>
        )
    }
}


export default Footer;
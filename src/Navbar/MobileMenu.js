import React, { Component } from "react";
import "../Assets/Styles/Navbar.css";
import { motion } from "framer-motion";
import { BsChevronDown } from "react-icons/bs";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "../Assets/Styles/Navbar.css"
import { Link, useNavigate } from "react-router-dom";
import { DOMAIN } from '../env';
import Cookies from "js-cookie";
class MobileMenu extends Component {
    constructor(props) {
        super(props);
    }
    
    login = () => {
        // window.location.href =
        //     "https://you.strackit.com/?redirectto=" + window.location.href;
        const navigate=useNavigate()
        navigate('/')
    }
    render() {
       
        const koreanOptions = [{ label: <Link to={`/brands/cosrx`} style={{ color: "black" }}>Cosrx</Link> },
        { label: <Link to={`/brands/SNP-PREP`} style={{ color: "black" }}>SNP PREP</Link> },
        { label: <Link to={`/brands/ONE-THING`} style={{ color: "black" }}>ONE THING</Link> },
        { label: <Link to={`/brands/Be-Plain`} style={{ color: "black" }}>Be Plain</Link> },
        { label: <Link to={`/brands/Klairs`} style={{ color: "black" }}>Klairs</Link> },
        ]

        const indianOptions = [{ label: <Link to={`/brands/Re'equil`} style={{ color: "black" }}>Re'equil</Link> },
        ]

        return (
            <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                variants={{
                    hidden: { opacity: 0, x: -80 },
                    visible: { opacity: 1, x: 0 },
                }}
                className="mobile-menu"
            >
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Shop</Typography>
                    </AccordionSummary>
                    {
                        this.props.menu.map((item) => {
                            return (
                                <Link to={`/category/${item.label}`} style={{ color: "black" }}>
                                    <AccordionDetails onClick={() => 
                                        {
                                             this.props.closeDrawer() }}>
                                        <Typography >
                                            {item.label}
                                        </Typography>
                                    </AccordionDetails>
                                </Link>
                            )
                        })
                    }
                </Accordion>
                <Accordion>
                    <Link
                        to="/ourstory"
                        style={{ color: "black" }}
                        onClick={() => { this.props.closeDrawer() }}
                    >
                        <AccordionSummary
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography
                            >Our Story</Typography>
                        </AccordionSummary>
                    </Link>
                </Accordion>
                <Accordion style={{ margin: "0" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography
                        >Brands</Typography>
                    </AccordionSummary>
                    <Accordion style={{ margin: "0" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>
                                Korean SkinCare Brands
                            </Typography>
                        </AccordionSummary>
                        {koreanOptions.map((item) => {
                            return (
                                <React.Fragment>
                                    <AccordionDetails>
                                        <Typography onClick={() => { this.props.closeDrawer() }}>
                                            {item.label}
                                        </Typography>
                                    </AccordionDetails>
                                </React.Fragment>
                            )
                        })}
                    </Accordion>
                    <Accordion style={{ margin: "0" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>
                                Indian SkinCare Brands
                            </Typography>
                        </AccordionSummary>
                        {indianOptions.map((item) => {
                            return (
                                <React.Fragment>
                                    <AccordionDetails>
                                        <Typography onClick={() => { this.props.closeDrawer() }}>
                                            {item.label}
                                        </Typography>
                                    </AccordionDetails>
                                </React.Fragment>
                            )
                        })}
                    </Accordion>
                </Accordion>
                <Accordion>
                    <Link to="/hot-deals"
                        style={{ color: "black" }}
                        onClick={() => { this.props.closeDrawer() }}
                    >
                        <AccordionSummary
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            onClick={() => {
                                // window.location.href = "/hot-deals"
                                this.props.closeDrawer()
                            }
                            }
                        >
                            <Typography >Hot Deals</Typography>
                        </AccordionSummary>
                    </Link>
                </Accordion>
                <Accordion>
                    <Link to="/blogs"  style={{ color: "black" }} >
                        <AccordionSummary
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            onClick={() => {
                                // window.location.href = "/blogs"
                                this.props.closeDrawer()
                            }
                            }
                        >
                            <Typography >Blogs</Typography>
                        </AccordionSummary>
                    </Link>
                </Accordion>
                {
                    this.props.loginOption ? 
                    <Accordion>
                        <Link to="/accounts"
                            style={{ color: "black" }}
                            onClick={() => { this.props.closeDrawer() }}
                        >
                            <AccordionSummary
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                onClick={() => {
                                    // window.location.href = "/hot-deals"

                                    this.props.closeDrawer()
                                    
                                }
                                }
                            >
                                <Typography >My Account</Typography>
                            </AccordionSummary>
                        </Link>
                    </Accordion> : null
                }
                {
                    this.props.loginOption ? 
                    <Accordion>
                        <Link to="/cart"
                            style={{ color: "black" }}
                            onClick={() => { this.props.closeDrawer() }}
                        >
                            <AccordionSummary
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                onClick={() => {
                                    // window.location.href = "/hot-deals"
                                    this.props.closeDrawer()
                                }
                                }
                            >
                                <Typography >My Cart</Typography>
                            </AccordionSummary>
                        </Link>
                    </Accordion> : null
                }
                
                {this.props.loginOption ?
                    <Accordion>
                        <AccordionSummary
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            onClick={() => {
                                window.location.href = "/order"
                                this.props.closeDrawer()
                            }
                            }
                        >
                            <Typography
                                
                            >My Orders</Typography>
                        </AccordionSummary>
                    </Accordion> :
                    <Accordion>
                       <Link 
                       to={'/login'}
                       style={{ color: "black" }}
                       onClick={() => {
                        // this.login()
                        this.props.closeDrawer()
                    }
                    }
                       >
                       <AccordionSummary
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                     
                        >
                            <Typography
                              
                            >Login</Typography>
                        </AccordionSummary>
                       </Link> 
                    </Accordion>}

                <Accordion>
                    <AccordionSummary
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        onClick={() => {
                            window.location.href = "/contact"
                            this.props.closeDrawer()
                        }
                        }
                    >
                        <Typography
                            
                        >Contact</Typography>
                    </AccordionSummary>
                </Accordion>
                {this.props.loginOption ? 
                <Accordion>
                    <AccordionSummary
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        onClick={async () => {
                            await Cookies.remove('stayyoung');
                            window.location.href = DOMAIN
                            this.props.closeDrawer()
                        }
                        }
                    >
                        <Typography
                            
                        >Logout</Typography>
                    </AccordionSummary>
                </Accordion>
                :
                null
                }
            </motion.ul>
        )
    }
}

export default MobileMenu;
import React, { Component } from "react";
import "../Assets/Styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { VscChromeClose } from "react-icons/vsc";
import { BiMenuAltRight } from "react-icons/bi";
import logoBY from "../Assets/Images/logo-img.png";
import logoText from "../Assets/Images/logo-text.png";
import { gql } from "@apollo/client";
import MobileMenu from "./MobileMenu";
import { SHOP_ID, DOMAIN } from "../env";
import Cookies from "js-cookie";
import styled from "styled-components";
import { CaretDownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { BsCartFill } from 'react-icons/bs';
import { Dropdown, Space } from "antd";
import Brands from "./Brands";
import { Icon } from "semantic-ui-react";
import { Popup, List } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import userId from "../Components/userId";
import { BiSolidPurchaseTag, BiLogOut } from 'react-icons/bi';
import { AiOutlineLogin } from 'react-icons/ai';
import { MdSwitchAccount } from "react-icons/md";

const StyledDropdown = styled(Dropdown)`
  color: black;
  height: 2.5vh;
  && .ant-select-arrow {
    display: none !important;
  }
  
`;

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

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bestSellerOptions: false,
      brandsOptions: false,
      openDrawer: false,
      shopOptions: [],
      menu: [],
      keyWord: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchKeyword !== prevProps.searchKeyword) {
      this.setState({ keyWord: this.props.searchKeyword });
    }
  }

  async componentDidMount() {
    this.getShopOptions();
    let login = Cookies.get("stayyoung") && true ? true : false;
    this.setState({ login });
  }

  getShopOptions = async () => {
    try {
      let { data } = await this.props.client.query({
        query: GetShopQuery,
        variables: {
          filter: {
            shopId: SHOP_ID,
          },
        },
      });
      let menu = [];
      let myArray = data.masterCategories;
      try {
        myArray = myArray.slice().sort((a, b) => a.position - b.position);
      } catch (error) {
        console.log(error)
        myArray = [];
      }
      myArray.map((c, index) => {
        let category = c.category;
        try {
          category = c.category.replace(/\s/g, "-");
        } catch (error) { }
        menu.push({
          key: index,
          label: (
            <Link to={`/category/${category}`} style={{ color: "black" }}>
              {c.category}
            </Link>
          ),
        });
      });
      this.setState({ menu });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  openProductOptions = () => {
    this.setState({ bestSellerOptions: true });
  };

  closeDrawer = () => {
    this.setState({ openDrawer: false });
  };

  login() {
    // window.location.href = "https://you.strackit.com/?redirectto=" + window.location.href;
    
  }

  async logout() {
    await Cookies.remove('stayyoung');
    window.location.href = DOMAIN;
  }

  childFunction = () => {
    this.setState({ keyWord: "" });
  };

  render() {
    const items: MenuProps["items"] = this.state.menu;
    var screenWidth = window.innerWidth;
    return (
      <div className="nav-container">
        <Link className="sy-image-container" to={"/shop"}>
          <img className="slide-left-animation " src={logoText}></img>
          <img className="slide-left-animation " src={logoBY}></img>
        </Link>
        {
          screenWidth > 1000 ?
            (
              <div className="navbar-contends">
                <div style={{ marginLeft: '5%' }}></div>
                <StyledDropdown menu={{ items }}>
                  <Link to="/shop">
                    <Space style={{ cursor: "pointer" }}>
                      <div className="underline-hover">Shop</div>
                    </Space>
                  </Link>
                </StyledDropdown>
                <Link to="/ourstory">
                  <div className="underline-hover">Our Story</div>
                </Link>
                <div>
                  <Brands />
                </div>
                <Link
                  to="/hot-deals"
                  onClick={() => {
                    this.props.clearSearchKeyWord();
                  }}
                >
                  <div className="underline-hover">Hot Deals</div>
                </Link>
                <Link to="/blogs">
                  <div className="underline-hover">Blog</div>
                </Link>
              
                <Link
                 to="/contact"
                 >
                  <div className="underline-hover">Contact</div>
                </Link>
                <div style={{ marginTop: '-1.5%' }}>
                  <Link to="/search-product">
                    <Popup on='click'
                      pinned position="bottom left" content='Atleast enter 3 letter to search'
                      trigger={<Input style={{ borderRadius: '50%', marginTop: '3%' }}
                        value={this.state.keyWord}
                        placeholder="Search..."
                        onChange={(e) => this.props.handleChange(e.target.value)}
                      />} />
                  </Link>
                </div>
                <div>
                  {this.state.login ? (
                    <React.Fragment>
                      <Link to="/cart" style={{ cursor: "pointer", color: "black" }} className="cart-icon-seprate" >
                        <BsCartFill />
                      </Link>
                    </React.Fragment>
                  ) : null}
                </div>
                <div>
                  <React.Fragment>
                    <Popup
                      content={
                        <List
                          divided
                          relaxed
                          style={{
                            opacity: '1px',
                            position: "relative",
                            width: "10vw"

                          }}
                        >
                          {this.state.login ? <List.Item style={{ index: '1px' }}>
                            <Link
                              to="/accounts"
                              style={{ cursor: "pointer", color: "black" }}
                            >
                              <MdSwitchAccount style={{ fontSize: "16px", marginRight: "4%" }} />  My Account
                            </Link>
                          </List.Item> : null}
                          {this.state.login ? <List.Item style={{ index: '1px' }}>
                            <Link
                              to="/order"
                              style={{ cursor: "pointer", color: "black" }}
                            >
                              <BiSolidPurchaseTag style={{ fontSize: "16px", marginRight: "4%" }} />  My Orders
                            </Link>
                          </List.Item> : null}
                          {this.state.login ? <List.Item
                            onClick={this.logout}
                            style={{ cursor: "pointer" }}
                          >
                            <BiLogOut style={{ fontSize: "16px", marginRight: "4%" }} /> Logout
                          </List.Item> :<Link to={'/login'}><List.Item
                            // onClick={this.login}
                            style={{ cursor: "pointer" }}
                          >
                           <span> <AiOutlineLogin style={{ fontSize: "16px",paddingTop:"1%", marginRight: "4%" }} /></span><span> Login</span>
                          </List.Item></Link> }
                        </List>
                      }
                      on="click"
                      pinned
                      position="bottom right"
                      trigger={
                        <Icon style={{ marginTop: "-10%", cursor: "pointer" }} circular name="user" />
                      }
                    />
                  </React.Fragment>
                </div>
                <div style={{ marginRight: '1%' }} />
              </div>
            ) :
            (
              <div style={{ marginRight: '10%' }}>
                <br />
                <div
                  style={{ fontSize: "24px", marginRight: '22%' }}
                  onClick={() => {
                    this.setState({ openDrawer: !this.state.openDrawer });
                  }}
                >
                  {this.state.openDrawer ? <VscChromeClose /> : <BiMenuAltRight />}
                </div>
                {this.state.openDrawer ? (
                  <MobileMenu
                    loginOption={this.state.login}
                    closeDrawer={this.closeDrawer}
                    menu={this.state.menu}
                  />
                ) : (
                  ""
                )}
              </div>
            )
        }
      </div>
    );
  }
}

export default Navbar;

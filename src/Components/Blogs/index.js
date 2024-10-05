import React, { Component } from "react";
import "../../Assets/Styles/Blogs.css";
import { gql } from "@apollo/client";
import { SHOP_ID } from "../../env";
import Card from './Card';
import { Grid } from 'semantic-ui-react'
import Loading from "../../Loading";
import CardDetails from "./CardDetails";

const getBlogs = gql`
  query Blog($filter: blogFilter) {
    Blog(filter: $filter) {
      id
      title
      image
      description
      url
      timestamp
      shopId
    }
  }
`;

class Blogs extends Component {
  state = {
    blogs: [],
  };
  async componentDidMount() {
    this.getBlogs();
  }

  closeDialog = () => {
    this.setState({ dialogOpen: false }) 
  }

  getBlogs = async () => {
    this.setState({ loading: true })
    try {
      const { data } = await this.props.client.query({
        query: getBlogs,
        variables: {
          filter: {
            shopId: SHOP_ID,
          },
        },
      });
      this.setState({ blogs: data.Blog, loading: false });
    } catch (error) {
      console.error("Error:", error);
      this.setState({ loading: false });
    }
  };
  render() {
    return (
      <div className="blogs-container">
        <h2 style={{ textAlign: "center" }}>Blogs</h2>
        <div id="content">
          {this.state.loading ? <Loading loading={this.state.loading} /> : null }       
          <Grid>
            {
              this.state.blogs.map((c) => {
                return <Grid.Column
                  onClick={() => {
                    this.setState({ dialogOpen: true, cardProduct: c })
                  }
                  }
                  mobile={16} tablet={8} computer={4}><Card item={c} closeDialog={this.closeDialog} /></Grid.Column>
              })
            }
          </Grid>
          <CardDetails dialogOpen={this.state.dialogOpen}
            cardProduct={this.state.cardProduct}
            closeDialog={this.closeDialog}
          />
        </div>
      </div>
    );
  }
}

export default Blogs;

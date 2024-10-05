import React, { Component } from "react";
import { Card, Image, Icon, Popup } from 'semantic-ui-react'
import P1 from "../../Assets/Images/p1.jpg";
import CardDetails from "./CardDetails";

class BlogCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false
    }
  }



  render() {
    return (
      <div >
        <Card fluid>
          <img style={{ height: '200px', width: '100%' }} src={this.props.item.image ? "https://s3.ap-south-1.amazonaws.com/business.strackit.com/" + this.props.item.image : P1} />
          <Card.Content>
            {this.props.item.title.length < 22 ? <Card.Header>{this.props.item.title}</Card.Header> :
              <Popup content={this.props.item.title}  trigger={<Card.Header>{this.props.item.title.slice(0,24)}...</Card.Header>} />}
            <Card.Meta>
              <span className='date'>{this.props.item.timestamp}</span>
            </Card.Meta>
            <Card.Description>
              {this.props.item.description}
            </Card.Description>
          </Card.Content>
        </Card>

      </div>
    );
  }
}

export default BlogCard;

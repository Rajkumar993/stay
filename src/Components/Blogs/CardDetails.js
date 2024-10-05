import React,{Component} from "react";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import P1 from "../../Assets/Images/p1.jpg";
import Button from '@mui/material/Button';

class CardDetails extends Component {
     constructor(props){
        super(props);
        this.state={

        }
     }

     render(){
      return(
       
       <React.Fragment>{this.props.cardProduct ? 
        <Dialog style={{width:"100%"}} open={this.props.dialogOpen} 
        onClose={()=>{this.props.closeDialog()}}>
            <DialogContent>
                <div>
                    <center><img src={this.props.cardProduct.image ? "https://s3.ap-south-1.amazonaws.com/business.strackit.com/"+this.props.cardProduct.image : P1 } 
                    style={{width:"24rem",height:"24rem"}} /></center>
                    <center><h3>{this.props.cardProduct.title}</h3></center>
                    <div style={{marginLeft:"7%",marginRight:"5%",marginTop:"3%"}}>{this.props.cardProduct.description}</div>        
                </div>
            </DialogContent>
            <DialogActions>
            <Button variant="outlined" style={{ color: "red", border: "1px solid black" }}
                        onClick={() => {
                            this.props.closeDialog()
                        }}
                    >
                        Close
                    </Button>
            </DialogActions>
        </Dialog> : " "}
       </React.Fragment>
      )
     }
}

export default CardDetails;
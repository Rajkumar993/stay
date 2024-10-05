import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Icon,
  Modal
} from 'semantic-ui-react'
import React, { useEffect } from "react";
import "../../Assets/Styles/SuccessAlert.css"
import { Button } from "semantic-ui-react";



export const SuccessAlert = ({ openAlert, closeAlert, title, message ,Amount}) => {
 
  return (
      <Modal
          size="small"
          open={openAlert}
          onClose={closeAlert}
          className='top'
          style={{  width: "50vh", transform: 'translateY(-40%)', maxHeight: '45vh', left: "50%", transform: 'translatex(-50%)' }}

      >
          <ModalContent>
              <div class="swal-icon swal-icon--success">
                  <span class="swal-icon--success__line swal-icon--success__line--long"></span>
                  <span class="swal-icon--success__line swal-icon--success__line--tip"></span>

                  <div class="swal-icon--success__ring"></div>
                  <div class="swal-icon--success__hide-corners"></div>
              </div>
              <div className="alert-title" >{title}</div>
              <div style={{fontWeight:"bold",marginBottom:"5px"}} className="font-size" >ThankYou For Ordering From Stay Young</div>
              <div className="alert-success" ><div style={{fontWeight:"bolder"}}> Ordered Products :</div><div style={{fontSize:"14px",lineHeight:"1.5"}}>{message ? message + "," : null}</div></div>
              <div style={{marginTop:"5px"}} className="alert-success" ><div style={{fontWeight:"bolder"}}> Received Amount: </div>₹ {" "}{Amount.toLocaleString()}</div>

          </ModalContent>
          <ModalActions>
              <Button style={{ backgroundColor: "#7cd1f9", color: "white", cursor: "pointer" }}
                  onClick={closeAlert}
              >Ok</Button>
          </ModalActions>
      </Modal>
  )
}
import React,{Component} from "react";
import LoadingImage from "../Assets/Images/Loadinglogo.svg";
import { Image } from 'semantic-ui-react'

class Loading extends Component{
    render(){
        return(
            <center><img src={LoadingImage} width={200} height={200}/></center>
            
        )
    }
}

export default Loading;
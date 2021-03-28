import React from "react";
import { clearMessage } from '../Redux/Actions/uiAction'
import {connect} from 'react-redux'

const Message = props => {

  return (
    <div className="popup-box">
      <div className="box">          
        {props.content}
        <button onClick={props.handleClose}>Ok</button>
      </div>
    </div>
  );
};
 
export default Message
import React from 'react'
import Labels from './Labels'

const Messages = ({ id, subject, read, starred, labels }) => {
  return(
    <div className={read ? "row message read" : "row message unread"}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" />
          </div>
          <div className="col-xs-2">
            <i className={read ? "star fa fa-star" : "star fa fa-star-o"}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">

        <a href="#">
          { subject }
        </a>
      </div>
    </div>
  )
}

export default Messages

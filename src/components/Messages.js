import React from 'react'
import Labels from './Labels'

const Messages = ({ id, subject, read, starred, labels, handleStar, selected, handleChecked }) => {
  return(
    <div className={`row message ${read ? "read": "unread"} ${selected ? "selected": null}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input
              type="checkbox"
              checked={selected}
              onChange={event=> handleChecked(id, event.target.checked)} />
          </div>
          <div className="col-xs-2">
            <i
              className={starred ? "star fa fa-star" : "star fa fa-star-o"}
              onClick={event => {
                handleStar(id);
              }}
            ></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <Labels labels={labels}/>
        <a href="#">
          { subject }
        </a>
      </div>
    </div>
  )
}

export default Messages

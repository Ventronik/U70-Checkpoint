import React from 'react'

const Toolbar = ({ handleSelectAll, selectAllStatus, handleSelected, handleRead, handleUnread, handleAddLabels, handleRemoveLabels, handleDelete, unreadCount }) => {
  return(
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unreadCount()}</span>
          unread messages
        </p>

        <button className="btn btn-default" onClick={(event) => handleSelectAll()}>
            <i className={selectAllStatus()[0]}></i>
        </button>

        <button className="btn btn-default" disabled={selectAllStatus()[1]} onClick={(event) => handleSelected(handleRead)}>
          Mark As Read
        </button>

        <button className="btn btn-default" disabled={selectAllStatus()[1]} onClick={(event) => handleSelected(handleUnread)}>
          Mark As Unread
        </button>

        <select className="form-control label-select" disabled={selectAllStatus()[1]} onChange={(event) => handleSelected(handleAddLabels, event.target.value)}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" disabled={selectAllStatus()[1]} onChange={(event) => handleSelected(handleRemoveLabels, event.target.value)}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" disabled={selectAllStatus()[1]} onClick={(event) => handleDelete()}  >
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}

export default Toolbar

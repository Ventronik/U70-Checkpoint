import React from 'react'

export default ({ labels })=>{
  const labelList = labels.map(label => (<span key={label.index} className="label label-warning">{label}</span>))
  return(
  labelList
  )
}

import React, { Component } from 'react';

import Messages from './components/Messages'
import Toolbar from './components/Toolbar'
import './App.css';

const seed = [
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  },
  {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "labels": ["dev"]
  },
  {
    "id": 4,
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 5,
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "labels": ["personal"]
  },
  {
    "id": 6,
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "labels": []
  },
  {
    "id": 7,
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "labels": ["dev", "personal"]
  },
  {
    "id": 8,
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "labels": []
  }
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state ={messages: seed}
  }

  handleStar = (id) => {
    const starChange = this.state.messages.map(message=> message.id === id ? {...message, starred:!message.starred}:{...message})
    this.setState({messages: starChange})
  }

  handleChecked = (id, selected) => {
      const selectClass = this.state.messages.map(message=> message.id === id ? {...message, selected}: {...message})
      this.setState({messages: selectClass})
  }

  selectAllStatus = () => {
    if(this.state.messages.every(message => message.selected)) {
      return ['fa fa-check-square-o']
    } else if(this.state.messages.some(message => message.selected)){
      return ['fa fa-minus-square-o']
    } else { return ['fa fa-square-o', 'disabled']}
  }

  handleSelectAll = () => {
    let statusSet = undefined;
    if(this.state.messages.every(message => message.selected)) {
      const selected = false
      statusSet = this.state.messages.map(message => ({...message, selected}))
    } else {
      const selected = true
      statusSet = this.state.messages.map(message => ({...message, selected}))
    }
    this.setState({messages: statusSet})
}

  handleSelected = (cb, label) => {
    const updatedMessages = this.state.messages.map(message => message.selected ? cb(message, label) :message)
    this.setState({messages: updatedMessages})
  }

  handleRead = (message) => {
    message.read = false
    return message
  }

  handleUnread = (message) => {
    message.read = true
    return message
  }

  handleAddLabels = (message, label ) => {
    message.labels.push(label)
    return message
  }

  handleRemoveLabels = (message, label) => {
    let index = message.labels.indexOf(label)
    index > -1 ? (message.labels.splice(index, 1)): message
    return message
  }

  handleDelete = (message) => {
    let filter = this.state.messages.filter(item=> !item.selected)
    this.setState({messages: filter})
  }

  unreadCount = () => {
    let count = 0
    this.state.messages.map(message => (message.read === false ) ? count++ : null)
    return count
  }

  render() {
    const messageList = this.state.messages.map(message => <Messages key={ message.id } {...message} handleStar={this.handleStar} handleChecked={this.handleChecked}/>)
    return (
      <div>
        <div>
          <Toolbar
            handleSelectAll={this.handleSelectAll}
            selectAllStatus={this.selectAllStatus}
            handleSelected={this.handleSelected}
            handleRead={this.handleRead}
            handleUnread={this.handleUnread}
            handleAddLabels={this.handleAddLabels}
            handleRemoveLabels={this.handleRemoveLabels}
            handleDelete={this.handleDelete}
            unreadCount={this.unreadCount}
             />
        </div>
        <div>
          { messageList }
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import axios from 'axios';

import Messages from './components/Messages'
import Toolbar from './components/Toolbar'

import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state ={messages: []}
  }

  componentDidMount= () => {
    this.getAllMessages()
  }

  handleStar = (id) => {
    // const messId = this.state.messages.map(message=> message.id === id)
    axios.patch('http://localhost:8082/api/messages', {messageIds: [id], command: 'star'})
    .then(()=>this.getAllMessages())

    // const starChange = this.state.messages.map(message=> message.id === id ? {...message, starred:!message.starred}:{...message})
    // this.setState({messages: starChange})
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
    let index = message.labels.indexOf(label);
    if(index === -1) {
       message.labels.push(label)
    }
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


   getAllMessages = async() => {
    await axios.get('http://localhost:8082/api/messages')
    .then(allMessages=> {
      this.setState({messages: allMessages.data})
    })
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

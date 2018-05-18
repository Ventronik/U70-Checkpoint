import React, { Component } from 'react';
import axios from 'axios';

import Messages from './components/Messages'
import Toolbar from './components/Toolbar'
import Compose from './components/Compose'

import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state ={
      messages: [],
      compose: false
    }
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

  handleSelected = (input, command) => {
    let messageIds = this.state.messages
                      .filter(message => message.selected)
                      .map(message => message.id)
    // axios.patch('http://localhost:8082/api/messages', {messageIds: messageIds, command: command, input})
    // .then(()=> this.getAllMessages())
  }

  handleRead = () => {
    let messageIds = this.state.messages
                      .filter(message => message.selected)
                      .map(message => message.id)
    axios.patch('http://localhost:8082/api/messages', {messageIds: messageIds, command: 'read', read: false})
    .then(()=> this.getAllMessages())
  }

  // handler = () => {
  //   let messageIds = this.state.message
  //                   .map(message => message.selected)
  //   axios.patch('http://localhost:8082/api/messages', {messageIds: [messageIds], command: 'read'})
  //   .then(()=> this.getAllMessages())
  // }

  handleUnread = () => {
    let messageIds = this.state.messages
                      .filter(message => message.selected)
                      .map(message => message.id)
    axios.patch('http://localhost:8082/api/messages', {messageIds: messageIds, command: 'read', read: true})
    .then(()=> this.getAllMessages())
  }

  handleAddLabels = (label ) => {
    let messageIds = this.state.messages
                      .filter(message => message.selected)
                      .map(message => message.id)
    axios.patch('http://localhost:8082/api/messages', {messageIds: messageIds, command: 'addLabel', label: label})
    .then(()=> this.getAllMessages())
  }

  handleRemoveLabels = (label) => {
    let messageIds = this.state.messages
                      .filter(message => message.selected)
                      .map(message => message.id)
    axios.patch('http://localhost:8082/api/messages', {messageIds: messageIds, command: 'removeLabel', label: label})
    .then(()=> this.getAllMessages())
  }

  handleDelete = (message) => {
    let messageIds = this.state.messages
                      .filter(message => message.selected)
                      .map(message => message.id)
    axios.patch('http://localhost:8082/api/messages', {messageIds: messageIds, command: 'delete'})
    .then(()=> this.getAllMessages())
  }

  unreadCount = () => {
    let count = 0
    this.state.messages.map(message => (message.read === false ) ? count++ : null)
    return count
  }

   getAllMessages = () => {
    axios.get('http://localhost:8082/api/messages')
    .then(allMessages=> {
      this.setState({messages: allMessages.data})
    })
  }

  handleCompose= () => {
     let compose = !this.state.compose
     this.setState({...this.state, compose})
  }

  handleSubmit = (event) => {
    axios.post('http://localhost:8082/api/messages', {subject: event.target.subject.value, body: event.target.body.value})
    .then(()=> this.getAllMessages())
    // this.setState({...this.state})
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
            handleCompose={this.handleCompose}
             />
        </div>
        <div>
          {this.state.compose ?
          <Compose handleSubmit={this.handleSubmit} />: null
          }
        </div>
        <div>
          { messageList }
        </div>
      </div>
    );
  }
}

export default App;

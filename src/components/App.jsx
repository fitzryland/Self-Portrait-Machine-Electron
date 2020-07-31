import React from 'react'
import Slideshow from './Slideshow'
import Capture from './Capture'
import Confirm from './Confirm'
import '../style.css'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'idle', // idle, capture, confirm
      capturedImage: '',
      message: '',
      messageToggle: '',
      messageClasses: ['message_wrap is-active'],
      messages: {
        idle: <p>press the green button to add a photo of yourself</p>,
        approval: <div className="approval">
                    <p className="approval_left">press the green button to add this photo</p>
                    <p className="approval_right">press the red button to delete this photo</p>
                    <p className="approval_small">this photo will be automatically deleted in 30 seconds if you do not press the green button</p>
                  </div>,
        approved: <p>the photo has been added to the slideshow</p>,
        rejected: <p>the photo has been deleted</p>,
        aborted: <p>your photo was not taken</p>,
      }
    }
    this.stateHandler = this.stateHandler.bind(this)
  }
  stateHandler(stateUpdates) {
    if ( typeof stateUpdates === 'object' ) {
      this.setState(stateUpdates)
    }
  }
  componentDidMount() {
    this.setState({
      message: this.state.messages.idle
    })
  }
  render() {
    let curScreen = ''
    if ( this.state.mode === 'idle' ) {
      curScreen = <Slideshow
                    stateHandler={this.stateHandler}
                    messages={this.state.messages}
                  />
    } else if ( this.state.mode === 'capture' ) {
      curScreen = <Capture
                    stateHandler={this.stateHandler}
                    messages={this.state.messages}
                  />
    } else if ( this.state.mode === 'confirm' ) {
      curScreen = <Confirm
                    stateHandler={this.stateHandler}
                    messages={this.state.messages}
                    capturedImage={this.state.capturedImage}
                  />
    }
    return (
      <div className="app_wrap">
        {curScreen}
        <div class={this.state.messageClasses}>
          {this.state.message}
        </div>
      </div>
    )
  }
}
export default App
// press the green button to add a photo of yourself
// count down 5.. 4... 3...
// press the green button to add this photo
// press the red button to delete this photo
  // the photo will be automatically deleted in 30 seconds
  // if you do not press the green button
// if red
  // the photo has been deleted
// if green
  // the photo has been added to the slideshow
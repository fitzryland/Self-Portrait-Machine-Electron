import React from 'react'
import Slideshow from './Slideshow'
import Capture from './Capture'
import '../style.css'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'idle', // idle, capture, confirm
      message: ''
    }
    this.modeHandler = this.modeHandler.bind(this)
  }
  modeHandler(newMode, message) {
    this.setState({
      message: message,
      mode: newMode
    })
  }
  render() {
    let curScreen = ''
    if ( this.state.mode === 'idle' ) {
      curScreen = <Slideshow modeHandler={this.modeHandler} />
    } else if ( this.state.mode === 'capture' ) {
      curScreen = <Capture modeHandler={this.modeHandler} />
    }
    return (
      <div className="app_wrap">
        {curScreen}
      </div>
    )
  }
}
        // <div className="app_message">
        //   {this.state.message}
        // </div>

export default App
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
    }
    this.stateHandler = this.stateHandler.bind(this)
  }
  stateHandler(stateUpdates) {
    if ( typeof stateUpdates === 'object' ) {
      this.setState(stateUpdates)
    }
  }
  render() {
    let curScreen = ''
    if ( this.state.mode === 'idle' ) {
      curScreen = <Slideshow stateHandler={this.stateHandler} />
    } else if ( this.state.mode === 'capture' ) {
      curScreen = <Capture stateHandler={this.stateHandler} />
    } else if ( this.state.mode === 'confirm' ) {
      curScreen = <Confirm
                    stateHandler={this.stateHandler}
                    capturedImage={this.state.capturedImage}
                  />
    }
    return (
      <div className="app_wrap">
        {curScreen}
      </div>
    )
  }
}
export default App
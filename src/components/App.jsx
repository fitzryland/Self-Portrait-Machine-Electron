import React from 'react'
import Slideshow from './Slideshow'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'idle' // idle, capture, confirm
    }
  }
  render() {
    let curScreen = ''
    if ( this.state.mode === 'idle' ) {
      curScreen = <Slideshow />
    }
    console.log('curScreen', curScreen)
    return (
      <div>
        {curScreen}
      </div>
    )
  }
}

export default App
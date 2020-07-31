import React from 'react'

let imgDir = './images'
let intervalId = false;

class Slideshow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      curFile: '',
      curFileI: 0,
      files: [],
    }
    this.keydownHandler = this.keydownHandler.bind(this)
  }
  keydownHandler(event) {
    if ( event.key === 'ArrowLeft' || event.key === 'ArrowRight' ) {
      this.props.stateHandler({mode: 'capture'})
    }
  }
  componentDidMount() {
    fs.readdir(imgDir, (err, files) => {
      let fullFiles = []
      files.forEach((file, i) => {
        fullFiles.push(imgDir + '/' + file)
      })
      this.setState(({
        files: fullFiles
      }))
      this.setImg()
      this.nextImg()
    })
    document.addEventListener("keydown", this.keydownHandler)
  }
  componentWillUnmount() {
    clearInterval(intervalId)
    document.removeEventListener("keydown", this.keydownHandler)
  }
  setImg() {
    let curFileI = this.state.curFileI + 1
    if ( curFileI >= this.state.files.length ) {
      curFileI = 0
    }
    this.setState({
      curFile: this.state.files[curFileI],
      curFileI: curFileI
    })
  }
  nextImg() {
    intervalId = setInterval(() => {
      this.setImg()
    }, 6000)
  }
  render() {
    let imgStyle = {}
    if ( this.state.curFile ) {
      imgStyle = {
        backgroundImage: 'url(' + this.state.curFile + ')',
      }
    }
    return (
      <div
        className="slideshow"
        style={imgStyle}
      ></div>
    )
  }
}

export default Slideshow
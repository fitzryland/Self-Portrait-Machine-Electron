import React from 'react'

let imgDir = './images'

class Slideshow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      curFile: '',
      curFileI: '',
      files: []
    }
    this.nextImg = this.nextImg.bind(this)
  }
  componentDidMount() {
    fs.readdir(imgDir, (err, files) => {
      console.log('files', files)
      let fullFiles = []
      files.forEach((file, i) => {
        fullFiles.push(imgDir + '/' + file)
      })
      this.setState(({
        files: fullFiles
      }))
      this.nextImg()
    })
  }
  componentWillUnmount() {
    // @TODO don't forget to clear the interval
  }
  nextImg() {
    console.log('nextImg')
    console.log('this.state.files.length', this.state.files.length)
    setInterval(() => {
      let curFileI = ++this.state.curFileI
      if ( curFileI >= this.state.files.length ) {
        curFileI = 0
      }
      console.log('curFileI', curFileI)
      this.setState({
        curFile: this.state.files[curFileI],
        curFileI: curFileI
      })
    }, 1000)
  }
  render() {
    console.log('this.state.files', this.state.files)
    let curImg = '';
    if ( this.state.curFile ) {
      let imgStyle = {
        backgroundImage: 'url(' + this.state.curFile + ')',
        backgroundSize: 'cover',
        backgorundPosition: 'center center',
        backgorundRepeat: 'no-repeat',
        display: 'block',
        height: '200px',
        width: '100%',
      }
      curImg = (<div style={imgStyle} src={this.state.curFile}></div>)
    }
    return (
      <div>
        {curImg}
      </div>
    )
  }
}

export default Slideshow
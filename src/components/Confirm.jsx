import React from 'react'

class Confirm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.keydownHandler = this.keydownHandler.bind(this)
  }
  returnToIdle() {
    this.props.stateHandler({
        mode: 'idle',
        capturedImage: '',
      })
  }
  keydownHandler(event) {
    if ( event.key === 'ArrowLeft' ) {
      // save image
      let fileName = './images/image_' + new Date().getTime() + '.jpg'
      const base64Data = this.props.capturedImage.replace(/^data:image\/png;base64,/, "");
      fs.writeFile(fileName, base64Data, 'base64', function (err) {
        console.log(err);
      });
    }
    this.returnToIdle()
  }
  componentDidMount() {
    console.log('componentDidMount')
    let photo = document.getElementById('photo')
    photo.setAttribute('src', this.props.capturedImage)
    document.addEventListener("keydown", this.keydownHandler)
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownHandler)
  }
  render() {
    return (
      <div className="confirm_wrap">
        <img id="photo" alt="The screen capture will appear in this box." />
      </div>
    )
  }
}
export default Confirm
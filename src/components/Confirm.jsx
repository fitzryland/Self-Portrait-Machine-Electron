import React from 'react'
class Confirm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.keydownHandler = this.keydownHandler.bind(this)
  }
  returnToIdle(verdict) {
    this.props.stateHandler({
        mode: 'idle',
        capturedImage: '',
        message: verdict,
      })
    setTimeout(() => {
      this.props.stateHandler({
        message: this.props.messages.idle
      })
    }, 5000)
  }
  keydownHandler(event) {
    let verdict = this.props.messages.rejected
    if ( event.key === 'ArrowLeft' ) {
      let fileName = './images/image_' + new Date().getTime() + '.jpg'
      verdict = this.props.messages.approved
      const base64Data = this.props.capturedImage.replace(/^data:image\/png;base64,/, "");
      fs.writeFile(fileName, base64Data, 'base64', function (err) {
        console.log(err);
      });
    }
    this.returnToIdle(verdict)
  }
  componentDidMount() {
    let photo = document.getElementById('photo')
    photo.setAttribute('src', this.props.capturedImage)
    document.addEventListener("keydown", this.keydownHandler)
    this.props.stateHandler({
      message: this.props.messages.approval
    })
    setTimeout(() => {
      this.returnToIdle(this.props.messages.rejected)
    }, 30000)
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownHandler)
  }
  render() {
    return (
      <div className="confirm_wrap">
        <img
          className="confirm_photo"
          id="photo"
        />
      </div>
    )
  }
}
export default Confirm
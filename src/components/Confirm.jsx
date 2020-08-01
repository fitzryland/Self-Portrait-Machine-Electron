import React from 'react'
let countdownIntervalId = false
class Confirm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.keydownHandler = this.keydownHandler.bind(this)
    this.confirmCountdown = this.confirmCountdown.bind(this)
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
  confirmCountdown() {
    let countdownI = 30
    let countdownEl = document.getElementById('countdown')
    countdownIntervalId = setInterval(() => {
      countdownEl.textContent = countdownI
      --countdownI
      if ( countdownI < 0 ) {
        clearInterval(countdownIntervalId)
        this.returnToIdle(this.props.messages.rejected)
      }
    }, 1000)
  }
  componentDidMount() {
    let photo = document.getElementById('photo')
    photo.setAttribute('src', this.props.capturedImage)
    document.addEventListener("keydown", this.keydownHandler)
    this.props.stateHandler({
      message: this.props.messages.approval
    }, this.confirmCountdown)
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownHandler)
    clearInterval(countdownIntervalId)
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
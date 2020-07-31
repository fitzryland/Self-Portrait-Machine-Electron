import React from 'react'

class Capture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.takePhoto = this.takePhoto.bind(this)
  }
  takePhoto() {
    let countdownI = 5;
    let intervalId = setInterval(() => {
      console.log(countdownI)
      if ( countdownI <= 0 ) {
        console.log('KABLAMO!!')
        // @TODO do the actual photo taking here.
        clearInterval(intervalId)
      }
      --countdownI
    }, 1000)
  }
  componentDidMount() {
    console.log('componentDidMount')
    let takePhoto = this.takePhoto
    navigator.mediaDevices.getUserMedia({video: true})
      .then(function(stream) {
        var video = document.getElementById('camera')
        video.srcObject = stream
        video.onloadedmetadata = function(e) {
          video.play()
          takePhoto()
        }
      }).catch(function() {
        alert('could not connect stream')
      })
  }
  render() {
    return (
      <div className="capture_wrap">
        <video
          className="capture_video"
          id="camera"
          autoplay
        ></video>
        <canvas id="canvas"></canvas>
      </div>
    )
  }
}
export default Capture
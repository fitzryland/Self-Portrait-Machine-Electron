import React from 'react'

let video = false
let canvas = false
let width = 500 // @TODO need to update to bigger size
let height = 0

class Capture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.takePhoto = this.takePhoto.bind(this)
    this.startCountdown = this.startCountdown.bind(this)
  }
  takePhoto() {
    console.log('takePhoto')
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL('image/jpg');
      this.props.stateHandler({
        mode: 'confirm',
        capturedImage: data
      })
    } else {
      // clearphoto();
    }
  }
  startCountdown() {
    let countdownI = 5;
    let intervalId = setInterval(() => {
      console.log(countdownI)
      if ( countdownI <= 0 ) {
        console.log('KABLAMO!!')
        this.takePhoto()
        clearInterval(intervalId)
      }
      --countdownI
    }, 1000)
  }
  componentDidMount() {
    console.log('componentDidMount')
    let startCountdown = this.startCountdown
    video = document.getElementById('camera')
    canvas = document.getElementById('canvas')
    navigator.mediaDevices.getUserMedia({video: true})
      .then(function(stream) {
        video.srcObject = stream
        video.onloadedmetadata = function(e) {
          video.play()
        }
      }).catch(function() {
        alert('could not connect stream')
      })
      video.addEventListener('canplay', function(ev){
        height = video.videoHeight / (video.videoWidth/width)
        video.setAttribute('width', width)
        video.setAttribute('height', height)
        canvas.setAttribute('width', width)
        canvas.setAttribute('height', height)
        startCountdown()
      })
  }
  componentWillUnmount() {}
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
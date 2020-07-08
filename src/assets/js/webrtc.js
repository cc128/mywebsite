class webrtc {
    constructor(x, y) {
        this.mediaRecorder = null;
    }
    getCamera(tag) {
        let videoBox = document.querySelector(tag);
        return navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: {
                    width: { min: 1024, ideal: 1280, max: 1920 },
                    height: { min: 576, ideal: 720, max: 1080 },
                    width: videoBox.offsetWidth,
                    height: videoBox.offsetHeight,
                    facingMode: {
                        exact: "environment"
                    }
                }
            })
            .then(localStream => {
                // 获取摄像头画面，赋值给video标签
                videoBox.srcObject = localStream;
                // 播放
                videoBox.onloadedmetadata = e => {
                    videoBox.play();
                };
                return {
                    videoBox: videoBox,
                    localStream: localStream
                };
            })
            // .catch(err => {
            //     alert(1);
            //     // return err
            // });
    }
    // 创建视频流
    getStream(localStream, callBack, time = 500) {
        this.mediaRecorder = new MediaRecorder(localStream, {
            mimeType: "video/webm;codecs=vp9"
        });
        // 500毫秒发送一次，视频流到后端
        this.mediaRecorder.ondataavailable = blob => {
            callBack(blob);
        };
        this.mediaRecorder.start(time);
    }
    // 结束视频流
    overVideo() {
        this.mediaRecorder.stop();
    }
}
export default webrtc;

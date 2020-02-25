async function getMedia() {  
    try {
        const stream = await navigator.mediaDevices.getUserMedia({video:{height:{max:480},width:867},audio:false});
        const video =  document.querySelector('video');
        video.srcObject = stream;
        video.play();
        
        let recorder = await RecordRTC(stream, {
          type: 'gif',
          frameRate: 1,
          quality: 10,
          width: 360,
          hidden: 240,
          
          onGifRecordingStarted: function() {
           console.log('started')
         },
        });
        
        recorder.startRecording();

        let form = new FormData();
        

        const stop = document.getElementById("capturar");
        stop.addEventListener("click",(e)=>{
          recorder.stopRecording();
          console.log("stop")
          video.srcObject = null;
          form.append('file',recorder.getBlob(),'myGif.gif');
          let myGifData = form.get('file');
          let url = URL.createObjectURL(myGifData);
          video.srcObject;
          console.log(url);
          console.log(typeof(myGifData));
          console.log(myGifData);
          window.localStorage.setItem('myGif',JSON.stringify(myGifData));
        })
        
        



    } catch(err) {
      return err;
    }
}




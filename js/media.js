const API_KEY = 'b2g4JRv7IfUVGikP56CQaZrkvuwWNQnn';

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
        console.log(form)

        const stop = document.getElementById("capturar");
        stop.addEventListener("click",async function getId(){
          recorder.stopRecording();
          console.log("stop")
          video.srcObject = null;
          form.append('file',recorder.getBlob(),'myGif.gif');
          
          let file = form.get('file');
          let url = URL.createObjectURL(file);
          let trueUrl = url.slice(5,);
          form.append("source_image_url",trueUrl);
          const API_KEY = 'b2g4JRv7IfUVGikP56CQaZrkvuwWNQnn';
          console.log(form);
          
          try{
            let response = await fetch(`https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`,{
              method: "POST",
              body: form
            });
            let data = await response.json();
            console.log(data);
            
            localStorage.setItem('myGif',JSON.stringify(data));


          }catch(e){
            console.log("ERRORRRRRRRRR");
          }

          
        })
        
        



    } catch(err) {
      return err;
    }
}










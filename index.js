 // Input Text Element
 let text_el = document.getElementById('text');
 let btn_el = document.getElementById('btn');
 let btnImage_el = document.getElementById('btnImage');

 let recorder;
 let recordedChunks = [];

 // Function
 const speakFunction = () => {
   if (text_el.value.length > 0) {
     let msg = new SpeechSynthesisUtterance(text_el.value);
     msg.rate = 0.3;
     msg.pitch = 2;
     window.speechSynthesis.speak(msg);
     console.log(text_el.value);
     msg.onstart = function () {
       btnImage_el.src = './speech.gif';

       navigator.mediaDevices
         .getUserMedia({ audio: true })
         .then((stream) => {
           recorder = new MediaRecorder(stream);
           recorder.start();

           recorder.ondataavailable = (e) => {
             recordedAudio = e.data;
           };
         });
     };
     msg.onend = function () {
       btnImage_el.src = './keyboard.png';
       text_el.value = '';

       recorder.stop();

       recorder.onstop = function () {
         let url = URL.createObjectURL(recordedAudio);
         let a = document.createElement('a');
         a.href = url;
         a.download = 'recordedAudio.wav';
         document.body.appendChild(a);
         a.click();
         document.body.removeChild(a);
       };
     };
   } else {
     console.log('No Text Found');
     let msg = new SpeechSynthesisUtterance(
       'No Text Found, Please Enter A text'
     );
     window.speechSynthesis.speak(msg);
     console.log(text_el.value);
   }
 };

 // Request microphone access as soon as the page loads
 document.addEventListener('DOMContentLoaded', function () {
   navigator.mediaDevices
     .getUserMedia({ audio: true })
     .then(function (stream) {})
     .catch(function (err) {});
 });
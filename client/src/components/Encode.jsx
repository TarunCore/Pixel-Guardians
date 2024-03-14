import React from 'react';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import { useRef } from 'react';
const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
const Encode = () => {
    // const [c, setC] = useState(0);
    function previewImage(file, canvasSelector, callback) {
        var reader = new FileReader();
        var image = new Image();
        var canvas = document.querySelector(canvasSelector);
        var context = canvas.getContext('2d');
      
        if (file) {
          reader.readAsDataURL(file);
        }
      
        reader.onloadend = function() {
          image.src = URL.createObjectURL(file);
      
          image.onload = function() {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);
            callback();
          }
        }
      }
  const previewEncodeImage = () => {
    console.log("Adass");
    var file = document.querySelector("input[name=baseFile]").files[0];
    document.querySelector(".images .nulled").style.display = "none";
    document.querySelector(".images .message").style.display = "none";
  
    previewImage(file, ".original canvas", function() {
      document.querySelector(".images .original").style.display = "block";
      document.querySelector(".images").style.display = "block";
    });
  };

  const encodeMessage = (event) => {
    event.preventDefault();
    document.querySelector(".error").style.display = "none";
    document.querySelector(".binary").style.display = "none";
  
    var text = document.querySelector("textarea.message").value;
  
    var originalCanvas = document.querySelector('.original canvas');
    var nulledCanvas = document.querySelector('.nulled canvas');
    var messageCanvas = document.querySelector('.message canvas');
  
    var originalContext = originalCanvas.getContext("2d");
    var nulledContext = nulledCanvas.getContext("2d");
    var messageContext = messageCanvas.getContext("2d");
  
    var width = originalCanvas.width;
    var height = originalCanvas.height;
  
    if ((text.length * 8) > (width * height * 3)) {
      document.querySelector(".error").textContent = "Text too long for chosen image....";
      document.querySelector(".error").style.display = "block";
      return;
    }
  
    nulledCanvas.width = width;
    nulledCanvas.height = height;
    messageCanvas.width = width;
    messageCanvas.height = height;
  
    var original = originalContext.getImageData(0, 0, width, height);
    var pixel = original.data;
    for (var i = 0, n = pixel.length; i < n; i += 4) {
      for (var offset = 0; offset < 3; offset++) {
        if (pixel[i + offset] % 2 !== 0) {
          pixel[i + offset]--;
        }
      }
    }
    nulledContext.putImageData(original, 0, 0);
  
    var binaryMessage = "";
    for (var i = 0; i < text.length; i++) {
      var binaryChar = text[i].charCodeAt(0).toString(2);
      while (binaryChar.length < 8) {
        binaryChar = "0" + binaryChar;
      }
      binaryMessage += binaryChar;
    }
    document.querySelector('.binary textarea').textContent = binaryMessage;
  
    var message = nulledContext.getImageData(0, 0, width, height);
    pixel = message.data;
    var counter = 0;
    for (var i = 0, n = pixel.length; i < n; i += 4) {
      for (var offset = 0; offset < 3; offset++) {
        if (counter < binaryMessage.length) {
          pixel[i + offset] += parseInt(binaryMessage[counter]);
          counter++;
        } else {
          break;
        }
      }
    }
    messageContext.putImageData(message, 0, 0);
    document.querySelector(".binary").style.display = "block";
    // document.querySelector(".images .nulled").style.display = "block";
    // document.querySelector(".images .message").style.display = "block";
    document.querySelector(".images").style.display = "inline";
    console.log("adsf");
    document.querySelector(".message").style.display = "inline";
    console.log("adsf2");
  };

  return (
    <div className="tab-pane active" id="encode">
      <div>
        <h2 style={{fontFamily:"Poppins"}}>Encode message</h2>
        
        <form className="form">
          <div className="form-group">
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}

            >
            Upload file
            <input name="baseFile" style={{display:"none"}} type="file" onChange={previewEncodeImage}/>
            </Button>
            {/* <input className="form-control" type="file" name="baseFile" onChange={previewEncodeImage} /> */}
          </div>

          <div className="form-group">
          <Textarea aria-label="empty textarea"  className="form-control message" minRows="3" placeholder="Enter your message here" />;
            {/* <textarea className="form-control message" rows="3" placeholder="Enter your message here"></textarea> */}
          </div>

          <div className="form-group">
          <Button className="encode btn btn-default pull-right"  onClick={encodeMessage} variant="contained">Encode</Button>
            {/* <button className="encode btn btn-default pull-right" onClick={encodeMessage}>Encode</button> */}
          </div>
        </form>
        <div className="clearfix"></div>
      </div>

      <div className="error" style={{ display: 'none' }}></div>
      <div className="binary" style={{ display: 'none' }}>
        <h3>Binary representation of your message</h3>
        <Textarea aria-label="empty textarea"  className="form-control message" minRows="3" placeholder="" />;
        {/* <textarea className="form-control message" style={{ wordWrap: 'break-word' }}></textarea> */}
      </div>
      <div className="images" style={{ display: 'flex' }}>
        <div className="original" style={{ display: 'none' }}>
          <h3>Original</h3>
          <canvas style={{maxWidth:"50%" }}></canvas>
        </div>
        <div className="nulled" style={{ display: 'none'}}>
          <h3>Normalized</h3>
          <canvas></canvas>
        </div>
        <div className="message" style={{ display: 'none' }}>
          <h3>Message hidden in image (right click <span className="glyphicon glyphicon-arrow-right"></span> save as)</h3>
          <canvas style={{maxWidth:"50%" }}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Encode;

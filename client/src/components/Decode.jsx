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

const Decode = () => {
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
  const previewDecodeImage = () => {
    var file = document.querySelector('input[name=decodeFile]').files[0];
    previewImage(file, ".decode canvas", function() {
      document.querySelector(".decode").style.display = "block";
    });
  };

  const decodeMessage = (event) => {
    event.preventDefault();
    var originalCanvas = document.querySelector('.decode canvas');
    var originalContext = originalCanvas.getContext("2d");
  
    var original = originalContext.getImageData(0, 0, originalCanvas.width, originalCanvas.height);
    var binaryMessage = "";
    var pixel = original.data;
    for (var i = 0, n = pixel.length; i < n; i += 4) {
      for (var offset = 0; offset < 3; offset++) {
        var value = 0;
        if (pixel[i + offset] % 2 !== 0) {
          value = 1;
        }
        binaryMessage += value;
      }
    }
  
    var output = "";
    for (var i = 0; i < binaryMessage.length; i += 8) {
      var c = 0;
      for (var j = 0; j < 8; j++) {
        c <<= 1;
        c |= parseInt(binaryMessage[i + j]);
      }
      output += String.fromCharCode(c);
    }
  
    document.querySelector('.binary-decode textarea').textContent = output;
    document.querySelector('.binary-decode').style.display = "block";
  };

  return (
    <div className="tab-pane" id="decode">
      <div>
        <h2>Decode image</h2>
        <p className="alert alert-info">
          Upload the image to extract the hash in the image
        </p>
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
            <input name="decodeFile" style={{display:"none"}} type="file" onChange={previewDecodeImage}/>
            </Button>
            {/* <input className="form-control" type="file" name="decodeFile" onChange={previewDecodeImage} /> */}
          </div>
          <div className="form-group">
          <Button className="decode btn btn-default pull-right" sx={{marginTop:"10px", marginBottom:"10px"}} variant="contained" onClick={decodeMessage}>Decode</Button>
            {/* <button className="decode btn btn-default pull-right" onClick={decodeMessage}>Decode</button> */}
          </div>
        </form>
        <div className="clearfix"></div>
      </div>
      <div className="binary-decode" style={{ display: 'none' }}>
        <h3>Data</h3>
        <textarea className="form-control message" rows={3} style={{ wordWrap: 'break-word', fontSize:"25px" }}></textarea>
      </div>
      <div className="decode" style={{ display: 'none' }}>
        <h3>Input</h3>
        <canvas></canvas>
      </div>
    </div>
  );
};

export default Decode;

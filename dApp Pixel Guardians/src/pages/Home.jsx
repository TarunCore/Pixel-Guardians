import React from "react";
import "../assets/style.css";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
const Home = () => {
  const [img, setImg] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [blockStage, setBlockStage] = useState(false);

  const connectBlockChain = ()=>{
    
  }

  const setLoading = ()=>{
    setIsLoading(true);
  }

  function previewImage(file, canvasSelector, callback) {
    var reader = new FileReader();
    var image = new Image();
    var canvas = document.querySelector(canvasSelector);
    var context = canvas.getContext("2d");

    if (file) {
      reader.readAsDataURL(file);
    }

    reader.onloadend = function () {
      image.src = URL.createObjectURL(file);

      image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        callback();
      };
    };
  }
  const previewDecodeImage = () => {
    var file = document.querySelector("input[name=decodeFile]").files[0];
    previewImage(file, ".decode canvas", function () {

      setImg(1);
      // document.querySelector(".decode").style.display = "block";
    });
  };

  const decodeMessage = (event) => {
    setLoading();
    const element = document.querySelector('#lod');
    console.log(element);
      element.scrollIntoView({ behavior: 'smooth' });
    event.preventDefault();
    var originalCanvas = document.querySelector(".decode canvas");
    var originalContext = originalCanvas.getContext("2d");

    var original = originalContext.getImageData(
      0,
      0,
      originalCanvas.width,
      originalCanvas.height
    );
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
    const hashValue = output.substring(0, 66);
    
    setTimeout(()=>{
      setIsLoading(false);
      document.querySelector("#hashvalue").textContent = hashValue
      document.querySelector(".binary-decode textarea").textContent = output;
      document.querySelector(".binary-decode").style.display = "block";
      setBlockStage(true)
    }, 1500)
  };

  return (
    <div >
      <div>Check if your image is AI!</div>
      <div
        style={{  display: "flex", flexDirection: "column",alignItems: "center",}}
      >
        <input type="file" id="fileInput" style={{ display: "none" }}  name="decodeFile" onChange={previewDecodeImage}/>
        <button
          className="upload-btn"
          onClick={() => {
            document.getElementById("fileInput").click();
          }}
        >
          Upload Image
        </button>
        <p>Upload your image file to Check for AI</p>
      </div>

      <div className="tab-pane" id="decode" style={{display:"flex",alignItems:"center", flexDirection:"column"}}>
      <div>
        <h2>Decode image</h2>
        <button className="decode btn btn-default pull-right upload-btn" onClick={decodeMessage}>Decode</button>
        <div className="clearfix"></div>
      </div>
      
      
      {<div className="decode">
        <canvas style={{maxHeight:"500px"}}></canvas>
      </div>}
      {isLoading==true && <CircularProgress sx={{marginTop:"10px", marginBottom:"10px"}}/>}
      
      <div className="binary-decode" style={{ display: 'none' }}>
        <h3>Hash Of the WaterMark</h3>
        <p id="hashvalue"></p>
        <textarea className="form-control message" style={{ wordWrap: 'break-word', display:"none" }}>
        </textarea>
      </div>
      <div id="lod" style={{marginTop:"20px"}}></div>

      {blockStage==true && <div>
          <p>Connecting to block chain...</p>
        </div>}
    </div>

    </div>
  );
};

export default Home;

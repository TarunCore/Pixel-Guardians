import React from "react";
import "../assets/style.css";
import { useState } from "react";
import {Card} from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import {Web3} from "web3"
let hashValueG = "";
const Home = () => {
  const [img, setImg] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [blockStage, setBlockStage] = useState(false);
  const [imgDetail, setImgDetail] = useState(null);
  const [notAI, setNotAI] = useState(null);
  // const [hashValue, setHashValue] = useState("");
  function waitThreeSeconds() {
    return new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
  }
  const connectBlockChain = ()=>{
    const web3 = new Web3(window.ethereum);
    if (typeof window.ethereum !== 'undefined') {
      // Request account access if needed
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(function(accounts) {
          console.log("Accounts:", accounts);
        })
        .catch(function(err) {
          console.error("Error requesting accounts:", err);
        });
    } else {
      console.error("MetaMask not detected. Please install MetaMask to interact with the contract.");
    }
    
    // Function to call dehashData and retrieve hashed data
     function getHashedData() {
      // Contract address and ABI
      const contractAddress = "0x90B176281B501b2505dF780f315788311be0720c";
      const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "author",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "model",
				"type": "string"
			}
		],
		"name": "DataStored",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_author",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_model",
				"type": "string"
			}
		],
		"name": "hashAndStoreData",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_hash",
				"type": "bytes32"
			}
		],
		"name": "dehashData",
		"outputs": [
			{
				"internalType": "string",
				"name": "author",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "model",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "gett",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "hashedData",
		"outputs": [
			{
				"internalType": "string",
				"name": "author",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "model",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

      // Instantiate contract
      const contract = new web3.eth.Contract(abi, contractAddress);
      // await waitThreeSeconds();
      // Example hash value to retrieve data
      // console.log(hashValue);
      const hashToRetrieve = hashValueG // Replace with the actual hash value

      // Call dehashData function
      // setTimeout()
      try{
        contract.methods.dehashData(hashToRetrieve).call()
        .then(function(data) {
          // console.log(hashValue);
          console.log("Retrieved hashed data:", data);
          let arr=[];
          for(let i=0;i<4;i++){
            arr.push(data[i]);
          }
          setImgDetail(arr);
          // Display the retrieved data on the webpage or perform further processing
          // Example: document.getElementById("hashedData").innerHTML = JSON.stringify(data);
        })
        .catch(function(err) {
        
          console.error("Error retrieving hashed data:", err);
        });
      }catch(e){
        setNotAI(true);
        console.log(e);
      }
    }
    getHashedData()
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
    // const element = document.querySelector('#lod');
    // console.log(element);
    // element.scrollIntoView({ behavior: 'smooth' });
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
      if(output.length!=66){
        // isValidHash=false; // handle break
      }
      const hashValue = output.substring(0, 66);
      const regex = /^[a-z0-9]+$/;
      const isValidHash = regex.test(hashValue);
      console.log(isValidHash);
      console.log(hashValue);
      // setHashValue(hashValue)
      hashValueG=hashValue;
      connectBlockChain();
      setTimeout(()=>{
        setIsLoading(false);
      document.querySelector("#hashvalue").textContent = hashValue
      document.querySelector(".binary-decode textarea").textContent = output;
      document.querySelector(".binary-decode").style.display = "block";
      setIsLoading2(true);
      setTimeout(()=>{
        setIsLoading2(false);
        setBlockStage(true);
      }, 2000)
      
    }, 1500)
  };

  return (
    <div >
      <div>Is an AI behind your image?</div>
      {!img && <div
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
      </div>}

      <div className="tab-pane" id="decode" style={{display:"flex",alignItems:"center", flexDirection:"column"}}>
      {img && <div>
        {/* <h2>Decode image</h2> */}
        <button className="decode btn btn-default pull-right upload-btn" onClick={decodeMessage} style={{marginBottom:"25px"}}>Decode Image</button>
        <div className="clearfix"></div>
      </div>}
      
      <div style={{display:"flex", width:"95vw"}}>
        <div style={{width:"50%",display:"flex", justifyContent:"space-around"}}>
            {<div className="decode">
                <canvas style={{maxHeight:"500px", maxWidth:"45vw"}}></canvas>
            </div>}
            {/* {isLoading==true && <CircularProgress sx={{marginTop:"10px", marginBottom:"10px"}}/>} */}
        </div>
        <div style={{width:"50%"}}>
          
              {notAI && <div><p style={{fontSize:"22px", color:"lightgreen"}}>Your image hasn't been made with AI</p></div>}
              {!notAI && <div>
                {isLoading==true && <div className="dot-container">
            <div  className="dot"></div>
            <div className="dot"></div>
            <div  className="dot"></div>
        </div>}
                  <div className="binary-decode" style={{ display: 'none' }}>
                  <h3>Hash Of the WaterMark</h3>
                  <p id="hashvalue"></p>
                  <textarea className="form-control message" style={{ wordWrap: 'break-word', display:"none" }}>
                  </textarea>
                </div>
                <div id="lod" style={{marginTop:"20px"}}></div>
                {isLoading2 === true && <div className="dot-container"><div className="dot"></div><div className="dot"></div><div className="dot"></div></div>}
                <div>
                  {blockStage==true && <div>
                      <p style={{color:"lightgreen"}}>Your image was made with AI</p>
                      {imgDetail && <Card variant="outlined" style={{minWidth:"400px", padding:"10px", background:"grey", color:"#fefefe"}}>
                      <div>
                        <p>{"Author: "+imgDetail[0]}</p>
                        <p>{"ID    : "+imgDetail[1]}</p>
                        <p>{"Date  : "+imgDetail[2]}</p>
                        <p>{"Model : "+imgDetail[3]}</p>
                      </div>
                        </Card>}
                    </div>}
                </div>
              </div>}
              
        </div>
      </div>
      
      
      
    </div>

    </div>
  );
};

export default Home;

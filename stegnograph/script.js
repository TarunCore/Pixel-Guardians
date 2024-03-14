document.querySelectorAll('button.encode, button.decode').forEach(function(button) {
    button.addEventListener('click', function(event) {
      event.preventDefault();
    });
  });
  
  function previewDecodeImage() {
    var file = document.querySelector('input[name=decodeFile]').files[0];
    previewImage(file, ".decode canvas", function() {
      document.querySelector(".decode").style.display = "block";
    });
  }
  
  function previewEncodeImage() {
    var file = document.querySelector("input[name=baseFile]").files[0];
    document.querySelector(".images .nulled").style.display = "none";
    document.querySelector(".images .message").style.display = "none";
  
    previewImage(file, ".original canvas", function() {
      document.querySelector(".images .original").style.display = "block";
      document.querySelector(".images").style.display = "block";
    });
  }
  
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
  
  function encodeMessage() {
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
    document.querySelector(".images .nulled").style.display = "block";
    document.querySelector(".images .message").style.display = "block";
  };
  
  function decodeMessage() {
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
  
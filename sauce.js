$(function() {
  var canvas = $("canvas[name=preview]")[0];
  var context = canvas.getContext('2d');
  var imageObj = new Image();
  // imageObj.width = canvas.clientWidth;
  // imageObj.height = canvas.clientHeight;

  imageObj.onload = function() {
        context.drawImage(imageObj, 0, 0);
  };

  imageObj.src = 'http://i.imgur.com/yL0ZhV8.png';

  $( "img[name=img1]" ).attr( "src", "http://goo.gl/33em65" );
  $( "img[name=img2]" ).attr( "src", "http://goo.gl/Ak1Fbl" );
  $( "img[name=img1]" ).mouseenter(function(){
  	var s = $( "img[name=img1]").attr("src"); 
  	applyBg(s);
  });
  $( "img[name=img2]" ).mouseenter(function() {
  	var s = $( "img[name=img2]").attr("src"); 
  	applyBg(s);
  });
  $(".thumbnails").mouseleave(function(){
		$("canvas[name=preview]")[0].getContext('2d').drawImage(imageObj, 0, 0, imageObj.width , imageObj.height, 
																		0, 0, canvas.width, canvas.height);
  });
});

function applyBg(imgSelected) {

    var orgCanvas = $('<canvas />')[0];
    orgCanvas.width = 640;
    orgCanvas.height = 480;


	xi=new XMLHttpRequest();
	xi.open("GET","imgdata.php?url="+"http://i.imgur.com/e9wBUIr.png",true);
	xi.send();

	var orgPixelData;
	xi.onreadystatechange=function() {
	  if(xi.readyState==4 && xi.status==200) {
	    img=new Image;
	    img.onload=function(){ 
	      orgCanvas.getContext('2d').drawImage(img, 0, 0, orgCanvas.width, orgCanvas.height);
	    }
	    img.src=xi.responseText;
	    orgPixelData = orgCanvas.getContext('2d').getImageData(0, 0, orgCanvas.width, orgCanvas.height);
	  }
	}

    var imgSelCanvas = $('<canvas />')[0];
    imgSelCanvas.width = orgCanvas.width;
    imgSelCanvas.height = orgCanvas.height;

   	xi1=new XMLHttpRequest();
	xi1.open("GET","imgdata.php?url="+imgSelected,true);
	xi1.send();

	xi1.onreadystatechange=function() {
	  if(xi1.readyState==4 && xi1.status==200) {
	    img=new Image;
	    img.onload=function(){ 
	      imgSelCanvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height
	      												,0, 0, imgSelCanvas.width, imgSelCanvas.height);
	    }
	    img.src=xi1.responseText;
		 var imgSelPixelData = imgSelCanvas.getContext('2d').getImageData(0, 0, imgSelCanvas.width, imgSelCanvas.height);

	    for (var i=0;i<orgPixelData.data.length;i+=4)
		{
		  if(i>640*200)
		  {
			  orgPixelData.data[i]=imgSelPixelData.data[i];
			  orgPixelData.data[i+1]=imgSelPixelData.data[i+1];
			  orgPixelData.data[i+2]=imgSelPixelData.data[i+2];
			  orgPixelData.data[i+3]=imgSelPixelData[i+3];
		  }
		}
		$("canvas[name=preview]")[0].getContext('2d').putImageData(imgSelPixelData,0,0);
	  }
	}
        
  }

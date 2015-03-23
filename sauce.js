$(function() {
  var canvas = $("canvas[name=preview]")[0];
  var context = canvas.getContext('2d');
  var imageObj = new Image();
  // imageObj.width = canvas.clientWidth;
  // imageObj.height = canvas.clientHeight;

  imageObj.onload = function() {
        context.drawImage(imageObj, 0, 0);
  };

  // imageObj.src = 'http://i.imgur.com/yL0ZhV8.png';
  imageObj.src = 'tip.png';

  $( "img[name=img1]" ).attr( "src", "temp1.jpg" );
  $( "img[name=img2]" ).attr( "src", "temp2.jpg" );
  $( "img[name=img3]" ).attr( "src", "temp3.jpg" );
  $( "img[name=img4]" ).attr( "src", "temp4.jpg" );
  $( "img[name=img5]" ).attr( "src", "temp5.jpg" );

  for (var i = 1; i <= 5; i++) {
  	callbg(i);
  }
  $(".thumbnails").mouseleave(function(){
  		context.clearRect ( 0 , 0 , canvas.width, canvas.height );	
		context.drawImage(imageObj, 0, 0);
  });
});

function callbg(i)
{
  	var img_t = "img[name=img"+i.toString()+"]"; 
  	$( img_t ).mouseenter(function(){
  	var s = $( img_t ).attr("src"); 
  	applyBg(s);
  	});
}

function applyBg(imgSelected) {

	// imgSelected = "purple.jpg"

    var orgCanvas = $('<canvas name="1"></canvas>')[0];
    orgCanvas.width = 720;
    orgCanvas.height = 480;
    var img = new Image();

    img.onload = function(){
    	
    	orgCanvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height, 
    											0, 0, orgCanvas.width, orgCanvas.height);

	    var orgPixelData = orgCanvas.getContext('2d').getImageData(0, 0, orgCanvas.width, orgCanvas.height);

		// xi=new XMLHttpRequest();
		// xi.open("GET","imgdata.php?url="+"http://i.imgur.com/e9wBUIr.png",true);
		// xi.send();

		// var orgPixelData;
		// xi.onreadystatechange=function() {
		//   if(xi.readyState==4 && xi.status==200) {
		//     img=new Image;
		//     img.onload=function(){ 
		//       orgCanvas.getContext('2d').drawImage(img, 0, 0, orgCanvas.width, orgCanvas.height);
		//     }
		//     img.src=xi.responseText;
		//     orgPixelData = orgCanvas.getContext('2d').getImageData(0, 0, orgCanvas.width, orgCanvas.height);
		//   }
		// }

	    var imgSelCanvas = $('<canvas name="2"></canvas>')[0];
	    imgSelCanvas.width = orgCanvas.width;
	    imgSelCanvas.height = orgCanvas.height;
	    var img1 = new Image();
		img1.onload = function(){    
	    	imgSelCanvas.getContext('2d').drawImage(img1, 0, 0, img1.width, img1.height
		       												,0, 0, imgSelCanvas.width, imgSelCanvas.height);
		    var imgSelPixelData = imgSelCanvas.getContext('2d').getImageData(0, 0, imgSelCanvas.width, imgSelCanvas.height);


		// xi1=new XMLHttpRequest();
		// xi1.open("GET","imgdata.php?url="+imgSelected,true);
		// xi1.send();

		// xi1.onreadystatechange=function() {
		//   if(xi1.readyState==4 && xi1.status==200) {
		//     img=new Image;
		//     img.onload=function(){ 
		//       imgSelCanvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height
		//       												,0, 0, imgSelCanvas.width, imgSelCanvas.height);
		//     }
		//     img.src=xi1.responseText;
		// 	 var imgSelPixelData = imgSelCanvas.getContext('2d').getImageData(0, 0, imgSelCanvas.width, imgSelCanvas.height);

			var delta = 16;
		    for (var i=0;i<orgPixelData.data.length;i+=4)
			{
			  if((orgPixelData.data[i]>=19-delta && orgPixelData.data[i]<=19+delta)&&
			  	(orgPixelData.data[i+1]>=177-delta&&orgPixelData.data[i+1]<=177+delta)&&
			  	(orgPixelData.data[i+2]>=20-delta&&orgPixelData.data[i+2]<=20+delta))
			  {
				  orgPixelData.data[i]=imgSelPixelData.data[i];
				  orgPixelData.data[i+1]=imgSelPixelData.data[i+1];
				  orgPixelData.data[i+2]=imgSelPixelData.data[i+2];
				  orgPixelData.data[i+3]=imgSelPixelData.data[i+3];
			  }
			}
			$("canvas[name=preview]")[0].getContext('2d').putImageData(orgPixelData,0,0);
	    };
	    img1.src = imgSelected;
    };
    img.src = "org_green.jpg";
}
	

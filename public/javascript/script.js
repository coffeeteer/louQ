$(document).ready(function(){
	console.log('i haz page load');
	// alert('I haz page load');
// $('#carousel').carousel({
//   interval: 2000
// });

//Navbar Logo Code ************************************************************* Begin
var navbarHeight = $('.logo_navbar').height(); //.navabr

$(window).scroll(function() {
  var navbarColor ="45,45,45"; //"62,195,246";//color attr for rgba
  var smallLogoHeight = $('.small-logo').height();
  var bigLogoHeight = $('.big-logo').height();
  
  
  var smallLogoEndPos = 0;
  var smallSpeed = (smallLogoHeight / bigLogoHeight);
  
  var ySmall = ($(window).scrollTop() * smallSpeed); 
  
  var smallPadding = navbarHeight - ySmall;
  if (smallPadding > navbarHeight) { smallPadding = navbarHeight; }
  if (smallPadding < smallLogoEndPos) { smallPadding = smallLogoEndPos; }
  if (smallPadding < 0) { smallPadding = 0; }
  
  $('.small-logo-container').css({ "padding-top": smallPadding});
  
  var navOpacity = ySmall / smallLogoHeight; 
  if  (navOpacity > 1) { navOpacity = 1; }
  if (navOpacity < 0 ) { navOpacity = 0; }
  var navBackColor = 'rgba(' + navbarColor + ',' + navOpacity + ')';
  $('.logo_navbar').css({"background-color": navBackColor}); /* navbar*/
  $('img.small-logo').css({"background-color": navBackColor});
  
  var shadowOpacity = navOpacity * 0.4;
  if ( ySmall > 1) {
    $('.logo_navbar').css({"box-shadow": "0 2px 3px rgba(0,0,0," + shadowOpacity + ")"}); /*.navbar */
  } else {
    $('.logo_navbar').css({"box-shadow": "none"}); /*.navbar*/
  }  
});
// Navbar Logo Code ------------------------------------------------------------- END

  // Lightbox
  
}); //document.ready
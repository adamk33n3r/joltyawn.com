var mouseX, mouseY;

function createImage() {
  var url = 'https://static-cdn.jtvnw.net/emoticons/v1/300356/3.0';
  var img = $('<img src="' + url + '">');
  img.addClass('jolty-fountain');
  img.css({ top: mouseY - 56, left: mouseX - 56 });
  return img;
}

function spawnImage() {
  if (mouseX != undefined || mouseY != undefined) {
    var img = createImage();
    img.appendTo(document.body);

    var time = Math.random() * 2000 + 2000;
    img.animate({ top: '+=1500' }, time, 'linear', function () {
      // Delete image after animation
      img.remove();
    });
  }
  requestAnimationFrame(spawnImage);
}

$(document).mousemove(function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

$(function () {
  console.log('Welcome, Joltyawn fans!');
  // Create new image every n miliseconds
  requestAnimationFrame(spawnImage);
});


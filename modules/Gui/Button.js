export class Button {
  constructor(img, x, y, w, h) {
    this.img = img;
    this.name = img.name;
    this.x = x || 0;
    this.y = y || 0;
    this.x = w || 10;
    this.y = h || 10;
  }

  source(path) {
    var img = new Image();
    img.onload = function () {};

    img.src = `assets/Gui/${path}`;
    this.icon = img;
  }
  position(x, y) {}
  scale(x, y) {}
}

function createImage(): HTMLImageElement {
  const img = new Image();
  img.src = 'https://static-cdn.jtvnw.net/emoticons/v1/300356/3.0';
  return img;
}

const baseImg = createImage();

export class Jolty {
  public x: number = 0;
  public y: number = 0;
  public speed: number = 0;
  public flipped: boolean = false;

  constructor(private width: number, private height: number) {
    this.init();
  }

  public update(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.y += this.speed;

    if (this.y > this.height) {
      this.init();
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (this.flipped) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(baseImg, -this.x, this.y, -baseImg.width, baseImg.height);
      ctx.restore();
    } else {
      ctx.drawImage(baseImg, this.x, this.y);
    }
  }

  public init() {
    this.x = (Math.random() * (this.width + baseImg.width)) - baseImg.width;
    this.y = -baseImg.height;
    this.speed = Math.random() * 5 + 5;
    this.flipped = Math.random() >= 0.5;
  }
}

type Impulse = {
  cancel: boolean;
  draw: ImageCanvas;
  finalTextLines: string[];
  track: (number | undefined)[][];
  step: number;
  tick(): void;
} | null;

const FONT = '0.9rem Courier New';

export class ImageCanvas {
  context: CanvasRenderingContext2D;
  textLines: null | string[];
  asciiArtLines: string[][];
  canvasWidth: number;
  canvasHeight: number;
  impulse: Impulse;

  constructor(ctx: CanvasRenderingContext2D, ctxWidth: number, ctxHeight: number) {
    this.context = ctx;
    this.textLines = null;
    this.asciiArtLines = [['']];
    this.canvasWidth = ctxWidth;
    this.canvasHeight = ctxHeight;
    this.impulse = null;
  }

  draw() {
    if (this.textLines == null) return;

    this.context.save();
    // background color
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.context.imageSmoothingEnabled = false;
    this.context.font = FONT;
    this.context.fontKerning = 'none';
    this.context.fillStyle = '#0AA5D9';

    const lineHeight = this.canvasHeight / this.textLines.length;

    for (let i = 0; i < this.textLines.length; i++) {
      if (Array.isArray(this.textLines)) {
        this.context.fillText(this.textLines[i], 0, (i + 1) * lineHeight);
      }
    }

    this.context.restore();
  }

  apply(lineIndex?: number, charIndex?: number, char?: string) {
    if (lineIndex === undefined && Array.isArray(this.textLines)) {
      for (let i = this.asciiArtLines.length - 1; i > -1; i--) this.textLines[i] = this.asciiArtLines[i].join('');
    } else if (char && lineIndex && charIndex) {
      this.asciiArtLines[lineIndex][charIndex] = char;
    }
  }

  set(newTextLines: string[]) {
    if (this.textLines === null) {
      this.textLines = new Array(newTextLines.length);
      for (let i = newTextLines.length - 1; i > -1; i--) {
        this.textLines[i] = newTextLines[i];
      }

      this.asciiArtLines = new Array(newTextLines.length);
      for (let i = newTextLines.length - 1; i > -1; i--) this.asciiArtLines[i] = newTextLines[i].split('');

      this.draw();

      return;
    }

    const impulse = {
      cancel: false,
      draw: this,
      finalTextLines: newTextLines,
      track: new Array(newTextLines.length),
      step: 0,
      tick() {
        if (this.cancel) return;
        let l, c, inx, line;

        while (this.step++ % 120 !== 0 && this.track.length > 0) {
          l = getRandom(this.track.length);
          c = getRandom(this.track[l].length - 1) + 1;
          inx = this.track[l][c];
          line = this.track[l][0];
          this.draw.apply(line, inx, this.finalTextLines[line][inx]);
          this.track[l].splice(c, 1);
          if (this.track[l].length == 1) this.track.splice(l, 1);
        }

        this.draw.apply();
        impulse.draw.draw();
        if (this.track.length > 0) requestAnimationFrame(() => impulse.tick());
      },
    };

    if (this.impulse) this.impulse.cancel = true;

    newTextLines.forEach((line, index) => {
      impulse.track[index] = new Array(line.length + 1);
      impulse.track[index][0] = index;
      for (let i = line.length; i > 0; i--) impulse.track[index][i] = i;
    });

    this.impulse = impulse;
    impulse.tick();
  }
}

export const createImageText = (
  src: string,
  context: CanvasRenderingContext2D,
  imgResults: Record<string, string[]>,
  resultCallBack: (res: string[]) => void
) => {
  if (!imgResults[src] && context) {
    const img = new Image();

    img.onload = () => {
      const width = 75;
      const height = 65;

      context.drawImage(img, 0, 0, width, height);

      const asciiChars = ['@', '#', '&', '$', '%', '!', '*', '+', ';', ':', ',', '.'];

      const stepX = 1;
      const stepY = 1;

      const res = [];

      for (let y = 0; y < height; y += stepY) {
        let line = '';

        for (let x = 0; x < width; x += stepX) {
          const pixel = context.getImageData(x, y, 1, 1).data;

          const brightness = (pixel[0] + pixel[1] + pixel[2]) / 3 / 255;
          const charIndex = Math.floor(brightness * (asciiChars.length - 1));

          line += asciiChars[charIndex];
        }

        res.push(line);
      }

      resultCallBack(res);
      imgResults[src] = res;
    };
    img.src = src;
  } else {
    resultCallBack(imgResults[src]);
  }
};

const getRandom = (max: number) => {
  return Math.floor(Math.random() * max);
};

import { DrawSetting } from "../../models";
import { ColorPattern, IColorGenerator } from "./interface";

type ColorGradientItem = {
  position: number;
  red: number;
  green: number;
  blue: number;
};

class ColorGenerator implements IColorGenerator {
  private readonly config: DrawSetting;
  private colorStartIndex: number;
  private colorIterateIndex: number;
  private colorTable: ColorGradientItem[] = [];

  private readonly gradientRainbows: ColorGradientItem[] = [
    { position: 0, red: 255, green: 0, blue: 0 },
    { position: 43, red: 255, green: 255, blue: 0 },
    { position: 85, red: 0, green: 255, blue: 0 },
    { position: 128, red: 0, green: 255, blue: 255 },
    { position: 171, red: 0, green: 0, blue: 255 },
    { position: 223, red: 255, green: 0, blue: 255 },
    { position: 255, red: 255, green: 0, blue: 0 },
  ];

  private readonly gradientWarm: ColorGradientItem[] = [
    { position: 0, red: 255, green: 0, blue: 0 },
    { position: 128, red: 255, green: 255, blue: 0 },
    { position: 255, red: 255, green: 0, blue: 0 },
  ];

  private readonly gradientForest: ColorGradientItem[] = [
    { position: 0, red: 255, green: 255, blue: 0 },
    { position: 128, red: 0, green: 255, blue: 0 },
    { position: 255, red: 255, green: 255, blue: 0 },
  ];

  private readonly gradientCool: ColorGradientItem[] = [
    { position: 0, red: 0, green: 0, blue: 255 },
    { position: 128, red: 0, green: 255, blue: 255 },
    { position: 255, red: 0, green: 0, blue: 255 },
  ];

  private readonly gradientHeat: ColorGradientItem[] = [
    { position: 0, red: 255, green: 255, blue: 0 },
    { position: 43, red: 255, green: 0, blue: 0 },
    { position: 85, red: 0, green: 0, blue: 255 },
    { position: 128, red: 0, green: 0, blue: 0 },
    { position: 171, red: 0, green: 0, blue: 255 },
    { position: 223, red: 255, green: 0, blue: 0 },
    { position: 255, red: 255, green: 255, blue: 0 },
  ];

  private readonly gradientMonochrome: ColorGradientItem[] = [
    { position: 0, red: 0, green: 0, blue: 0 },
    { position: 128, red: 255, green: 255, blue: 255 },
    { position: 255, red: 0, green: 0, blue: 0 },
  ];

  private readonly gradientPastel: ColorGradientItem[] = [
    { position: 0, red: 255, green: 154, blue: 154 },
    { position: 85, red: 255, green: 255, blue: 154 },
    { position: 170, red: 154, green: 255, blue: 255 },
    { position: 255, red: 255, green: 154, blue: 154 },
  ];

  private static colorToHex = (color: number) => {
    const hex = Math.round(color).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  public constructor(config: DrawSetting) {
    this.config = config;
    this.colorStartIndex = 0;
    this.colorIterateIndex = 0;
    const gradient: ColorGradientItem[] = (() => {
      switch (config.pattern) {
        case ColorPattern.Rainbow:
          return this.gradientRainbows;
        case ColorPattern.Fire:
          return this.gradientWarm;
        case ColorPattern.Green:
          return this.gradientForest;
        case ColorPattern.Ice:
          return this.gradientCool;
        case ColorPattern.Heat:
          return this.gradientHeat;
        case ColorPattern.Monochrome:
          return this.gradientMonochrome;
        case ColorPattern.Pastel:
          return this.gradientPastel;
        default:
          return this.gradientRainbows;
      }
    })();

    let endIndex = 1;
    let start = gradient[0];
    let end = gradient[1];
    for (let i = 0; i < 256; i += 1) {
      const ratio = (i - start.position) / (end.position - start.position);
      const red = start.red + ratio * (end.red - start.red);
      const green = start.green + ratio * (end.green - start.green);
      const blue = start.blue + ratio * (end.blue - start.blue);
      this.colorTable.push({ position: i, red, green, blue });
      if (end.position === i) {
        start = end;
        endIndex += 1;
        end = gradient[endIndex];
      }
    }
  }

  private fetchColor(index: number): string {
    const beforeIndex = Math.floor(index);
    const afterIndex = Math.ceil(index) !== this.colorTable.length - 1 ? Math.ceil(index) : 0;
    const beforeWeight = index - beforeIndex;
    const afterWeight = 1 - beforeWeight;
    const color = {
      red: Math.floor(beforeWeight * this.colorTable[beforeIndex].red + afterWeight * this.colorTable[afterIndex].red),
      green: Math.floor(
        beforeWeight * this.colorTable[beforeIndex].green + afterWeight * this.colorTable[afterIndex].green
      ),
      blue: Math.floor(
        beforeWeight * this.colorTable[beforeIndex].blue + afterWeight * this.colorTable[afterIndex].blue
      ),
    };
    const red = ColorGenerator.colorToHex(color.red);
    const green = ColorGenerator.colorToHex(color.green);
    const blue = ColorGenerator.colorToHex(color.blue);
    return `#${red}${green}${blue}`;
  }

  public next(): string {
    const color = this.fetchColor(Math.floor(this.colorIterateIndex));
    this.colorIterateIndex = (this.colorIterateIndex + this.config.colorStep) % 256;
    return color;
  }

  public endIteration(): void {
    this.colorStartIndex = (this.colorStartIndex + this.config.colorStep) % 256;
    this.colorIterateIndex = this.colorStartIndex;
  }
}

export default ColorGenerator;

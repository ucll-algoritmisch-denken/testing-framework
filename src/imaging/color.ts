export class Color
{
    constructor(public r : number, public g : number, public b : number) { }
}

export const Colors = {
    black: new Color(0, 0, 0),
    red: new Color(255, 0, 0),
    green: new Color(0, 255, 0),
    blue: new Color(0, 0, 255),
    yellow: new Color(255, 255, 0),
    magenta: new Color(255, 0, 255),
    cyan: new Color(0, 255, 255),
    white: new Color(255, 255, 255)
}

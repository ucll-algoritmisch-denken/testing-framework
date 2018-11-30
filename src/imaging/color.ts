export type Color = { r : number, g : number, b : number };

export function color(r : number, g : number, b : number) : Color
{
    return { r, g, b };
}

export const Colors = {
    black: color(0, 0, 0),
    red: color(255, 0, 0),
    green: color(0, 255, 0),
    blue: color(0, 0, 255),
    yellow: color(255, 255, 0),
    magenta: color(255, 0, 255),
    cyan: color(0, 255, 255),
    white: color(255, 255, 255)
};

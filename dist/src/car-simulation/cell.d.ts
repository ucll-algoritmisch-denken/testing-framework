export declare abstract class Cell {
    abstract canBeDrivenOnto: boolean;
    /**
     * Whether the sensor senses this cell.
     */
    abstract isSensed(): boolean;
    abstract isDestination(): boolean;
}
export declare class Wall extends Cell {
    readonly canBeDrivenOnto: boolean;
    isSensed(): boolean;
    isDestination(): boolean;
}
export declare class Empty extends Cell {
    readonly canBeDrivenOnto: boolean;
    isSensed(): boolean;
    isDestination(): boolean;
}
export declare class Destination extends Cell {
    readonly canBeDrivenOnto: boolean;
    isSensed(): boolean;
    isDestination(): boolean;
}

export interface IConfiguration {
    verifySolutions?: boolean;
}
export declare const configuration: IConfiguration;
export declare function configure(config: IConfiguration): void;

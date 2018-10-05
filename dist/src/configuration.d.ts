export interface IConfiguration {
    verifySolutions?: boolean;
}
export declare let configuration: IConfiguration;
export declare function configure(config: IConfiguration): void;

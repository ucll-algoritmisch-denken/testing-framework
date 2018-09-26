export interface IConfiguration
{
    verifySolutions ?: boolean;
}

export let configuration : IConfiguration = { verifySolutions: true };

export function configure(config : IConfiguration)
{
    configuration = { ...configuration, ...config };
}
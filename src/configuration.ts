export interface IConfiguration
{
    verifySolutions ?: boolean;
}

export const configuration : IConfiguration = { verifySolutions: true };

export function configure(config : IConfiguration)
{
    Object.assign(configuration, config);
}
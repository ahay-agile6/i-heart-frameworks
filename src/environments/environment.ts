// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import sharedEnvironment from './base';

export const environment = {
  ...sharedEnvironment,
  production: false,
  frameworks: [
    {name: 'dotnet-core', apiBase: 'http://localhost:5001', displayName: '.NET Core', avatarFileName: 'dotnet-core.png'},
    {name: 'node-js', apiBase: 'http://localhost:5002', displayName: 'NodeJS', avatarFileName: 'node-js.jpg'}
  ]
};

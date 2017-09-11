// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyBsM1uiGazT1XsH1DxUqWusBXpnOWY42sM',
        authDomain: 'yuval-ngrx-poc.firebaseapp.com',
        databaseURL: 'https://yuval-ngrx-poc.firebaseio.com',
        projectId: 'yuval-ngrx-poc',
        storageBucket: 'yuval-ngrx-poc.appspot.com',
        messagingSenderId: '460480040753'
    }
};

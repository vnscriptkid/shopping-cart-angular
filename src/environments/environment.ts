// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  navBarBackgroundColor: 'blue',
  firebase: {
    apiKey: 'AIzaSyDj8mluwz5pYULIfSVRQEDEzKIhICwoha4',
    authDomain: 'shopping-cart-angular-app.firebaseapp.com',
    databaseURL: 'https://shopping-cart-angular-app.firebaseio.com',
    projectId: 'shopping-cart-angular-app',
    storageBucket: 'shopping-cart-angular-app.appspot.com',
    messagingSenderId: '7706'
  }
};

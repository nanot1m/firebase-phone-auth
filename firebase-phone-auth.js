// Initialize Firebase
(function(global, firebase, firebaseui) {
  function runAuth(config) {
    // FirebaseUI config.
    var uiConfig = {
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          recaptchaParameters: {
            type: "image", // 'audio'
            size: "invisible", // 'invisible' or 'compact'
            badge: "bottomleft" //' bottomright' or 'inline' applies to invisible.
          },
          defaultCountry: "RU",
          defaultNationalNumber: "",
          loginHint: ""
        }
      ],
      callbacks: {
        signInSuccess: function(currentUser, credential, redirectUrl) {
          firebase
            .functions()
            .httpsCallable("getAuthenticationToken")()
            .then(result => {
              window.postMessage(
                JSON.stringify({
                  success: false,
                  data: result.data
                })
              );
            });
        },
        signInFailure: function(error) {
          window.postMessage(
            JSON.stringify({
              success: false,
              error: {
                message: error ? error.message : "Unknown error"
              }
            })
          );
        }
      },
      // Terms of service url.
      tosUrl: "https://youlook-3d5d5.firebaseapp.com"
    };
    firebase.initializeApp(config);
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig);
  }

  global.runAuth = runAuth;
})(window, firebase, firebaseui);

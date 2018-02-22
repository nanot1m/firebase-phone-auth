// Initialize Firebase
(function(global, firebase, firebaseui) {
  function runAuth(config) {
    firebase.initializeApp(config);

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
          defaultNationalNumber: "1234567890",
          loginHint: "+71234567890"
        }
      ],
      callbacks: {
        signInSuccess: function(currentUser, credential, redirectUrl) {
          // Do something.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          alert(
            JSON.stringify(
              {
                currentUser: currentUser,
                credential: credential
              },
              null,
              4
            )
          );
          return true;
        },
        signInFailure: function(error) {
          // Some unrecoverable error occurred during sign-in.
          // Return a promise when error handling is completed and FirebaseUI
          // will reset, clearing any UI. This commonly occurs for error code
          // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
          // occurs. Check below for more details on this.
          alert("It's a disaster: " + error.message);
          return false;
        }
      },
      // Terms of service url.
      tosUrl: "https://youlook-3d5d5.firebaseapp.com"
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig);
  }

  global.runAuth = runAuth;
})(window, firebase, firebaseui);

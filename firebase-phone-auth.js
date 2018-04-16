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
          // Do something.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          alert("SUCCESS");
          try {
            // firebase.auth();
            // .createCustomToken(currentUser.uid)
            // .then(function(token) {
            //   alert(token);
            //   window.postMessage(
            //     JSON.stringify({
            //       success: true,
            //       data: { token: token }
            //     })
            //   );
            // })
            // .catch(function(error) {
            //   alert("ERROR " + error.message);
            //   window.postMessage(
            //     JSON.stringify({
            //       success: false,
            //       error: { message: error ? error.message : "unknown error" }
            //     })
            //   );
            // });
          } catch (ex) {
            alert(ex.message);
          }
          alert("END");
        },
        signInFailure: function(error) {
          // Some unrecoverable error occurred during sign-in.
          // Return a promise when error handling is completed and FirebaseUI
          // will reset, clearing any UI. This commonly occurs for error code
          // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
          // occurs. Check below for more details on this.
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

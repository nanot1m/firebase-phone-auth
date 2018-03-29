// Initialize Firebase
(function(global, firebase, firebaseui) {
  var RequestCodeForm = document.getElementById('RequestCodeForm')
  var ValidateCodeForm = document.getElementById('ValidateCodeForm')

  function initRequestCodeForm(appVerifier) {
    hideElement(ValidateCodeForm)
    showElement(RequestCodeForm)
    RequestCodeForm.onsubmit = funciton() {
      var phoneNumber = this.phone;
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function (confirmationResult) {
            alert("SMS sent.") // Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            
            initValidateCodeForm(window.confirmationResult)
          }).catch(function (error) {
            alert("Error; SMS not sent")
          });
    } 
  }

  function initValidateCodeForm(confirmationResult) {
    showElement(ValidateCodeForm)
    ValidateCodeForm.onsubmit = function() {
      var code = this.code
      window.postMessage
    }
  }

  function runAuth(config) {
    firebase.initializeApp(config);
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': function(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
      }
    })
    
  }

  /**
   * Shows element
   * @param {HTMLElement} element 
   */
  function showElement(element) {
    element.style.display = 'block'
  }

  /**
   * Hides element
   * @param {HTMLElement} element 
   */
  function hideElement(element) {
    element.style.display = 'none'
  }

  global.runAuth = runAuth;
})(window, firebase, firebaseui);

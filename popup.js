window.addEventListener( 'load', function() {
  var form =    document.getElementById('authForm'),
      user    = document.getElementById('username'),
      pass    = document.getElementById('password'),
      auth;

  username.value = localStorage['username'] || "";
  password.value = localstorage['password'] || "";

  form.addEventListener( 'submit', function ( e ) {
      localStorage['username'] =  user.value;
      localStorage['password'] =  pass.value;
 
      isAuthenticated( {
          'force':        true,
          'isAuthed':     function () {
              notify( {
                  'el':       form,
                  'msg':      chrome.i18n.getMessage( 'successfulAuth' ),
                  'type':     "success",
                  'callback': function () { window.close(); }
              } );
              clearPopup();
          },
          'notAuthed':    function () {
              notify( {
                  'el':       form,
                  'msg':      chrome.i18n.getMessage( 'failedAuth' ),
                  'type':     "failure"
              } );
              setPopup();
          },
          'error':        function () {
              notify( {
                  'el':       form,
                  'msg':      chrome.i18n.getMessage( 'errorAuth' ),
                  'type':     "failure"
              } );
              setPopup();
          }
      } );
      e.preventDefault(); e.stopPropagation();
      return false;
  } );
  }
}
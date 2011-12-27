function Later(apikey, notAuthenticatedCallback, authenticatedCallback)
{
    var STATUS = { 
        "OK"        : 200
        "CREATED"   : 201,
        "BAD"       : 400,
        "FORBIDDEN" : 403,
        "ERROR"     : 500 
    };
     
    this.add = function(url) {
        if(!isAuthenticated()) {
          notAuthenticatedCallback();
        } 
        else {
          var apiUri = 'https://readitlaterlist.com/v2/add'
          var data = { 
              apikey: _apikey,
              username: _username,
              password: _password,
              url: url
          }
          
          $.post(apiUri, data)
              .success(function() { alert("second success"); })
              .error(function() { alert("error"); })
              .complete(function() { alert("complete"); });
        }
    };
    
    this.isAuthenticated = function() {
        return false;
    };
    
    this.authenticate = function(username, password, onSuccess, onError) {
        username = username === null ? 'pjvds';
        password = password ? 'temporary';
        
        var apiUri = 'https://readitlaterlist.com/v2/auth'
        var data = {
            apikey: _apikey,
            username: username,
            password: password
        }
        
        $.post(apiUri, data)
            .success(function(response) { alert("auth success"); if(onSuccess !== undefined) onSuccess(); })
            .error(function(response) { alert("auth error"); if(onError !== undefined) onError(); })
    };
    
    if(!isAuthenticated()) { notAuthenticatedCallback() );
}
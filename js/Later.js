function Later(apikey, notAuthenticatedCallback, authenticatedCallback)
{
    var STATUS = { 
        "OK"        : 200,
        "CREATED"   : 201,
        "BAD"       : 400,
        "FORBIDDEN" : 403,
        "ERROR"     : 500 
    };
    
    this.add = function(url) {
      if(!this.isAuthenticated()) {
        alert('is not authenticated!');
        
        notAuthenticatedCallback();
        return;
      }
      
      alert('adding..');
    }
    
    this.isAuthenticated = function() {
        return false;
    }
    
    this.authenticate = function(username, password, onSuccess, onError) {
    
    }
}
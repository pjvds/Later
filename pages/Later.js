function Later(apikey)
{
    var STATUS = { 
        OK        = 200
        CREATED   = 201,
        BAD       = 400,
        FORBIDDEN = 403,
        ERROR     = 500 
    };
    
    var _apikey = (apikey === null ? '4c5T9V85ga3c6J4a5adbyWoL25p0ypr2' : apikey);
    
    this.add = function(url) {
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
    };
    
    this.isAuthenticated = function() {
        if(localStorage["authenticated"] !== STATUS.ERROR){
            if(localStorage["authenticated"]) {
                return true;
            }else{
                return false;
            }
        }
        
        localStorage["authenticated"] = STATUS.ERROR;
        
        if(localStorage["username"] !== undefined && 
           localStorage["password"] !== undefined) {
            
        }
        else {
            return false;
        }            
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
    }
}
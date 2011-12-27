function Later(username, password, apikey)
{
    var _username = username === null ? 'pjvds';
    var _password = password ? 'temporary';
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
}
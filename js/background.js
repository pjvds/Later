var _currentTabId;

chrome.tabs.onUpdated.addListener(function(tabId) {
    _currentTabId = tabId;
    chrome.pageAction.show(tabId);
    
    if(!ReadItLater.isAuthenticated()) {
        console.log("popup set because user is not authenticated.")
        this.setPopup();
    } else {
        console.log("popup cleared because user is authenticated.")
        this.clearPopup();
    }

    chrome.pageAction.show(tabId);

});

chrome.pageAction.onClicked.addListener(function (tab) {
    try
    {
        Later.addUrl(tab.url,
            this.markSuccess,
            this.markForbidden,
            this.markError);
    }
    catch(error)
    {
        this.markError();
    }
});

function setPopup() {
    chrome.pageAction.setPopup({
        tabId:_currentTabId,
        popup:'popup.html'
    });
}

function clearPopup() {
    chrome.pageAction.setPopup({
        tabId:_currentTabId,
        popup:''
    });
}

var STATUS = {
    "IDLE":0,
    "BOOKMARKED":1,
    "FORBIDDEN":2,
    "ERROR":3
};

this.setIcon = function(state) {
    switch(state) {
        case STATUS.IDLE:
            chrome.pageAction.setIcon({ tabId: _currentTabId, path: "icons/status_idle.png"});
            break;
        case STATUS.BOOKMARKED:
            chrome.pageAction.setIcon({ tabId: _currentTabId, path: "icons/status_bookmarked.png"});
            break;
        case STATUS.FORBIDDEN:
            chrome.pageAction.setIcon({ tabId: _currentTabId, path: "icons/status_forbidden.png"});
            break;
        case STATUS.ERROR:
            chrome.pageAction.setIcon({ tabId: _currentTabId, path: "icons/status_error.png"});
            break;
    }
}

this.markSuccess = function() {
    setIcon(STATUS.BOOKMARKED);
    clearPopup();
}

this.markError = function(error) {
    setIcon(STATUS.ERROR);
    setPopup();
}

this.markForbidden = function() {
    setIcon(STATUS.FORBIDDEN);
    setPopup();
}

this.markIdle = function() {
    setIcon(STATUS.IDLE);
    clearPopup();
}

window.addEventListener('load', function () {
    markIdle();
});
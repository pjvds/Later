var _currentTabId;

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

this.setPopup = function () {
    chrome.pageAction.setPopup({
        'tabId':_currentTabId,
        'popup':'popup.html'
    });
}

this.clearPopup = function () {
    chrome.pageAction.setPopup({
        'tabId':_currentTabId,
        'popup':''
    });
}

this.tabChangedHandler = function (tab) {
    chrome.pageAction.show(tab.id || tab);
    _currentTabId = tab.id || tab;
}

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(tabChangedHandler);
chrome.tabs.onSelectionChanged.addListener(tabChangedHandler);
chrome.tabs.onUpdated.addListener(tabChangedHandler);
chrome.tabs.getSelected(null, tabChangedHandler);

// Called when the user clicks on the page action
chrome.pageAction.onClicked.addListener(function (tab) {
    if(localStorage["username"] !== undefined && localStorage["password"] !== undefined) {
        Later.add(tab.url,
            this.markSuccess(),
            this.markForbidden(),
            this.markError());
    }
    else{
        this.markForbidden();
    }
});

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
    this.markIdle();
});
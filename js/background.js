var _currentTabId;

chrome.tabs.onUpdated.addListener(function(tabId) {
    _currentTabId = tabId;
    chrome.pageAction.show(tabId);
    
    if(ReadItLater.isAuthenticated() == false) {
        console.log("popup set because user is not authenticated.")
        setPopup();
    } else {
        console.log("popup cleared because user is authenticated.")
        clearPopup();
    }

    chrome.pageAction.show(tabId);

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

//var _currentTabId;
//
//var STATUS = {
//    "IDLE":0,
//    "BOOKMARKED":1,
//    "FORBIDDEN":2,
//    "ERROR":3
//};
//
//this.setIcon = function(state) {
//    switch(state) {
//        case STATUS.IDLE:
//            chrome.pageAction.setIcon({ tabId: _currentTabId, path: "icons/status_idle.png"});
//            break;
//        case STATUS.BOOKMARKED:
//            chrome.pageAction.setIcon({ tabId: _currentTabId, path: "icons/status_bookmarked.png"});
//            break;
//        case STATUS.FORBIDDEN:
//            chrome.pageAction.setIcon({ tabId: _currentTabId, path: "icons/status_forbidden.png"});
//            break;
//        case STATUS.ERROR:
//            chrome.pageAction.setIcon({ tabId: _currentTabId, path: "icons/status_error.png"});
//            break;
//    }
//}
//
//
//
//// Called when the user clicks on the page action
//chrome.pageAction.onClicked.addListener(function (tab) {
//    if(localStorage["username"] !== undefined && localStorage["password"] !== undefined) {
//        Later.add(tab.url,
//            this.markSuccess(),
//            this.markForbidden(),
//            this.markError());
//    }
//    else{
//        this.markForbidden();
//    }
//});
//
//this.markSuccess = function() {
//    setIcon(STATUS.BOOKMARKED);
//    clearPopup();
//}
//
//this.markError = function(error) {
//    setIcon(STATUS.ERROR);
//    setPopup();
//}
//
//this.markForbidden = function() {
//    setIcon(STATUS.FORBIDDEN);
//    setPopup();
//}
//
//this.markIdle = function() {
//    setIcon(STATUS.IDLE);
//    clearPopup();
//}
//
//window.addEventListener('load', function () {
//    this.markIdle();
//});
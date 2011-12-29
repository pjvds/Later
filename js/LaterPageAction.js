var LaterPageAction = ( function() {
    "use strict";

    var STATUS_IDLE = '0',        // Use text values for STATUS because
        STATUS_BOOKMARKED = '1',  // the value will be stored in the
        STATUS_FORBIDDEN = '2',   // localStorage which makes a string
        STATUS_ERROR = '3',       // value when storing a int value.
        KEY_STATE='Later.state',  // This way we prevent conversion.
        currentTabId;

    function init() {
        chrome.tabs.onUpdated.addListener(tabChangedHandler);
        chrome.pageAction.onClicked.addListener(pageActionClickHandler);

        changeState(STATUS_IDLE);
    }

    function authenticate(username, password, onSuccess, onInvalidCredentials, onError) {
        ReadItLater.authenticate(username, password,function () {
            changeState(STATUS_IDLE);

            onSuccess();
        }, function () {
            changeState(STATUS_FORBIDDEN);

            onInvalidCredentials();
        }, function (e) {
            changeState(STATUS_ERROR);

            onError(e);
        })
    }

    function tabChangedHandler(tab) {
        currentTabId = tab.id || tab;
        chrome.pageAction.show(currentTabId);

        setStateForCurrentTab();
    }

    function pageActionClickHandler(tab) {
        alert('klick!!');

        if(ReadItLater.isAuthenticated()) {
            alert('authed... adding now!!');
            try
            {
                ReadItLater.addUrl(tab.url,
                    function() { changeState(STATUS_BOOKMARKED); },
                    function() { changeState(STATUS_FORBIDDEN); },
                    function(e) { changeState(STATUS_ERROR); });
            }
            catch(error)
            {
                changeState(STATUS_ERROR);
            }
        } else {
            alert('forbidden!!');
            changeState(STATUS_FORBIDDEN);
        }
    }

    function changeState(state) {
        localStorage[KEY_STATE] = state;
        setStateForCurrentTab();
    }

    function setStateForCurrentTab() {
        var state = localStorage[KEY_STATE];

        switch(state) {
            case STATUS_IDLE:
                chrome.pageAction.setIcon({ tabId: currentTabId, path: "icons/status_idle.png"});
                clearPopup();
                break;
            case STATUS_BOOKMARKED:
                chrome.pageAction.setIcon({ tabId: currentTabId, path: "icons/status_bookmarked.png"});
                clearPopup();
                break;
            case STATUS_FORBIDDEN:
                chrome.pageAction.setIcon({ tabId: currentTabId, path: "icons/status_forbidden.png"});
                setPopup();
                break;
            case STATUS_ERROR:
                chrome.pageAction.setIcon({ tabId: currentTabId, path: "icons/status_error.png"});
                setPopup();
                break;
        }
    }

    function setPopup() {
        chrome.pageAction.setPopup({'tabId': currentTabId, popup: 'popup.html'});
    }
    function clearPopup() {
        chrome.pageAction.setPopup({'tabId': currentTabId, popup: ''});
    }

    return {
        'init': init,
        'authenticate': authenticate
    }
} ())

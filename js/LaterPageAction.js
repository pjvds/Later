var LaterPageAction = ( function() {
    "use strict";

    var STATUS_IDLE = '0',        // Use text values for STATUS because
        STATUS_BOOKMARKED = '1',  // the value will be stored in the
        STATUS_FORBIDDEN = '2',   // localStorage which makes a string
        STATUS_ERROR = '3',       // value when storing a int value.
        KEY_STATE='Later.state',  // This way we prevent conversion.
        KEY_TAB_ID='Later.currentTabId';

    function getCurrentTabId() {
        return parseInt(localStorage[KEY_TAB_ID]);
    }

    function setCurrentTabId(tabId) {
        localStorage[KEY_TAB_ID]=tabId;
    }

    function init() {
        chrome.tabs.onUpdated.addListener(tabChangedHandler);
        chrome.tabs.onActiveChanged.addListener(tabChangedHandler);
        chrome.pageAction.onClicked.addListener(pageActionClickHandler(tab));

        localStorage[KEY_STATE]=STATUS_IDLE;
    }

    function authenticate(username, password, onSuccess, onInvalidCredentials, onError) {
        ReadItLater.authenticate(username, password,function () {
            changeState(STATUS_IDLE);

            onSuccess();
        }, function () {
            changeState(STATUS_FORBIDDEN, 'Invalid username or password');

            onInvalidCredentials();
        }, function (error) {
            changeState(STATUS_ERROR, error);

            onError(error);
        })
    }

    function tabChangedHandler(tab) {
        var tabId = tab.id || tab;
        setCurrentTabId(tabId);
        chrome.pageAction.show(tabId);
    }

    function pageActionClickHandler(tab) {
        setCurrentTabId(tab.id);

        if(ReadItLater.isAuthenticated()) {
            try
            {
                ReadItLater.addUrl(tab.url,
                    function() { changeState(STATUS_BOOKMARKED); },
                    function() { changeState(STATUS_FORBIDDEN, 'Invalid username or password'); },
                    function(error) { changeState(STATUS_ERROR, error); });
            }
            catch(error)
            {
                changeState(STATUS_ERROR, error);
            }
        } else {
            changeState(STATUS_FORBIDDEN, 'Invalid username or password');
        }
    }

    function changeState(state) {
        changeState(state, undefined);
    }

    function changeState(state, errorMessage) {
        localStorage[KEY_STATE] = state;
        setStateForCurrentTab();

        if(errorMessage !== undefined) {
            Notification.setMessage(errorMessage);
        }
    }

    function setStateForCurrentTab() {
        var state = localStorage[KEY_STATE];
        var currentTabId = getCurrentTabId();

        switch(state) {
            case STATUS_IDLE:
                chrome.pageAction.setIcon({ tabId: currentTabId, path: "icons/status_idle.png"});
                clearPopup(currentTabId);
                break;
            case STATUS_BOOKMARKED:
                chrome.pageAction.setIcon({ tabId: currentTabId, path: "icons/status_bookmarked.png"});
                clearPopup(currentTabId);
                break;
            case STATUS_FORBIDDEN:
                chrome.pageAction.setIcon({ tabId: currentTabId, path: "icons/status_forbidden.png"});
                setPopup(currentTabId);
                break;
            case STATUS_ERROR:
                chrome.pageAction.setIcon({ tabId: currentTabId, path: "icons/status_error.png"});
                setPopup(currentTabId);
                break;
        }
    }

    function setPopup(tabId) {
        chrome.pageAction.setPopup({'tabId': tabId, popup: 'popup.html'});
    }
    function clearPopup(tabId) {
        chrome.pageAction.setPopup({'tabId': tabId, popup: ''});
    }

    return {
        'init': init,
        'authenticate': authenticate
    }
} ())

// Copyright (c) 2011 Craftify. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var _later;

this.init = function() {
  _later = new Later('4c5T9V85ga3c6J4a5adbyWoL25p0ypr2', setPopup, clearPopup);
}

this.setPopup = function() {
  chrome.tabs.getCurrent(function(tab){
    chrome.pageAction.setPopup({
        'tabId':     localStorage["currentTabId"],
        'popup':    'popup.html'
    });
    
    alert('popup set!');
  })
}

this.clearPopup = function() {
  chrome.tabs.getCurrent(function(tab){
    chrome.pageAction.setPopup({
        'tabId':     localStorage["currentTabId"],
        'popup':    ''
    });
  })
  
  alert('popup cleared!');
}

handleTabEvents = function(tab) {
  chrome.pageAction.show(tab.id || tab);
  localStorage["currentTabId"] = tab.id || tab;
  
  alert('Tab id set: '+localStorage["currentTabId"]);
}

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(handleTabEvents);
chrome.tabs.onSelectionChanged.addListener(handleTabEvents);
chrome.tabs.onUpdated.addListener(handleTabEvents);
chrome.tabs.getSelected(null, handleTabEvents);

// Called when the user clicks on the page action
chrome.pageAction.onClicked.addListener(function(tab) {
    //if(_later.isAuthenticated()) {
    alert('click!');
    //} else {
    //  alert('no auth!');
    //}
});

window.addEventListener( 'load', function() {
  init();
});
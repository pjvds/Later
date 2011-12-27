// Copyright (c) 2011 Craftify. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var _later;
var _currentTabId;

this.init = function() {
  _later = new Later('4c5T9V85ga3c6J4a5adbyWoL25p0ypr2', this.setPopup, this.clearPopup);
}

this.setPopup = function() {
  alert('setting popup...'+_currentTabId);
  
  chrome.pageAction.setPopup({
      'tabId':     _currentTabId,
      'popup':    'pages/popup.html'
  });
    
  alert('popup set!');
}

this.clearPopup = function() {
  chrome.pageAction.setPopup({
      'tabId':     _currentTabId,
      'popup':    ''
  });
  
  alert('popup cleared!');
}

handleTabEvents = function(tab) {
  chrome.pageAction.show(tab.id || tab);
  _currentTabId = tab.id || tab;
}

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(handleTabEvents);
chrome.tabs.onSelectionChanged.addListener(handleTabEvents);
chrome.tabs.onUpdated.addListener(handleTabEvents);
chrome.tabs.getSelected(null, handleTabEvents);

// Called when the user clicks on the page action
chrome.pageAction.onClicked.addListener(function(tab) {
    _later.add(tab.url);
});

window.addEventListener( 'load', function() {
  init();
});
var _later;
var _currentTabId;

this.init = function() {
  _later = new Later('4c5T9V85ga3c6J4a5adbyWoL25p0ypr2', this.setPopup, this.clearPopup);
}

this.setPopup = function() {
  chrome.pageAction.setPopup({
      'tabId':     _currentTabId,
      'popup':    'pages/popup.html'
  });
}

this.clearPopup = function() {
  chrome.pageAction.setPopup({
      'tabId':     _currentTabId,
      'popup':    ''
  });
}

this.tabChangedHandler = function(tab) {
  chrome.pageAction.show(tab.id || tab);
  _currentTabId = tab.id || tab;
}

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(tabChangedHandler);
chrome.tabs.onSelectionChanged.addListener(tabChangedHandler);
chrome.tabs.onUpdated.addListener(tabChangedHandler);
chrome.tabs.getSelected(null, tabChangedHandler);

// Called when the user clicks on the page action
chrome.pageAction.onClicked.addListener(function(tab) {
    _later.add(tab.url);
});

window.addEventListener( 'load', function() {
  init();
});
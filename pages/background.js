// Copyright (c) 2011 Craftify. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var api_key = '4c5T9V85ga3c6J4a5adbyWoL25p0ypr2'
var later = new Later();

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Allways show our pageAction.
    chrome.pageAction.show(tabId);
});


// Called when the user clicks on the page action
chrome.pageAction.onClicked.addListener(function(tab) {
    later.add(tab.url);   
});
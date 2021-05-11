var bgmTabId = 0;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    bgmTabId = request.id;
});

// Runs whenever a tab is updated
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (bgmTabId != 0 && tabId != bgmTabId) {
        if ('audible' in changeInfo){
            if (changeInfo.audible) {
                chrome.tabs.update(bgmTabId, {muted: true});
            } else if (!changeInfo.audible) {
                chrome.tabs.update(bgmTabId, {muted: false});
            }
        }
    }
});

// Runs whenever a tab is closed 
chrome.tabs.onRemoved.addListener(function (tabId, changeInfo, tab) {
    chrome.tabs.query({}, function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            if (bgmTabId != 0 && tabId != bgmTabId && tabs[i].audible) { return; }
        }
        chrome.tabs.update(bgmTabId, {muted: false});
    });
});

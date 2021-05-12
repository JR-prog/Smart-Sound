var soundQueue = [];

// Runs whenever a tab is updated
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if ('audible' in changeInfo) {
        var soundQueueTabIndex = soundQueue.indexOf(tabId); // -1 if tab not in sound queue
        if (soundQueueTabIndex != -1) {
            soundQueue.splice(soundQueueTabIndex, 1);
        }
        if (changeInfo.audible) {
            soundQueue.push(tabId);
        }
        if (soundQueue.length > 1) {
            chrome.tabs.update(soundQueue[soundQueue.length - 2], {muted: true});
        }
        chrome.tabs.update(soundQueue[soundQueue.length - 1], {muted: false}); // Make sure last tab is playing
    }
});

// Runs whenever a tab is closed 
chrome.tabs.onRemoved.addListener(function (tabId, changeInfo, tab) {
    var soundQueueTabIndex = soundQueue.indexOf(tabId); // -1 if tab not in sound queue
    if (soundQueueTabIndex != -1) {
        soundQueue.splice(soundQueueTabIndex, 1);
        chrome.tabs.update(soundQueue[soundQueue.length - 1], {muted: false}); // Make sure last tab is playing
    }
});

// This only runs when the popup button is pressed
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // Send bgm tab id to background
    chrome.runtime.sendMessage({
        id: request
    });
});

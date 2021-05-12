document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('setMusic').addEventListener('click', onclick, false);
    function onclick() {
        // Sends the tab info to content
        chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, tabs[0].id);
        });

        // Adds the confirmation message when button is pressed
        const div = document.createElement('div');
        div.textContent = 'This is the BGM tab.';
        div.style.color = 'white';
        document.body.appendChild(div);
    };
}, false);
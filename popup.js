document.getElementById('saveCurrentTabButton').addEventListener('click', saveCurrentTab);

// print current tab url


// print all tabs url

// chrome.tabs.query({}, function(tabs) {
//     for (var i = 0; i < tabs.length; i++) {
//         console.log(tabs[i].url);
//     }
// });

function saveCurrentTab() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var key = tabs[0].title;
        var value = tabs[0].url;

        chrome.storage.sync.set({key:value}).then(() => {
            console.log("Value is set to " + value);
          });
          
          chrome.storage.sync.get(["key"]).then((result) => {
            console.log("Value currently is " + result.key);
          });
    });
}

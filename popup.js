document.getElementById('saveCurrentTabButton').addEventListener('click', saveCurrentTab);
document.getElementById("saveMultipleTabsButton").addEventListener('click', showTabList);

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

// Function to display all tabs of the current window in a checked form
function showTabList() {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
      var tabList = document.getElementById('tabList');
      tabList.innerHTML = '';
      for (var i = 0; i < tabs.length; i++) {
        var tabData = tabs[i];
        var tabItem = document.createElement('li');
        var tabCheckbox = document.createElement('input');
        tabCheckbox.type = 'checkbox';
        tabCheckbox.id = 'tabCheckbox' + i;
        var tabLink = document.createElement('a');
        tabLink.href = tabData.url;
        tabLink.textContent = tabData.title;
        tabItem.appendChild(tabCheckbox);
        tabItem.appendChild(tabLink);
        tabList.appendChild(tabItem);
      }
      // show the hidden button
        document.getElementById('saveCheckedTabsButton').style.display = 'block';
        // add event listener to the button
        document.getElementById('saveCheckedTabsButton').addEventListener('click', () => {
            // get all checkboxes
            var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
            // loop through all checkboxes
            for (var i = 0; i < checkboxes.length; i++) {
                // get the id of the checkbox
                var id = checkboxes[i].id;
                // get the number from the id
                var num = id.match(/\d+/)[0];
                // get the tab data from the tabs array
                var tabData = tabs[num];
                // save the tab data
                var key = tabData.title;
                var value = tabData.url;
                chrome.storage.sync.set({key:value}).then(() => {
                    console.log("Value is set to " + value);
                  });
                  
                  chrome.storage.sync.get(["key"]).then((result) => {
                    console.log("Value currently is " + result.key);
                  });
            }
    });
    });
}

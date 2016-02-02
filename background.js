// The onClicked callback function.
function onClickHandler(info, tab) {
    //console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));

    if (info.menuItemId == "citeTrove") {
        chrome.tabs.sendMessage(tab.id, {
            type : "cite"
        }, function(response) {
            console.log(chrome.runtime.lastError);
            console.log(response);
        });

        //console.log(tab.url);

        // console.log("START\n" + truncated_url + "\n" + today + "\n"
        //         + newspaper_title + "\n" + newspaper_issue + ", page "
        //         + newspaper_page + "\n[Quote]\n" + selection + "\n[Quote]\n")

        // document.execCommand('copy');
    } else {
        console.log('Not citeTrove');
    }

};

chrome.contextMenus.onClicked.addListener(onClickHandler);

//Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
    // Create one test item for each context type.
    chrome.contextMenus.create({
        "title" : "Cite Trove",
        "contexts" : [ "selection" ],
        "id" : "citeTrove",
        "documentUrlPatterns": ["http://trove.nla.gov.au/*"]
    });
});

// chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
//     console.log("tabId: " + JSON.stringify(tabId));
//     if (change.status == "complete") {
//         console.log(tab.url);
//     }
// });

// chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
//     console.log("tabId: " + JSON.stringify(tabId));
//     console.log("info: " + JSON.stringify(info));

// });

// chrome.pageAction.onClicked.addListener(function(tab) {
//     console.log(tab);
// });

chrome.runtime.onMessage.addListener(function(message) {
    if (message && message.type == "citation") {
        var input = document.createElement('textarea');
        document.body.appendChild(input);
        input.value = message.title;
        input.focus();
        input.select();
        document.execCommand('Copy');
        input.remove();
    }
});

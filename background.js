/**
 * @author Chris Willoughby
 */

/**
 *
 */
function citeTroveResponseHandler(response) {
    console.log('Response received');
    console.log('\t' + chrome.runtime.lastError);
    console.log('\t' + JSON.stringify(response));
}

/**
 * The callback function for the citeTrove menu item.
 */
function onClickHandler(info, tab) {
    //console.log("item " + info.menuItemId + " was clicked");
    // console.log("info: " + JSON.stringify(info));
    // console.log("tab: " + JSON.stringify(tab));

    if (info.menuItemId == "citeTrove") {
        console.log('citeTrove pressed');
        chrome.tabs.sendMessage(
            tab.id,
            {type : "cite"},
            citeTroveResponseHandler);

        //console.log(tab.url);

        // console.log("START\n" + truncated_url + "\n" + today + "\n"
        //         + newspaper_title + "\n" + newspaper_issue + ", page "
        //         + newspaper_page + "\n[Quote]\n" + selection + "\n[Quote]\n")

        // document.execCommand('copy');
    } else {
        console.log('Not citeTrove menu item');
    }

};

/**
 *
 */
chrome.contextMenus.onClicked.addListener(onClickHandler);

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

/**
 *
 */
function formatAndCopy(message) {
    chrome.storage.sync.get({
        troveFormat: '%A%n%C%n%T%n%I, page %P%n[Quote]%n%Q%n[Quote]%n'
      }, function(items) {
        var input = document.createElement('textarea');
        document.body.appendChild(input);
        input.value = formatCitation(items.troveFormat, message);
        input.focus();
        input.select();
        document.execCommand('Copy');
        input.remove();

      });


}

/**
 *
 */
chrome.runtime.onMessage.addListener(function(message) {
    if (message && message.type == "citation") {
        formatAndCopy(message);
    }
});

/**
 *
 */
// A rule to show the pageAction on the trove.nla.gov.au site.
var pageActionRule = {
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'trove.nla.gov.au', schemes: ['http', 'https'] }
        })
    ],
    actions: [ new chrome.declarativeContent.ShowPageAction() ]
};

/**
 *
 */
// When installed ...
chrome.runtime.onInstalled.addListener(function(details) {
    // ... set up context menu tree.
    chrome.contextMenus.create({
        "title" : "Cite Trove",
        "contexts" : [ "selection" ],
        "id" : "citeTrove",
        "documentUrlPatterns": ["http://trove.nla.gov.au/*"]
    });

    // ... and add a rule to show pageAction
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([pageActionRule]);
    });
});

// // Called when the url of a tab changes.
// function checkForValidUrl(tabId, changeInfo, tab) {
//     // If the tabs url includes "trove.nla.gov.au"...
//     if (tab.url.indexOf('trove.nla.gov.au') > -1) {
//         // ... show the page action.
//         chrome.pageAction.show(tabId);
//     }
// };

// // Listen for any changes to the URL of any tab.
// chrome.tabs.onUpdated.addListener(checkForValidUrl);


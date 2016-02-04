/**
 * @author Chris Willoughby
 */

/**
 * The message handler for the content script.
 * If the message is of type 'cite', parse the page and send
 * the results back to the background script.
 */
function processMessage(message, sender, sendResponse) {
    // console.log("message: " + JSON.stringify(message));
    // console.log("sender: " + JSON.stringify(sender));
    // console.log("sendResponse: " + JSON.stringify(sendResponse));

    if (message.type == "cite") {
        chrome.runtime.sendMessage(parsePage());
    } else {
        console.log('Unexpected message');
    }
}

/**
 * Add the processMessage handler as a listener for messages.
 */
chrome.runtime.onMessage.addListener(processMessage);

// chrome.runtime.onConnect.addListener(function(port) {
//     console.log("port: " + JSON.stringify(port));
// });

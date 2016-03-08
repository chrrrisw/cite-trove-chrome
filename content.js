/**
 * @author Chris Willoughby
 */

/**
 * The message handler for the content script.
 * If the message is of type 'cite', parse the page and send
 * the results back to the background script.
 */
function processMessage(message, sender, sendResponse) {
    if (message.type == "cite") {
        chrome.runtime.sendMessage(parsePage());
    } else {
        console.log("Unexpected message");
    }
}

/**
 * Add the processMessage handler as a listener for messages.
 */
chrome.runtime.onMessage.addListener(processMessage);

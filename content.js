/**
 * @author Chris Willoughby
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

chrome.runtime.onMessage.addListener(processMessage);

chrome.runtime.onConnect.addListener(function(port) {
    console.log("port: " + JSON.stringify(port));
});

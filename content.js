/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @author Chris Willoughby
 */

"use strict";

function onError(error) {
    console.error(`Error: ${error}`);
}

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

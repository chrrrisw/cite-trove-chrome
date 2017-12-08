/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @author Chris Willoughby
 */

function parsePage() {

    // Get the selected text
    var selection = window.getSelection().toString();

    // Get the current date and time
    var today = new Date().toString();

    // Get the URL
    var url = location.href;

    var url_element = document.querySelector('meta[property="og:url"]');
    var persistent_url = url_element && url_element.getAttribute("content");

    var title_element = document.querySelector("[ref=ndp\\:titleSelector]");
    var newspaper_title = title_element && title_element.innerHTML.trim();

    var issue_element = document.querySelector("[ref=ndp\\:issueSelector]");
    var newspaper_issue = issue_element && issue_element.innerHTML.trim();

    var pages_element = document.querySelector("[ref=ndp\\:pageSelector]");
    var newspaper_page_number = pages_element && pages_element.innerHTML.trim();

    var article_element = document.querySelector("[ref=ndp\\:articleSelector]");
    var article_title = article_element && article_element.innerHTML.trim();

    // var element = document.querySelector('meta[property="og:title"]');
    // var content = element && element.getAttribute("content");
    // var element = document.querySelector('meta[property="og:type"]');
    // var content = element && element.getAttribute("content");
    // var element = document.querySelector('meta[property="og:description"]');
    // var content = element && element.getAttribute("content");
    // var element = document.querySelector('meta[property="og:image"]');
    // var content = element && element.getAttribute("content");
    // var element = document.querySelector('meta[property="og:site_name"]');
    // var content = element && element.getAttribute("content");

    var news_page_url;
    var apa_ref;
    var mla_ref;
    var harvard_ref;
    var wiki_ref;

    var dt_elements = document.getElementsByTagName("dt");
    var dd_element;
    var dt_text;
    for (var index = 0; index < dt_elements.length; index++) {
        dd_element = dt_elements[index].nextElementSibling;
        dt_text = dt_elements[index].innerHTML.trim();
        dd_text = dd_element.innerHTML.trim();
        // console.log(dt_text);
        // console.log(dd_text);

        if (dt_text == "Article identifier") {
        } else if (dt_text == "Page identifier") {
            // Currently returns HTML <a> tag.
            // news_page_url = dd_text;
            news_page_url = dd_element.firstElementChild.getAttribute("href");
        } else if (dt_text == "APA citation") {
            apa_ref = dd_text;
        } else if (dt_text == "MLA citation") {
            mla_ref = dd_text;
        } else if (dt_text == "Harvard/Australian citation") {
            harvard_ref = dd_text;
        } else if (dt_text == "Wikipedia citation") {
            wiki_ref = dd_text;
        }

    }

    // console.log("Title: " + newspaper_title);
    // console.log("Issue: " + newspaper_issue);
    // console.log("Page: " + newspaper_page_number);
    // console.log("Article: " + article_title);

    // Adjust the results.
    if (newspaper_page_number) {
        newspaper_page_number = newspaper_page_number.replace("Page ", "");
    }

    // var href_re = /href=[""](.*)[""]/i;
    // if (news_page_url) {
    //     var href_match = news_page_url.match(href_re);
    //     if (href_match) {
    //         news_page_url = href_match[1];
    //     }
    // }

    // Return the information gathered
    return {
        "type": "citation",
        "url": url,
        "persistent_url": persistent_url,
        "today": today,
        "title": newspaper_title,
        "issue": newspaper_issue,
        "page_number": newspaper_page_number,
        "article_title": article_title,
        "news_page_url": news_page_url || "",
        "apa_ref": apa_ref || "",
        "mla_ref": mla_ref || "",
        "harvard_ref": harvard_ref || "",
        "wiki_ref": wiki_ref || "",
        "selection": selection
    };

}

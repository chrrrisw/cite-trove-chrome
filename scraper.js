/**
 * @author Chris Willoughby
 */

function parsePage() {

    // Get the selected text
    var selection = window.getSelection().toString();

    // Get the current date and time
    var today = new Date().toString();

    // Get the URL
    var page_url = location.href;

    var url_element = document.querySelector('meta[property="og:url"]');
    var persistent_url = url_element && url_element.getAttribute("content");
    if (persistent_url) {
        // We have the new page

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
    } else {
        // We have the old page
    }

    // Get the newspaper title
    // First we try to get an element with the class "box title",
    // if that fails, we're not on the original newspaper site.
    // There are two possibilities: that we're somewhere else on the
    // Trove site, or the newspaper site has been updated.
    var newspaper_title = "";
    var title_element = document.getElementsByClassName("box title")[0];
    if (title_element != null) {
        var title_heading = title_element.getElementsByTagName("h1")[0];
        if (title_heading != null) {
            newspaper_title = title_heading.innerHTML.trim();
        }
    } else {
        // Let's see if we're on the updated site.
        console.log('New Title interface');
        title_element = document.querySelectorAll("[ref=ndp\\:titleSelector]")[0];
        if (title_element != null) {
            console.log(title_element);
            newspaper_title = title_element.innerHTML.trim();
        }
    }
    console.log('Title: ' + newspaper_title);

    // Get the issue
    var newspaper_issue = "";
    var issue_element = document.getElementsByClassName("box issue")[0];
    if (issue_element != null) {
        var issue_strong = issue_element.getElementsByTagName("strong")[0];
        if (issue_strong != null) {
            newspaper_issue = issue_strong.innerHTML.trim();
        }
    } else {
        console.log('New Issue interface');
        issue_element = document.querySelectorAll("[ref=ndp\\:issueSelector]")[0];
        if (issue_element != null) {
            console.log(issue_element);
            newspaper_issue = issue_element.innerHTML.trim();
        }

    }
    console.log('Issue: ' + newspaper_issue);

    // And the page
    var newspaper_page = "";
    var pages_element = document.getElementsByClassName("box pages")[0];
    if (pages_element != null) {
        var all_options = pages_element.getElementsByTagName("option");
        if (all_options != null) {
            for ( var index = 0; index < all_options.length; index++) {
                if (all_options[index].selected) {
                    newspaper_page = all_options[index].innerHTML.trim();
                }
            }
        }
    } else {
        console.log('New Page interface');
        var pages_element = document.querySelectorAll("[ref=ndp\\:pageSelector]")[0];
        if (pages_element != null) {
            console.log(pages_element);
            newspaper_page = pages_element.innerHTML.trim();
        }
    }
    console.log('Page: ' + newspaper_page);

    // Return the information gathered
    return {
        'type': 'citation',
        'url': page_url,
        'persistent_url': persistent_url,
        'today': today,
        'title': newspaper_title,
        'issue': newspaper_issue,
        'page': newspaper_page,
        'article_title': undefined,
        'selection': selection
    };

}

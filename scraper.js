/**
 * @author Chris Willoughby
 */

function parsePage() {

    // Get the selected text
    var selection = window.getSelection().toString();

    // Get the current date and time
    var today = new Date().toString();

    // Get the URL
    var article_url = location.href;

    // Get the newspaper title
    var newspaper_title = "Unknown";
    var title_box = document.getElementsByClassName("box title")[0];
    if (title_box != null) {
        var title_heading = title_box.getElementsByTagName("h1")[0];
        if (title_heading != null) {
            newspaper_title = title_heading.innerHTML;
        }
    } else {
        console.log('New Title interface');
        var title_selector = document.querySelectorAll("[ref=ndp\\:titleSelector]")[0];
        console.log(title_selector);
        if (title_selector != null) {
            newspaper_title = title_selector.innerHTML;
        }
    }
    console.log('Title: ' + newspaper_title);

    // Get the issue
    var newspaper_issue = "Unknown";
    var issue_box = document.getElementsByClassName("box issue")[0];
    if (issue_box != null) {
        var issue_strong = issue_box.getElementsByTagName("strong")[0];
        if (issue_strong != null) {
            newspaper_issue = issue_strong.innerHTML;
        }
    } else {
        console.log('New Issue interface');

    }
    console.log('Issue: ' + newspaper_issue);

    // And the page
    var newspaper_page = "Unknown";
    var pages_box = document.getElementsByClassName("box pages")[0];
    if (pages_box != null) {
        var all_options = pages_box.getElementsByTagName("option");
        if (all_options != null) {
            for ( var index = 0; index < all_options.length; index++) {
                if (all_options[index].selected) {
                    newspaper_page = all_options[index].innerHTML;
                }
            }
        }
    } else {
        console.log('New Page interface');
        var date_selector = document.querySelectorAll("[ref=ndp\\: pageSelector]")[0];

    }
    console.log('Page: ' + newspaper_page);

    // Return the information gathered
    return {
        'type': 'citation',
        'url': article_url,
        'today': today,
        'title': newspaper_title,
        'issue': newspaper_issue,
        'page': newspaper_page,
        'selection': selection
    };

}

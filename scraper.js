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
    // First we try to get an element with the class "box title",
    // if that fails, we're not on the original newspaper site.
    // There are two possibilities: that we're somewhere else on the
    // Trove site, or the newspaper site has been updated.
    var newspaper_title = "";
    var title_element = document.getElementsByClassName("box title")[0];
    if (title_element != null) {
        var title_heading = title_element.getElementsByTagName("h1")[0];
        if (title_heading != null) {
            newspaper_title = title_heading.innerHTML;
        }
    } else {
        // Let's see if we're on the updated site.
        var title_element = document.querySelectorAll("[ref=ndp\\:titleSelector]")[0];
        if (title_element != null) {
            console.log(title_element);
            newspaper_title = title_element.innerHTML;
        }
    }
    console.log('Title: ' + newspaper_title);

    // Get the issue
    var newspaper_issue = "";
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
    var newspaper_page = "";
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
        var date_selector = document.querySelectorAll("[ref=ndp\\:pageSelector]")[0];

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

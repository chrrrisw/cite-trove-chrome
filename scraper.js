/**
 * @author Chris Willoughby
 */

function parsePage() {

    var title_element;
    var newspaper_title;

    var issue_element;
    var newspaper_issue;

    var pages_element;
    var newspaper_page;

    var article_element;
    var article_title;

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
        console.log('New interface');

        title_element = document.querySelector("[ref=ndp\\:titleSelector]");
        newspaper_title = title_element && title_element.innerHTML.trim();

        issue_element = document.querySelector("[ref=ndp\\:issueSelector]");
        newspaper_issue = issue_element && issue_element.innerHTML.trim();

        pages_element = document.querySelector("[ref=ndp\\:pageSelector]");
        newspaper_page = pages_element && pages_element.innerHTML.trim();

        article_element = document.querySelector("[ref=ndp\\:articleSelector]");
        article_title = article_element && article_element.innerHTML.trim();

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
        console.log('Old interface');

        title_element = document.getElementsByClassName("box title")[0];
        if (title_element) {
            var title_heading = title_element.getElementsByTagName("h1")[0];
            if (title_heading) {
                newspaper_title = title_heading.innerHTML.trim();
            }
        }

        issue_element = document.getElementsByClassName("box issue")[0];
        if (issue_element) {
            var issue_strong = issue_element.getElementsByTagName("strong")[0];
            if (issue_strong) {
                newspaper_issue = issue_strong.innerHTML.trim();
            }
        }

        pages_element = document.getElementsByClassName("box pages")[0];
        if (pages_element) {
            var all_options = pages_element.getElementsByTagName("option");
            if (all_options) {
                for ( var index = 0; index < all_options.length; index++) {
                    if (all_options[index].selected) {
                        newspaper_page = all_options[index].innerHTML.trim();
                    }
                }
            }
        }

        // <meta name='newsarticle_headline' content='WILLOUGHBY.'/>
        article_element = document.querySelector('meta[name="newsarticle_headline"]');
        article_title = article_element && article_element.getAttribute("content").trim();
    }

    console.log('Title: ' + newspaper_title);
    console.log('Issue: ' + newspaper_issue);
    console.log('Page: ' + newspaper_page);
    console.log('Article: ' + article_title);

    // Return the information gathered
    return {
        'type': 'citation',
        'url': page_url,
        'persistent_url': persistent_url,
        'today': today,
        'title': newspaper_title,
        'issue': newspaper_issue,
        'page': newspaper_page,
        'article_title': article_title,
        'selection': selection
    };

}

/**
 * @author Chris Willoughby
 */

function parsePage() {

    var title_element;
    var newspaper_title;

    var issue_element;
    var newspaper_issue;

    var pages_element;
    var newspaper_page_number;

    var article_element;
    var article_title;

    var news_page_url;
    var apa_ref;
    var mla_ref;
    var harvard_ref;
    var wiki_ref;

    // Get the selected text
    var selection = window.getSelection().toString();

    // Get the current date and time
    var today = new Date().toString();

    // Get the URL
    var url = location.href;

    var url_element = document.querySelector('meta[property="og:url"]');
    var persistent_url = url_element && url_element.getAttribute("content");

    if (persistent_url) {
        // We have the new page
        // console.log('New interface');

        title_element = document.querySelector("[ref=ndp\\:titleSelector]");
        newspaper_title = title_element && title_element.innerHTML.trim();

        issue_element = document.querySelector("[ref=ndp\\:issueSelector]");
        newspaper_issue = issue_element && issue_element.innerHTML.trim();

        pages_element = document.querySelector("[ref=ndp\\:pageSelector]");
        newspaper_page_number = pages_element && pages_element.innerHTML.trim();

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

        var dt_elements = document.getElementsByTagName("dt");
        var dd_element;
        var dt_text;
        for (var index = 0; index < dt_elements.length; index++) {
            dd_element = dt_elements[index].nextElementSibling;
            dt_text = dt_elements[index].innerHTML.trim();
            dd_text = dd_element.innerHTML.trim()
            // console.log(dt_text);
            // console.log(dd_text);

            if (dt_text == 'Article identifier') {
            } else if (dt_text == 'Page identifier') {
                // Currently returns HTML <a> tag.
                news_page_url = dd_text;
            } else if (dt_text == 'APA citation') {
                apa_ref = dd_text;
            } else if (dt_text == 'MLA citation') {
                mla_ref = dd_text;
            } else if (dt_text == 'Harvard/Australian citation') {
                harvard_ref = dd_text;
            } else if (dt_text == 'Wikipedia citation') {
                wiki_ref = dd_text;
            }

        }

    } else {

        // We have the old page
        // console.log('Old interface');

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
                        newspaper_page_number = all_options[index].innerHTML.trim();
                    }
                }
            }
        }

        // <meta name='newsarticle_headline' content='WILLOUGHBY.'/>
        article_element = document.querySelector('meta[name="newsarticle_headline"]');
        article_title = article_element && article_element.getAttribute("content").trim();
    }

    // console.log('Title: ' + newspaper_title);
    // console.log('Issue: ' + newspaper_issue);
    // console.log('Page: ' + newspaper_page_number);
    // console.log('Article: ' + article_title);

    // Return the information gathered
    return {
        'type': 'citation',
        'url': url,
        'persistent_url': persistent_url,
        'today': today,
        'title': newspaper_title,
        'issue': newspaper_issue,
        'page_number': newspaper_page_number,
        'article_title': article_title,
        'news_page_url': news_page_url,
        'apa_ref': apa_ref,
        'mla_ref': mla_ref,
        'harvard_ref': harvard_ref,
        'wiki_ref': wiki_ref,
        'selection': selection
    };

}

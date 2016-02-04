/**
 * @author Chris Willoughby
 *
 * Runs as part of the background process and formats the fields as
 * per the format specified.
 */

var page_regexp = new RegExp("http://trove.nla.gov.au/ndp/del/article/\\d+");

function formatCitation(format, fields) {
    var copyText = format.replace(/%./g, function(match, pattern, offset, string) {

        // %n - Start a New line
        if (match == "%n")
            return "\n";

        // %U - Article URL
        else if (match == "%U")
            return fields.url;

        // %u - Shortened Article URL
        else if (match == "%u") {

            var page_match = fields.url.match(page_regexp);
            if (page_match == null)
                return fields.url;

            if (page_match.length == 0)
                return fields.url;
            else
                return page_match[0];

        }

        // %A - Persistent Article URL (preferred)
        else if (match == "%A") {
            var page_match = fields.url.match(page_regexp);
            if (page_match == null)
                return fields.url;

            if (page_match.length == 0)
                return fields.url;
            else
                return "http://nla.gov.au/nla.news-article" + page_match[0].match("\\d+");

        }

        // %C - Current date and time
        else if (match == "%C")
            return fields.today;

        // %T - Newspaper Title
        else if (match == "%T")
            return fields.title;

        // %I - Newspaper Issue
        else if (match == "%I")
            return fields.issue;

        // %P - Article Page number
        else if (match == "%P")
            return fields.page;

        // %Q - Selected OCR Text
        else if (match == "%Q")
            return fields.selection;

        // Everything else is returned unchanged.
        else
            return match;
    });

    return copyText;
}

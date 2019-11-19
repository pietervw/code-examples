var url = 'https://localhost:xxx/api/';

var doneTitles = [];
var speedMultiplier = 50;
var scroller = setInterval(scroller, 20 * speedMultiplier);
var count = 1;
var currentItem;
var toggleScroll = false;
var itemsOnServer = [];

// Ask my server which items it already has, to avoid duplication during crawling
$.post(url + 'sitename/GetCollection', null,
    function (data) {
        if (data.success) {
            itemsOnServer = data.obj;
            swallow();
        } else {
            alert('no items found on server');
        }
    });

// The site being crawled uses a jQuery scroller plugin to lazy load content
function scroller() {
    $("html, body").animate({ scrollTop: $(document).height() }, 100);
}

// Function to process an item
function swallow() {
    var itemsLeft = $('.cb-meta:not([data-done*="xsuccess"])');
    if (!itemsLeft || itemsLeft.length == 0) {
        $("html, body").animate({ scrollTop: 0 }, 100);
        var timeout = setTimeout(swallow, 10 * speedMultiplier);
    } else {

        var item = itemsLeft.first();

        // Remember this item
        currentItem = item;
        var title = $(item).find('a').text();

        //Check if item has been done already, if not, process it
        var found = jQuery.inArray(title, doneTitles);
        if (found >= 0) {
            goToNextItem('Submitted previously ' + count + '. ' + title);
        } else {

            doneTitles.push(title);

            if (title.length > 0) {
                var qualityString = $(item).find('img.sitename_data').attr('src');
                if (qualityString && qualityString.length > 1) {
                    var index = qualityString.indexOf('stars.png');
                    var quality = qualityString.substring(index - 1, index);

                    var imgUrl = $(item).parent().find('.sitename_related_post').css('background-image')
                        ? $(item).parent().find('.sitename_related_post').css('background-image').replace('url(', '')
                            .replace(')', '').replace(/\"/gi, "")
                        : '';

                    var model =
                    {
                        MgTitle: title,
                        MgQuality: quality,
                        MgContent: $(item).find('.sitename_data').text(),
                        MgImageUrl: imgUrl,
                        MgReviewUrl: $(item).find('a').attr('href')
                    }

                    // If this is a new item - post it to my server
                    if (!isOnServer(model)) {
                        $.post(url + 'sitename/InsertOrUpdate',
                            model,
                            function (data) {
                                if (data.success) {
                                    goToNextItem('SUBMITTED: ' + count + '.  ' + data.obj.MgTitle);
                                } else {
                                    goToNextItem('Error: ' + data.msg);
                                }
                            });
                    } else {
                        goToNextItem('Already exists: ' + count + '.  ' + model.MgTitle)
                    }
                } else {
                    goToNextItem('Invalid item ' + count);

                };
            } else {
                goToNextItem('Invalid title ' + count);
            };
        }
    }
}

// Function to go to the next item on the page
function goToNextItem(logText) {
    console.log(logText);
    currentItem.attr('data-done', 'xsuccess');
    speedMultiplier = speedMultiplier - (count / 10);
    count++;
    speedMultiplier = speedMultiplier + (count / 10);
    var timeout = setTimeout(swallow, 0.01 * speedMultiplier);
}

// Function to compare a local model with the results from the server
function isOnServer(model) {
    var obj = itemsOnServer.find(o => o.MgTitle === model.MgTitle
        && o.MgContent == model.MgContent
        && o.MgImageUrl == model.MgImageUrl
        && o.MgReviewUrl == model.MgReviewUrl
        && o.MgQuality == model.MgQuality
    );
    return obj != null;
}






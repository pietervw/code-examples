// Copy the below code into a bookmark on your bookmarks bar in Chrome
// Remove the comments and line spaces
javascript: (function () {
    var change = 1;
    var ticker = function () {
        var urlParams;
        urlParams = [];
        var match,
            pl = /\+/g,
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query = window.location.search.substring(1);
        this.k = 1;
        while (match = search.exec(query)) {
            urlParams.push({
                order: k,
                key: decode(match[1]),
                value: decode(match[2])
            });
            this.k++;
        }
        for (let index = 0; index < urlParams.length; index++) {
            const element = urlParams[index];
            if(!isNaN(element.value))
            {
            var currentUrl = window.location.href;
            var newVal = parseInt(element.value) + change;
            var newUrl = currentUrl.replace(element.key + '=' + element.value, element.key + '=' + newVal);
            self.location = newUrl;
            break;
            }
        }
    };
    ticker();
})();

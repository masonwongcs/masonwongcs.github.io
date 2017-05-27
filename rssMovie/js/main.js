$(document).ready(function() {
    $(".progress-bar").css("opacity", "1");
    $(".progress").css("opacity", "1");
    // var url = "https%3A%2F%2Fmyrss.nu%2Fdrama";
    var url = "https://myrss.nu/drama";
    getContent(url);
    putHomeBtn(url);
    bindHomeBtn();
});

// $(document).on("", "click", function(e)){}
function bindClickEvent() {
    $(".content .items").click(function(e) {
        $(".overlay").fadeIn();
        $(".progress-bar").css("opacity", "1");
        $(".progress").css("opacity", "1");
        $("body").addClass("disable-scrolling");
        // increaseProgress();
        e.preventDefault();
        console.log("clicked");
        var url = $(this).find("a").attr("href");

        if(url.startsWith("http://hdfree.se")){
            window.location = url;
        } else{
            getContent(url);
        }
        bindBackBtn();
    });
}

function putBackBtn(prevUrl) {
    var prevUrl = prevUrl;
    $(".backBtn").attr("href", prevUrl);
}

function putHomeBtn(prevUrl) {
    var prevUrl = prevUrl;
    $(".homeBtn").attr("href", prevUrl);
}

function bindBackBtn() {
    $(".backBtn").click(function(e) {
        e.preventDefault();
        var prevUrl = $(this).attr("href");
        getContent(prevUrl);
    });
}

function bindHomeBtn() {
    $(".homeBtn").click(function(e) {
        e.preventDefault();
        var prevUrl = $(this).attr("href");
        getContent(prevUrl);
    });
}

function getContent(url) {
    // Compile content
    var source = $("#content-template").html();
    var template = Handlebars.compile(source);

    // find some demo xml - DuckDuckGo is great for this
    var xmlSource = url;

    // build the yql query. Could be just a string - I think join makes easier reading
    var yqlURL = [
        "http://query.yahooapis.com/v1/public/yql",
        "?q=" + encodeURIComponent("select * from xml where url='" + xmlSource + "'"),
        "&format=xml&callback=?"
    ].join("");

    console.log(yqlURL);

    // var urlPrefix = "https://api.rss2json.com/v1/api.json?=" + url + "&api_key=xm1lxzp3eidynkzud6jmqlowtahpvw2prqwhehnz";
    // var urlPrefix = "https://api.rss2json.com/v1/api.json";

    $.ajax({
        xhr: function() {
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener("progress", function(evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    console.log(percentComplete);
                    $('.progress').css({
                        width: percentComplete * 100 + '%'
                    });
                    if (percentComplete === 1) {
                        $('.progress').addClass('hide');
                    }
                }
            }, false);
            xhr.addEventListener("progress", function(evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    console.log(percentComplete);
                    $('.progress').css({
                        width: percentComplete * 100 + '%'
                    });
                }
            }, false);
            return xhr;
        },
        url: yqlURL,
        dataType: "jsonp",
        type: 'GET',
        async: true

        // data: {
        //     "rss_url": url,
        //     "api_key": "xm1lxzp3eidynkzud6jmqlowtahpvw2prqwhehnz"
        // }
    }).done(function(data) {

        var x2js = new X2JS();
        var jsonObj = x2js.xml_str2json(data.results);

        console.log(jsonObj);

        // data.items[1].content.replace("src", "data-echo");
        // <img src="img/placeholder.svg" data-echo="{{imgUrl}}" />
        echo.init();
        $(".overlay").fadeOut();
        $("body").removeClass("disable-scrolling");

        $(".progress").css("width", "100%");
        $(".progress-bar").css("opacity", "0");
        $(".progress").css("opacity", "0");

        var html = template(jsonObj.rss.channel);
        $(".content").html(html);
        bindClickEvent();
        nextPrevBtn();
        replaceAmp();
    });
}

function replaceAmp() {
    $(".content .items a").each(function() {
        var newUrl = $(this).attr("href").replace('&amp;', '&');
        $(this).attr("href", newUrl);
    });
}

function increaseProgress() {
    var progress = 0;
    var progressInterval = setInterval(function() {
        progress += 1;
        if (progress == 100) {
            clearInterval(progressInterval)
        }
        $(".progress").css("width", progress + "%");
        console.log(progress);
    }, 100);
}

function nextPrevBtn() {
    $(".items").each(function() {
        if ($(this).find("span").text().startsWith("Page")) {
            $(this).addClass("navigate");
        }
    });
    setPrevNext();
}

function setPrevNext() {
    var nav = [];
    $(".navigate").each(function() {
        var spanText = $(this).find("span").text();
        var lastChar = spanText.substr(spanText.length - 1);
        nav.push(lastChar);
    });

    if (nav.length == 1) {
        $('.navigate').addClass("next");
    } else {
        if (nav[0] > nav[1]) {
            $('.navigate').first().addClass("next");
            $('.navigate').last().addClass("prev");
        } else {
            $('.navigate').first().addClass("prev");
            $('.navigate').last().addClass("next");
        }

    }
}

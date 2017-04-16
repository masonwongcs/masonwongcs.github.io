$(document).ready(function() {

    $('#background-svg').fadeIn();

    new Vivus('hamburger', { duration: 100 }, initParallax());
    new Vivus('background-svg', { duration: 200 }, initParallax());

    $(".filter-wrapper").stick_in_parent();

    $("a[title]").parent("div").remove();

    $(".hamburger").click(function(e) {
        e.preventDefault();
        $(".main-wrapper").toggleClass("drawer-open");
        $(".logo").toggleClass("logo-float");
        $(".close").fadeToggle(160);
        $(".nav-wrapper").fadeToggle(160);
        $(".hamburger-icon").toggleClass("transparent");
        $("body").toggleClass("disable-scrolling");
        $(".bg").toggleClass("transparent");
    });

    $(".hamburger-icon").hover(function() {
        $(".hamburger-icon").find(".top").toggleClass("hamburger-expand-up");
        $(".hamburger-icon").find(".bottom").toggleClass("hamburger-expand-down");
    });

    $(".nav-wrapper .nav-item").click(function() {
        $(this).addClass("active");
        $(".nav-wrapper .nav-item").not($(this)).removeClass("active");
        var selected = $(this).find("a").attr("class");
        $(".main-wrapper").addClass("nav-open");
        if (!$(".drawer-content").is(':visible')) {
            $(".drawer-content").fadeIn(100);
            $(".drawer-content").removeClass("transparent");
        };
        $("#" + selected).parent(".drawer-wrapper").show();
        $(":not(#" + selected + ")").parent(".drawer-wrapper").hide();
        if (selected == "skills") {
            for (var i = 1; i <= $(".progress-bar progress").length; i++) {
                setTimeout('$(".skills li:nth-child(' + i + ') .progress-bar progress").addClass("show-progress")', i * 200);
            }
            for (var i = 1; i <= $(".skill-set li").length; i++) {
                setTimeout('$(".skill-set li:nth-child(' + i + ')").addClass("show")', i * 200);
            }
        } else {
            $(".progress-bar progress").removeClass("show-progress");
            $(".skill-set li").removeClass("show");
        }
        if (selected == "contact") {
            setTimeout('$(".contact .location iframe").addClass("show")', 1200);
            for (var i = 1; i <= $(".contact li").length; i++) {
                setTimeout('$(".contact li:nth-child(' + i + ')").addClass("show")', i * 200);
            }
        } else {
            $(".contact li").removeClass("show");
            $(".contact .location iframe").removeClass("show");
        }
        if (selected == "about") {
            setTimeout('$(".about .profile-pic").addClass("show")', 600);
            setTimeout('$(".about .profile .name").addClass("show")', 800);
            setTimeout('$(".about .profile .designation").addClass("show")', 1000);
        } else {
            $(".about .profile-pic").removeClass("show");
            $(".about .profile .name").removeClass("show");
            $(".about .profile .designation").removeClass("show");
        }
        if (selected == "experience") {
            for (var i = 1; i <= $("ul.experience li").length; i++) {
                setTimeout('$("ul.experience li:nth-child(' + i + ')").addClass("expand")', i * 200);
            }
        } else {
            $("ul.experience li").removeClass("expand");
        }
        $("html, body").addClass("bg-color-paused");
        $(".drawer-content").addClass("bg-color-paused");
        setTimeout('$(".drawer-content").removeClass("perspective")', 500);
    });

    $(".filter-item:not(:last-child)").click(function(e) {
        $(this).addClass("active");
        $(".filter-item").not($(this)).removeClass("active");
        var filterItem = $(this).find("a").text();
        if (filterItem == "Design") {
            $('.content[data-type="design"]').removeClass("hide");
            $('.content:not([data-type="design"])').addClass("hide");
        } else if (filterItem == "Photography") {
            $('.content[data-type="photography"]').removeClass("hide");
            $('.content:not([data-type="photography"])').addClass("hide");
        } else {
            $('.content[data-type="design"]').removeClass("hide");
            $('.content[data-type="photography"]').removeClass("hide");
        }
    });

    $(".close").click(function(e) {
        e.preventDefault();
        $(".main-wrapper").removeClass("drawer-open");
        $(".logo").removeClass("logo-float");
        $(".close").fadeOut(160);
        $(".nav-wrapper").fadeOut(160);
        $(".nav-wrapper .nav-item").removeClass("active");
        $(".hamburger-icon").removeClass("transparent");
        $(".main-wrapper").removeClass("nav-open");
        $("body").removeClass("disable-scrolling");
        $(".drawer-content").fadeOut();
        $(".drawer-content").addClass("perspective")

        $(".progress-bar progress").removeClass("show-progress");
        $(".skill-set li").removeClass("show");

        $("html, body").removeClass("bg-color-paused");
        setTimeout('$(".bg").removeClass("transparent")', 1000);
    });

    // $(".content").hover(function(){
    // 	$(this).find("figure figcaption").fadeToggle();
    // });

    $(".content").click(function() {
        var img = $(this).find("img");
        var content = "";
        if (img.length > 1) {
            img.each(function() {
                var imgAddr = $(this).attr("src");
                var imgCaption = $(this).siblings("figcaption").html();
                var imgDesc = $(this).siblings(".desc-text").html();

                var images = '<figure><img src="' + imgAddr + '"/></figure>';
                var title = '<h3>' + imgCaption + '</h3>';
                var description = '<p class="desc-text">' + imgDesc + '</p>';
                var string = images + title + description;
                content += string;
            });
        } else {
            var imgAddr = img.attr("src");
            var imgCaption = $(this).find("figcaption").html();
            var imgDesc = $(this).find(".desc-text").html();

            var images = '<figure><img src="' + imgAddr + '"/></figure>';
            var title = '<h3>' + imgCaption + '</h3>';
            var description = '<p class="desc-text">' + imgDesc + '</p>';
            content = images + title + description;
        }

        $.sweetModal({
            content: content
        });
    });

    $(".filter-item:last-child").click(function(e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, 800);
    });

    $(".scroll-down").click(function(e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $(".main-content").offset().top
        }, 800);
    });

    $(".progress-bar progress").each(function() {
        $(this).val($(this).parent(".progress-bar").data("value"));
    });

    $(".content figure img").each(function(index) {

        // var canvas = $(this).siblings("canvas")[0];
        // var context = canvas.getContext('2d');

        // var img = new Image();
        // img.onload = function () {
        //     context.drawImage(img, 0, 0);

        //  //   	var colorThief = new ColorThief();
        // 	// var color = colorThief.getColor(context);
        // 	// $(this).closest(".content").css("background-color", "rgb(" + color + ")");

        // }

        // img.src = $(this).attr("src");

        // var dataURL = canvas.toDataURL();

        // console.log(dataURL);

        // // $(this).load(function(){
        // 	// var img = $(this);
        // 	// getDataUri(img, function(dataUri) {
        // 	    // Do whatever you'd like with the Data URI!
        // 	    // console.log(dataUri);
        // 	// });
        // 	// img.on("load", function(){
        // 	// 	var colorThief = new ColorThief();
        // 	// 	var color = colorThief.getColor(img);
        // 	// 	$(this).closest(".content").css("background-color", "rgb(" + color + ")");
        // 	// });
        // 	// img.onload = function (){

        // 	// }
        // // });
    });

    echo.init();

    function initParallax() {
        $(document).mousemove(function(e) {
            $('.laptop').parallax(-30, e);
            $('.mouse').parallax(60, e);
        });
    }

    
});

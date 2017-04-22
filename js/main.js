$(document).ready(function() {

  

 setTimeout(function(){
    TweenMax.staggerTo('.overlay', 0.6, {width: 0}, 0.3);
 }, 200);

 setTimeout(function(){
    $("body").removeClass("disable-scrolling");
 }, 1200);

    
    $('#background-svg').fadeIn();
    $('#page-not-found').fadeIn();

    if ($('body').hasClass('error')) {

        new Vivus('page-not-found', {
            duration: 100
        }, initParallax());

        function initParallax() {
            $(document).mousemove(function(e) {
                $('.first-four').parallax(-100, e);
                $('.o').parallax(-120, e);
                $('.last-four').parallax(-140, e);
            });
            for (var i = 1; i <= $(".error-wrapper").length; i++) {
                var j = 1;
                var max = $(".error-wrapper").length + 1;
                j += i;
                setTimeout('$(".error-wrapper:nth-child(' + j + ') .four-o-four-text").fadeIn()', i * 1000);
            }
            setTimeout('$("#go-home").addClass("error-animation")', 4000);
            setTimeout('$(".footer").fadeIn()', 4000);

        }

        $("#go-home").hover(function() {
            $(this).toggleClass("error-animation");
        });

        $("#go-home a").attr("href", getBaseUrl());

    } else {
        setTimeout(function(){
                    new Vivus('hamburger', { duration: 100 }, initParallax());
        new Vivus('background-svg', { duration: 200 }, initParallax());
        }, 600);


        Typed.new('.header .name', {
            strings: ["HI, I'm <span class=\"m\">M</span><span class=\"a\">A</span><span class=\"s\">S</span><span class=\"o\">O</span><span class=\"n\">N</span>"],
            typeSpeed: 50
        });
    }

    $('.header .name').click(function() {
        new Vivus('background-svg', { duration: 200 }, initParallax());
    });

    $('.header .name').hover(function() {
        $(this).toggleClass("animate");
    });

    $(".filter-wrapper").stick_in_parent();

    $("a[title]").parent("div").remove();

    $(".hamburger").click(function(e) {
        e.preventDefault();

        // $(".main-wrapper").toggleClass("drawer-open");

        // if($(this).hasClass("active")){
        // TweenMax.to($(".main-wrapper"),0.2,{y:'+=200px', transform: 'scale(1)'});
        // } else{
        TweenMax.to($(".main-wrapper"), 0.2, { transform: 'scale(0.93)', opacity: '0.4' });
        // }

        TweenMax.to($(".header"), 0.2, { borderRadius: '1.5rem' });

        $(".logo").toggleClass("logo-float");
        $(".close").fadeToggle(160);
        // $(".nav-wrapper").fadeToggle(160);

        $(".nav-wrapper").show();

        for (var i = 1; i <= $(".nav-list .nav-item").length; i++) {
            var j = i - 1;
            TweenMax.from($(".nav-list .nav-item")[j], 0.3, { y: "50px", delay: i * 0.03 });
            TweenMax.to($(".nav-list .nav-item")[j], 0.3, { opacity: '1', delay: i * 0.1 });
        }

        $(".hamburger-icon").toggleClass("transparent");
        $("body").toggleClass("disable-scrolling");
        // $(".bg").toggleClass("transparent");
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
            // $('.content[data-type="design"]').removeClass("hide");
            // $('.content:not([data-type="design"])').addClass("hide");

            TweenMax.to($('.content[data-type="design"]'), 0.3, { width: '50%' });
            TweenMax.to($('.content[data-type="design"] figcaption'), 0.3, { transform: 'scaleX(1)' });
            TweenMax.to($('.content:not([data-type="design"])'), 0.3, { width: '0' });
            TweenMax.to($('.content:not([data-type="design"]) figcaption'), 0.3, { transform: 'scaleX(0)' });

        } else if (filterItem == "Photography") {
            // $('.content[data-type="photography"]').removeClass("hide");
            // $('.content:not([data-type="photography"])').addClass("hide");

            TweenMax.to($('.content[data-type="photography"]'), 0.3, { width: '50%' });
            TweenMax.to($('.content[data-type="photography"] figcaption'), 0.3, { transform: 'scaleX(1)' });
            TweenMax.to($('.content:not([data-type="photography"])'), 0.3, { width: '0' });
            TweenMax.to($('.content:not([data-type="photography"]) figcaption'), 0.3, { transform: 'scaleX(0)' });
        } else {
            // $('.content[data-type="design"]').removeClass("hide");
            // $('.content[data-type="photography"]').removeClass("hide");

            TweenMax.to($('.content[data-type="design"]'), 0.3, { width: '50%' });
            TweenMax.to($('.content[data-type="design"] figcaption'), 0.3, { transform: 'scaleX(1)' });
            TweenMax.to($('.content[data-type="photography"]'), 0.3, { width: '50%' });
            TweenMax.to($('.content[data-type="photography"] figcaption'), 0.3, { transform: 'scaleX(1)' });
        }
    });

    $(".close").hover(function() {
        TweenMax.to($(this), 0.3, { rotation: 90 });
    }, function() {
        TweenMax.to($(this), 0.3, { rotation: -90 });
    });


    $(".close").click(function(e) {
        e.preventDefault();
        // $(".main-wrapper").removeClass("drawer-open");

        var removeStyle = function() {
            $(".main-wrapper").attr("style", "");
        }

        TweenMax.to($(".main-wrapper"), 0.2, { y: '+=10%', transform: 'scale(1)', onComplete: removeStyle });

        TweenMax.to($(".header"), 0.2, { borderRadius: '0' });

        $(".logo").removeClass("logo-float");
        $(".close").fadeOut(160);

        for (var i = 1; i <= $(".nav-list .nav-item").length; i++) {
            var j = i - 1;
            TweenMax.to($(".nav-list .nav-item")[j], 0.2, { opacity: '0', delay: i * 0.1 });
        }

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



    $(".content").hover(function() {
        TweenMax.to($(this).find("figure figcaption"), 0.2, { opacity: 1, y: '-20px' });
        // $(this).find("figure figcaption").fadeToggle();
    }, function() {
        TweenMax.to($(this).find("figure figcaption"), 0.2, { opacity: 0, y: '20px' });
    });

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

        //  //      var colorThief = new ColorThief();
        //  // var color = colorThief.getColor(context);
        //  // $(this).closest(".content").css("background-color", "rgb(" + color + ")");

        // }

        // img.src = $(this).attr("src");

        // var dataURL = canvas.toDataURL();

        // console.log(dataURL);

        // // $(this).load(function(){
        //  // var img = $(this);
        //  // getDataUri(img, function(dataUri) {
        //      // Do whatever you'd like with the Data URI!
        //      // console.log(dataUri);
        //  // });
        //  // img.on("load", function(){
        //  //  var colorThief = new ColorThief();
        //  //  var color = colorThief.getColor(img);
        //  //  $(this).closest(".content").css("background-color", "rgb(" + color + ")");
        //  // });
        //  // img.onload = function (){

        //  // }
        // // });
    });

    echo.init();

    function initParallax() {
        $(document).mousemove(function(e) {
            $('.laptop').parallax(-30, e);
            $('.mouse').parallax(60, e);
        });
    }

    function getBaseUrl() {
        var re = new RegExp(/^.*\//);
        return re.exec(window.location.href);
    }


});

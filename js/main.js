$(document).ready(function(){

	$(".filter-wrapper").stick_in_parent();

	$("a[title]").parent("div").remove();

	$(".hamburger").click(function(e){
		e.preventDefault();
		$(".main-wrapper").toggleClass("drawer-open");	
		$(".logo").toggleClass("logo-float");
		$(".close").fadeToggle(160);
		$(".nav-wrapper").fadeToggle(160);
		$(".hamburger-icon").toggleClass("transparent");
		$("body").toggleClass("disable-scrolling");
		$(".bg").toggleClass("transparent");
	});

	$(".hamburger-icon").hover(function(){
		$(".hamburger-icon").find(".top").toggleClass("hamburger-expand-up");
		$(".hamburger-icon").find(".bottom").toggleClass("hamburger-expand-down");
	});

	$(".nav-wrapper .nav-item").click(function(){
		$(this).addClass("active");
		$(".nav-wrapper .nav-item").not($(this)).removeClass("active");
		var selected = $(this).find("a").attr("class");
		$(".main-wrapper").addClass("nav-open");
		if(!$(".drawer-content").is(':visible')){
			$(".drawer-content").fadeIn(100);
			$(".drawer-content").removeClass("transparent");
		};
		$("#" + selected).parent(".drawer-wrapper").show();
		$(":not(#" + selected + ")").parent(".drawer-wrapper").hide();
		$("html, body").addClass("bg-color-paused");
		$(".drawer-content").addClass("bg-color-paused");
		setTimeout('$(".drawer-content").removeClass("perspective")', 500);
	});

	$(".filter-item:not(:last-child)").click(function(e){
		$(this).addClass("active");
		$(".filter-item").not($(this)).removeClass("active");
	});

	$(".close").click(function(e){
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
		$("html, body").removeClass("bg-color-paused");
		setTimeout('$(".bg").removeClass("transparent")', 1000);
	});

	$(".content").hover(function(){
		$(this).find("figure").toggleClass("hover");
	});

	$(".content").click(function(){
		var img = $(this).find("img");
		var content = "";
		if(img.length > 1){
			img.each(function(){
				var imgAddr = $(this).attr("src");
				var imgCaption = $(this).siblings("figcaption").html();
				var imgDesc = $(this).siblings(".desc-text").html();

				var images = '<figure><img src="' + imgAddr + '"/></figure>';
				var title = '<h3>' + imgCaption + '</h3>';
				var description = '<p class="desc-text">' + imgDesc + '</p>';
				var string = images + title + description;
				content += string; 
			});
		} else{
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

	$(".filter-item:last-child").click(function(e){
		e.preventDefault();
		$("html, body").animate({ 
			scrollTop: 0
		},800);
	});

	$(".scroll-down").click(function(e){
		e.preventDefault();
		$("html, body").animate({ 
			scrollTop: $(".main-content").offset().top 
		},800);
	});

	$(".progress-bar progress").each(function(){
		$(this).val($(this).parent(".progress-bar").data("value"));
	});

});
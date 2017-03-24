$(document).ready(function(){
	$("a[title]").parent("div").remove();

	$(".hamburger").click(function(e){
		e.preventDefault();
		$(".main-wrapper").toggleClass("drawer-open");	
		$(".logo").toggleClass("logo-float");
		$(".close").fadeToggle(160);
		$(".nav-wrapper").fadeToggle(160);
		$(".hamburger-icon").toggleClass("transparent");
		$("body").toggleClass("disable-scrolling");
	});

	$(".hamburger-icon").hover(function(){
		$(".hamburger-icon").find(".top").toggleClass("hamburger-expand-up");
		$(".hamburger-icon").find(".bottom").toggleClass("hamburger-expand-down");
	});

	// $(".nav-wrapper .nav-item").hover(function(){
	// 	$(this).toggleClass("nav-item-hovered");
	// });

	$(".close").click(function(e){
		e.preventDefault();
		$(".main-wrapper").removeClass("drawer-open");	
		$(".logo").removeClass("logo-float");
		$(".close").fadeOut(160);
		$(".nav-wrapper").fadeOut(160);
		$(".hamburger-icon").removeClass("transparent");
		$("body").removeClass("disable-scrolling");
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

	$(".scroll-down").click(function(e){
		e.preventDefault();
		$("html, body").animate({ 
			scrollTop: $(".main-content").offset().top 
		},800);
	});

});
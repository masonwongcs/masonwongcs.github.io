$(document).ready(function(){
	new QRCode(document.getElementById("qr"), {text: "1234567", width: 180, height: 180});
	$('.page-header').click(function(e){
		e.preventDefault();
		if($(this).hasClass("active")){
			TweenMax.to($('.page-header'), 0.3, { height: 50 });
			TweenMax.to($('.page-header .qr'), 0.3, { filter: "blur(3px)" });
			TweenMax.to($('.page-header'), 0.3, { rotationX: 0 });
			TweenMax.to($('.page-content'), 0.3, { rotationX: 0 });
			$(this).removeClass("active");
		} else{
			TweenMax.to($('.page-header'), 0.3, { height: 250});
			TweenMax.to($('.page-header .qr'), 0.3, { filter: "blur(0)" });
			TweenMax.to($('.page-header'), 0.3, { rotationX: -2 });
			TweenMax.to($('.page-content'), 0.3, { rotationX: 1 });
			setTimeout(function(){
				TweenMax.to($('.page-header'), 0.3, { rotationX: 0 });
				TweenMax.to($('.page-content'), 0.3, { rotationX: 0 });
			}, 300);
			
			$(this).addClass("active");
		}
		
	})
});
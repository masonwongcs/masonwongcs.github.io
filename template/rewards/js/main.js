$(document).ready(function(){
			
	$(".btn.next").click(function(){
		$(this).addClass("loading");
		var parent = $(this).parents(".reward-wrapper");
		
		//Ajax call here, now simulate with setTimeout
		setTimeout(function(){
		if(parent.next().hasClass("successful")){
			$("body").addClass("successful");
			TweenMax.to($('.confetti'), 1, { ease: Elastic.easeOut.config(1, 0.3), transform: 'scale(1.5)' });
			TweenMax.fromTo($('.success-icon'), 1, { ease: Elastic.easeOut.config(1, 0.3), transform: 'rotateY(-90deg)' }, { ease: Elastic.easeOut.config(1, 0.3), transform: 'rotateY(0deg)' });
			
		} else{
			TweenMax.to($('.confetti'), 1, { ease: Elastic.easeOut.config(1, 0.3), transform: 'scale(0)' });
			$("body").removeClass("successful");
		}

		TweenMax.to(parent, 0.6, {  ease: Elastic.easeOut.config(1, 0.3), transform: 'translate(-100vh, -50%)' });
		TweenMax.to(parent.next(), 1, {  ease: Elastic.easeOut.config(1, 0.3), transform: 'translate(0, -50%)' });
		}, 2000)
		
	})
});
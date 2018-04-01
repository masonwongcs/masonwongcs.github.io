$(document).ready(function(){
	TweenMax.fromTo($(".voucher-wrapper .voucher-logo"), 1, {ease: Elastic.easeOut.config(1, 0.3), scale: 0, rotationY: 360}, {ease: Elastic.easeOut.config(1, 0.3), scale : 1, rotationY: 0})
});
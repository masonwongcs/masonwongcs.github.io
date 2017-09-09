$(document).ready(function(){
	$(".menu ul li a").click(function(e){
		e.preventDefault();
		$(this).parent("li").addClass("active");
		$(".menu ul li").not($(this).parent("li")).removeClass("active");

		var selected = $(this).data("nav");
		console.log(selected);
		$(".content").find('div[data-nav="' + selected + '"]').addClass("active");
		$(".content").find('div').not('div[data-nav="' + selected + '"]').removeClass("active");
	});
});
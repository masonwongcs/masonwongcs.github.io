$(document).ready(function () {
    $('.btn').click(function () {
        var random_boolean = Math.random() >= 0.5;
        var that = $(this);
        $(this).addClass('loading');
        setTimeout(function () {
            that.removeClass('loading');
            that.text("OK");
            if(random_boolean){
                showMessage(random_boolean, "You won the rewards");
            } else{
                showMessage(random_boolean, "Try again next time");
            }

        }, 2000);
    })
});

//Params : (Success or Failed) , Message
function showMessage(isSuccess, message) {
    var isSuccess = isSuccess, rewardsWrapper = $(".rewards-wrapper"), rewardsIcon;
    if (isSuccess) {
        rewardsWrapper.addClass("success");
        rewardsIcon = rewardsWrapper.find(".rewards-icon svg.success-icon");
    } else {
        rewardsWrapper.addClass("failed");
        rewardsIcon = rewardsWrapper.find(".rewards-icon svg.failed-icon");
    }
    rewardsWrapper.find(".content-message").text(message);
    TweenMax.fromTo(rewardsIcon, 0.4, {scale: 0, alpha: 0}, {scale: 1, alpha: 1})
}
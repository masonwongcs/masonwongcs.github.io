$(document).ready(function(){
    var envelope;
    $('.envelope').hover(function(){
        envelope = $(this);
        envelope.addClass('animate');
        setTimeout(function() {
            envelope.find('.content').addClass('animate');
        }, 200);

    }, function(){
        envelope.find('.content').removeClass('animate');
        setTimeout(function(){
            envelope.removeClass('animate');
        }, 200);
    }).click(function(){
        envelope.removeClass('animate');
        envelope.find('.content').removeClass('animate');
        envelope.addClass('view-content');
        envelope.unbind();
    });

});

function showPopup(){
    $(".popup").show();
    var popup = TweenMax.fromTo($('.popup .popup-container'), 1, { ease: Elastic.easeOut.config(1, 0.3), transform: 'scale(0)' }, { ease: Elastic.easeOut.config(1, 0.3), transform: 'scale(1)' });
    popup.play();
    $(".popup-close").click(function(){
        hidePopup();
    })
}

function hidePopup(){
    $(".popup").fadeOut();
}
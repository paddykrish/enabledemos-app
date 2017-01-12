$('#qExposure .owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:4
        }
    }
})

$('#rgExposure .owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        }
    }
})


$('.collapse').on('shown.bs.collapse', function(){
$(this).parent().find(".fa-caret-right").removeClass("fa-caret-right").addClass("fa-caret-down");
}).on('hidden.bs.collapse', function(){
$(this).parent().find(".fa-caret-down").removeClass("fa-caret-down").addClass("fa-caret-right");
});

 $( ".owl-prev").html('<i class="fa fa-chevron-left"></i>');
 $( ".owl-next").html('<i class="fa fa-chevron-right"></i>');
 
 
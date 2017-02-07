window.setTimeout(function() { 
    $(".category-description.underwriting").fadeIn(8000);
    $(".category-description.claims").fadeIn(8000);
    $(".category-description.loss-prevention").fadeIn(8000);
    
    //$(".hex.hex-3.marketing-sales").fadeTo( 2000, 0.2, "swing" );
    //$(".hex.hex-3.policy-admin").fadeTo( 2000, 0.2, "swing" );
    //$(".hex.hex-3.finance").fadeTo( 2000, 0.2, "swing" );
    //$(".hex.hex-3.actuarial").fadeTo( 2000, 0.2, "swing" );  
    
    //$(".category-description.marketing-sales").animate({color: "#eee" }, 2000);
    //$(".category-description.policy-admin").animate({color: "#eee" }, 2000);
    //$(".category-description.finance").animate({color: "#eee" }, 2000);
    //$(".category-description.actuarial.top").animate({color: "#eee" }, 2000);
    //$(".category-description.actuarial.bottom").animate({color: "#eee" }, 2000);
    
    
    $(".hex.hex-3.marketing-sales").animate({backgroundColor: "#eee" }, 8000);
    $(".hex.hex-3.policy-admin").animate({backgroundColor: "#eee" }, 8000);
    $(".hex.hex-3.finance").animate({backgroundColor: "#eee" }, 8000);
    $(".hex.hex-3.actuarial").animate({backgroundColor: "#eee" }, 8000);
    
    
    $(".hex.hex-3.underwriting").animate({backgroundColor: "#742ec8" }, 3000); 
    $(".hex.hex-3.claims").animate({backgroundColor: "#e0221d" }, 3000);
    $(".hex.hex-3.loss-prevention").animate({backgroundColor: "#ff7300" }, 3000);
    
}, 1000);

$(document).ready(function(){
    
    
    var marketSales = $(".hex-3.marketing-sales").find("a");
    marketSales.click(function(){
        
        clearTab();
        
        var tabActiveMS = $(".nav-tabs li").find("a[href*=marketing-sales]");
        tabActiveMS.parent().addClass("active");
        tabActiveMS.attr("aria-expanded","true");
        
        clearTabPanel();
        
        var tabActivePanelMS = $(".tab-content").find("[id=marketing-sales]");
        tabActivePanelMS.addClass("active");
        
    });
    
    var underwriting = $(".hex-3.underwriting").find("a");
    underwriting.click(function(){
        
        clearTab();
        
        var tabActiveMS = $(".nav-tabs li").find("a[href*=underwriting]");
        tabActiveMS.parent().addClass("active");
        tabActiveMS.attr("aria-expanded","true");
        
        clearTabPanel();
        
        var tabActivePanelMS = $(".tab-content").find("[id=underwriting]");
        tabActivePanelMS.addClass("active");
        
    });
    
    var lossPrevention = $(".hex-3.loss-prevention").find("a");
    lossPrevention.click(function(){
        
        clearTab();
        
        var tabActiveMS = $(".nav-tabs li").find("a[href*=loss-prevention]");
        tabActiveMS.parent().addClass("active");
        tabActiveMS.attr("aria-expanded","true");
        
        clearTabPanel();
        
        var tabActivePanelMS = $(".tab-content").find("[id=loss-prevention]");
        tabActivePanelMS.addClass("active");
        
    });
    
    var claims = $(".hex-3.claims").find("a");
    claims.click(function(){
        
        clearTab();
        
        var tabActiveMS = $(".nav-tabs li").find("a[href*=claims]");
        tabActiveMS.parent().addClass("active");
        tabActiveMS.attr("aria-expanded","true");
        
        clearTabPanel();
        
        var tabActivePanelMS = $(".tab-content").find("[id=claims]");
        tabActivePanelMS.addClass("active");
        
    });
    
    function clearTab() {
        var tabActive = $(".nav-tabs li.active");
        tabActive.removeClass("active");
    }
    function clearTabPanel() {
        var tabPanelActive = $(".tab-content .active");
        tabPanelActive.removeClass("active");
    }
    
    
});
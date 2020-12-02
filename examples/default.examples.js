$(document).ready(function () {
 	//jQuery.resize.delay = 1000;
   	 $(window).resize(function() {
	
		$(".test,.test2,.test3,.test4,.test5,.test6").hide();		
		$(".test,.test2,.test3,.test4,.test5,.test6").hrzAccordion('resize');			
		
	});
	
	$(".showMe").on("click",function () {
        $("." + $(this).attr("data-id")).hrzAccordion('show', $(this).attr("data-load"));
    })
	
	 
});
	 



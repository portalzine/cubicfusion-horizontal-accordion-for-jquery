$(document).ready(function () {
  	$("[class*='left']").css("opacity","0");
	$(".test7").hrzAccordion({
        openOnLoad: 1,
		containerClass: "container7",
		contentWrapper: "contentWrapper7",
        contentInnerWrapper: "contentInnerWrapper7",
        handleClass: "handle7",
        handleClassOver: "handleOver7",
        handleClassSelected: "handleSelected7",
		 eventAction: function (i) {
            $("#eventRunning").html(" Opening - " + (i + 1));
			if($("[class*='left"+i+"']").css("opacity") == 0){
				
				$("[class*='right"+i+"']").animate_from_to("[class*='left"+i+"']",{
                   
                    initial_css: {
                        'background': '#81a61c',
						'border-radius': "5px"
                    }
                });
				
			}else{
				$("[class*='left"+i+"']").animate_from_to("[class*='right"+i+"']",{
                   
                    initial_css: {
                        'background': '#81a61c',
						'border-radius': "5px"
                    }
                })
			}
        },
		 completeAction: function (i) {
            $("#eventRunning").html(" Completed - " + (i + 1));
			if($("[class*='left"+i+"']").css("opacity") == 0){
				
				$("[class*='right"+i+"']").css("opacity","0");
				$("[class*='left"+i+"']").css("opacity","1");
				
			}else{
				$("[class*='right"+i+"']").css("opacity","1");
				$("[class*='left"+i+"']").css("opacity","0");
			}
			
        }
    });
	
});
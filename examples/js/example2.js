$(document).ready(function () {
  
	 $(".test2").hrzAccordion({
        eventTrigger: "mouseover",
        openOnLoad: 3,		
		closeSpeed: 200,              
        openSpeed: 200,
        handlePositionArray: "left,left,right,right",
        completeFunctionName: 'externalCallTest',
		handleClass: "handle2",
		handleClassOver: "handleOver2",
        handleClassSelected: "handleSelected2"
        
    });
	
});
	 
function externalCallTest() {
    $(".action").toggleClass("toggleClass")
};
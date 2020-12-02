$(document).ready(function () {
    /*Extend plugin with new methods*/

	$.hrzAccordion.addMethods({alertMe: function(){
									var settings =  $(this).data('settings'); 
									
									//alert(JSON.stringify(settings, null, 4))
									alert(settings.alertMe.help)}
									}, 
									{alertMe:{help: "alertMe called on init!"}
										},
									{alertMe: {init: true}
										}
									);
		/**/
	$(".test").hrzAccordion({
       
		eventTrigger: "mouseover",
        openOnLoad: 1,
        cycle: true,
        mouseEnterFunctionName: "mouseEnterTest",
        mouseLeaveFunctionName: "mouseLeaveTest",
        eventAction: function (i) {
            $("#eventRunning").html(" Opening - " + (i + 1));
        },
        completeAction: function (i) {
            $("#eventRunning").html(" Completed - " + (i + 1));
        }
    });
	
	var test = window.setInterval(function(){
		var data 		= $(".test").hrzAccordion('loopStatus');
		var instance 	= $(".test").hrzAccordion("instanceStatus");
		
		$("#statusCheck").html(data.status)
		$("#widthCheck").html("Container "+instance.containerWidth+"px / Content "+instance.finalWidth+"px")
		 },2000);
	
});

function mouseEnterTest() {
    $(".status").html("entering")
};

function mouseLeaveTest() {
    $(".status").html("leaving")
};
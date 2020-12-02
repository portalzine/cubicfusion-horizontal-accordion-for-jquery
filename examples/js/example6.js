$(document).ready(function () {
   
	$(".test6").hrzAccordion({
        openOnLoad: false,
		containerClass: "container6",
		imageSlice: "examples/images/nature_1.jpg",
		imageSliceOver: "examples/images/nature_2.jpg",  
        contentWrapper: "contentWrapper6",
        contentInnerWrapper: "contentInnerWrapper6",
        handleClass: "handle6",
        handleClassOver: "handleOver6",
        handleClassSelected: "handleSelected6",
		openEaseAction : "easeOutBounce",
		 closeEaseAction:"easeOutBounce"
    });
	
});
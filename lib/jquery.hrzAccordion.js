//# jQuery - Horizontal Accordion
//# Version 2.70.00
//#
//# portalZINE(R) NMN
//# http://www.portalzine.de
//#
//# Alexander Graef
//# portalzine@gmail.com
//#
//# HORIZONTAL ACCORDION LICENSE
//#
//# Copyright 2010-2015 portalZINE(R) NMN, Alexander Graef, Germany
//#
//# The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//#
//# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
//# INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
//# IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
//* ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//#
//# If you use the Horizontal Accordion for your projects,  you need a valid pro license.
//#
//# Commercial redistribution of the code is not permitted except by arrangement with  portalZINE(R) NMN, Alexander Graef, Germany.
//*

(function ($) {
    $.hrzAccordion = {        
		addMethods : function(){	
			var obj = {};
			for (var key in arguments[0]) {
  				for (var skey in arguments[2][key]) {
					var newset = "moduleRegister"+skey.toUpperCase();
					
					if(!settings.newset){
						obj[newset] = new Array();
						$.extend( settings,obj);
					}
					$.extend( settings,arguments[1]);
				}
				if(arguments[2][key][skey] == true){
					settings[newset].push(key);
				}
			}	
			if(arguments[1]){$.extend( settings,arguments[1]);}
			
			$.extend(methods, arguments[0]);
		},
		getSelector: function(object){
			    var container = $(object).attr("id") || $(object).attr("class");
				var element = $(this).attr("id") ? "#"+container : "."+container;				
				return {"container"	: container,"element"	: element};
		},
		executeFunctionByName: function (functionName, context/*, args */) {
            var args = Array.prototype.slice.call(arguments, 2);
            var namespaces = functionName.split(".");
            var func = namespaces.pop();
            for (var i = 0; i < namespaces.length; i++) {
                context = context[namespaces[i]];
            }
            return context[func].apply(context, args);
        }, 
		setOnEvent: function (i, container, settings, element) {
         	
			 if ( navigator.userAgent.match(/MSIE/) ) {  settings.closeEaseAction = "swing";  settings.openEaseAction = "swing"; }
			  	var element 		= $(element);
		 	  	var instanceData 	= element.data('instanceData');
			  	var finalWidth 		= instanceData.finalWidth-1;			
		      	var handle 			= $("#" + container + "Handle" + i); 
			  	var content			= $("#" + container + "Content" + i);
				handle.off(settings.eventTrigger).on(settings.eventTrigger, function () {
				  
			   if(settings.moduleRegisterONEVENTSTART){
									$.each(settings.moduleRegisterONEVENTCOMPLETE, function(index, value) {
  										element.hrzAccordion(value,element)
									});
									}
			  
               
			   var elementCount = element.find("li").size();
			  
			   if (i == elementCount-1 ) { element.data('state',{"loop": i, "status": 'end'});  }
               if (i == 0) { element.data('state',{"loop": i, "status": 'start'});}			    
			   
			    element.data('mouseover',0);
			    var status = $(element).data('status');
                
				if (status == 1 && settings.eventWaitForAnim == true) {
                    return false;
                }
			 
                if (handle.attr("rel") != container + "HandleSelected") {
                    if ( !! settings.eventActionFunctionName) {
						$.hrzAccordion.executeFunctionByName(settings.eventActionFunctionName, window);
					}else{
						settings.eventAction(i);
					}
                    $('[id*=' + container + 'Handle]').attr("rel", "");
                    $('[id*=' + container + 'Handle]').attr("class", settings.handleClass);
                    handle.addClass(settings.handleClassSelected);
                 
					element.find( " ." + settings.contentWrapper).css({
                        width: finalWidth+ "px"
                    });
                   	
					if(settings.animate == false || element.data('animate') == false){
					 	$('[rel=' + container + 'ContainerSelected]').css({width: 0,opacity: "0"});
					 	content.css({"opacity": "1", width :finalWidth });
					 	element.data('status', 0);
				     	element.data('mouseover',1);
					  	if ( !! settings.completeFunctionName) {
                        	$.hrzAccordion.executeFunctionByName(settings.completeFunctionName, window);
                    	}else{
							settings.completeAction(i);
						}
						element.data('animate', true);
						if(settings.moduleRegisterONEVENTCOMPLETE){
									$.each(settings.moduleRegisterONEVENTCOMPLETE, function(index, value) {
  										element.hrzAccordion(value,element)
									});
									}
					}else{
				    switch (settings.closeOpenAnimation) {
                    case 1:
                        if ($('[rel=' + container + 'ContainerSelected]').get(0)) {
                            element.data('status', 1);                            
                            $('[rel=' + container + 'ContainerSelected]').animate({
                                width: 0,
                                opacity: "0"
                            }, {
                                queue: true,
                                duration: settings.closeSpeed,
                                easing: settings.closeEaseAction,
                                complete: function () {                                  					
                                    if ( !! settings.completeFunctionName) {
                                        $.hrzAccordion.executeFunctionByName(settings.completeFunctionName, window);
                                    }else{
										settings.completeAction(i);
									}
									if(settings.moduleRegisterONEVENTCOMPLETE){
									$.each(settings.moduleRegisterONEVENTCOMPLETE, function(index, value) {
  										element.hrzAccordion(value,element)
									});
									}
									element.data('status', 0);	
									element.data('mouseover',1);
                                },
                                step: function (now) {
                                    width = $(this).width();                                    
                                    new_width = finalWidth - width;
                                    content.width(Math.ceil(new_width)).css("opacity", "1");
                                }
                            });
                        } else {
                            element.data('status', 1);							
                            content.animate({
                                width: finalWidth,
                                opacity: "1"
                            }, {
                                queue: false,
                                duration: settings.closeSpeed,
                                easing: settings.closeEaseAction,
                                complete: function () {
                                    if ( !! settings.completeFunctionName) {
                                        $.hrzAccordion.executeFunctionByName(settings.completeFunctionName, window);
                                    }else{
										settings.completeAction(i);
									}                                  
								   if(settings.moduleRegisterONEVENTCOMPLETE){
									$.each(settings.moduleRegisterONEVENTCOMPLETE, function(index, value) {
  										element.hrzAccordion(value,element)
									});
									}
								   element.data('status', 0);
								   element.data('mouseover',1);
                                }
                            });
                        }
                        break;
                    case 2:
                        $('[id*=' + container + 'Content]').css({
                            width: "0px"
                        });
                       		element.data('status', 1);	
                            content.animate({
                                width: finalWidth + "px",
                                opacity: "1"
                            }, {
                                queue: false,
                                duration: settings.openSpeed,
                                easing: settings.openEaseAction,
                                complete: function () {									
                                    if ( !! settings.completeFunctionName) {
										$.hrzAccordion.executeFunctionByName(settings.completeFunctionName, window);
									}else{
										settings.completeAction(i);
									}									
									if(settings.moduleRegisterONEVENTCOMPLETE){
									$.each(settings.moduleRegisterONEVENTCOMPLETE, function(index, value) {
  										element.hrzAccordion(value,element)
									});
									}
									element.data('status', 0);
								    element.data('mouseover',1);
                                }
                            });
                       
                        break;
                    }
					}
                   
					$('[id*=' + container + 'Content]').attr("rel", "");
                    handle.attr("rel", container + "HandleSelected");
                   	content.attr("rel", container + "ContainerSelected"); 				
					                  
					if (settings.cycle == true) {
                        $('[rel=' + container + 'ContainerSelected]').on("mouseenter", function () {
                          element.data("pause_holder",true);
                            if ( !! settings.mouseEnterFunctionName) {
                                $.hrzAccordion.executeFunctionByName(settings.mouseEnterFunctionName, window);
                            }
                        })
                        $('[rel=' + container + 'ContainerSelected]').on("mouseleave", function () {
                           element.data("pause_holder",false);
                            if ( !! settings.mouseLeaveFunctionName) {
                                $.hrzAccordion.executeFunctionByName(settings.mouseLeaveFunctionName, window);
                            }
                        })
                    } 
					if(settings.moduleRegisterONEVENTEND){
					$.each(settings.moduleRegisterONEVENTEND, function(index, value) {
  						element.hrzAccordion(value,element)
					});
					}
                }				 
            });		
        }
    };
	var settings = {
                animate: true,
				showTimeout:false,
				imageSlice: "",
				imageSliceOver:"",
				eventTrigger: "click",
                containerClass: "container",
                listItemClass: "listItem",
                contentContainerClass: "contentContainer",
                contentWrapper: "contentWrapper",
                contentInnerWrapper: "contentInnerWrapper",
                handleClass: "handle",
				handleClassOver: "handleOver",
                handleClassSelected: "handleSelected",
                handlePosition: "right",
                handlePositionArray: "",
                // left,left,right,right,right
                closeEaseAction: "swing",
                closeSpeed: 500,
                openEaseAction: "swing",
                openSpeed: 500,
                openOnLoad: 1,
                hashPrefix: "tab",
                eventAction: function (i) {
                    //add your own extra eventAction function here
                },
                completeAction: function (i) {
                    //add your own onComplete function here
                },
                completeFunctionName: '',
                //external function to call onComplete, completeAction will not be used
                mouseEnterFunctionName: '',
                //external function to call onComplete
                mouseLeaveFunctionName: '',
                //external function to call onShow / onResize
				onShowFunctionName: '',
                closeOpenAnimation: 1,
                // 1 - open and close at the same time / 2- close all and than open next
                cycle: false,
                cycleInterval: 5000,
                fixedWidth: "",
                eventWaitForAnim: true,
				modulePath: "",
				moduleLoaded : new Array
            };
    var methods = {
		addSetting : function(set){	$.extend( settings,set);},
		getSettings : function(set){return settings;},
		loadModule : function(){
				var element = this;	
				var args = arguments;				
				if($(this).length > 0 ){
					for (var key in args[0]) {						
						$.ajaxSetup({ cache: true });
						var file = settings.modulePath+args[0][key].module+"/"+args[0][key].file+".js";
												
						$.getScript(settings.modulePath+"/"+args[0][key].module+"/"+args[0][key].file+".js", function(){
  							settings.moduleLoaded.push(args[0][key].module+"/"+args[0][key].file);
							if(args[0][key].action){
								args[0][key].action(element);
							}
							$.ajaxSetup({ cache: false });														
						});					
					}
				}
			},
		startpause: function(){		
			var element =  $(this), status =  element.data("pause_holder");
			if(status == true){ element.data("pause_holder", false);}else{element.data("pause_holder", true);}				  
			},
		resize: function(){
		
			return this.each(function (a) {									
				var selector = $.hrzAccordion.getSelector(this);				
				var container = selector.container;
				var element =  selector.element;	
				var saved = $(this).data("interval");
				var state = $(this).data("state");	
				var settings =  $(this).data('settings');
				if(settings.fixedWidth) return false;
				clearInterval(saved);
				
				$(this).removeData("interval");	
				$(element).unwrap().html( $(element).data('clone'));
			
				$(element).hide();	
				
				$(element).hrzAccordion( $(this).data('settings'));
				$(element).data('status', 0);
				$("#" + container + "Handle" + state.loop).trigger(settings.eventTrigger);					
			});
		},
		 show: function (data) {
            var selected = data, animate = true;
            
			if (data.toString() == "[object Object]") {
                selected 	= data.selectTab;
                animate 	= data.animate;                
            }			
			if (animate == false) {
                    $(this).data("animate", false)
            } else {
                    $(this).data("animate", true)
            }
            var container= $(this).attr("id") || $(this).attr("class");
            var settings = $(this).data("settings");
           
            $("#" + container + "Handle" + selected).trigger(settings.eventTrigger);			
        },
		loopStatus: function(options){				
			return $(this).data('state');					
		},
		instanceStatus: function(options){			
			return $(this).data('instanceData');					
		},
		loop: function(options){			
            return this.each(function (a) {
                var selector 		= $.hrzAccordion.getSelector(this);				
			    var container 		= selector.container;
				var element 		=  selector.element;	
				var elementCount 	= $(this).find('li').size();				
                var settings 		= $(element).data('settings');
                var saved 			= $(element).data('state');
				if(saved == null){
					i = 0;
				}else{					 
					  i = 	saved.loop;
					  $("#" + container + "Handle" + i).trigger(settings.eventTrigger);
				}
                var loopStatus = "start";
               
			    var interval = window.setInterval(function () {
                    
				var saved = $(element).data('state');
			
				if(saved == null){
					i = 0;
				}else{					 
					  i = 	saved.loop;
					  $("#" + container + "Handle" + i).trigger(settings.eventTrigger);
				}
					if ($(element).data("pause_holder") == false) {
						
                        $("#" + container + "Handle" + i).trigger(settings.eventTrigger);
                        if (loopStatus == "start") {
                            i = i + 1;
                        } else {
                            i = i - 1;
                        }
                        if (i == elementCount && loopStatus == "start") {
                            loopStatus = "end";
                            i = elementCount - 1;
                        }
                        if (i == 0 && loopStatus == "end") {
                            loopStatus = "start";
                            i = 0;
                        }
                        $(this).data('status', {
                            "loop": i,
                            "status": loopStatus
                        });
                    }
					$(element).data('state',{"loop": i, "status": loopStatus});
					
                }, settings.cycleInterval);
				
				$(element).data("interval", interval);
            });
        
		},
		init: function(options){			 
           
			if (options) {
                $.extend(settings, options);
            }
           // var settings = settings;
            return this.each(function (a) {          
				
				var selector = $.hrzAccordion.getSelector(this);				
			    var container = selector.container;
				var element =  $(this);
				
				element.data('clone', $(this).html());
                element.data('settings', settings);
                element.wrap("<div class='" + settings.containerClass + "'></div>");
                var elementCount = element.find('li').size();
				var containerWidth = $("." + settings.containerClass).innerWidth();
              	$("." + settings.containerClass).css({"min-width": containerWidth});
				var $p = $("<div class='"+settings.handleClass+"'></div>").hide().appendTo("body");   		   				
			
				var handleWidth = $("." + settings.handleClass).outerWidth(true);
				
                $p.remove();		
				 
				var finalWidth;
                var handle;
                if (settings.fixedWidth) {
                    finalWidth = settings.fixedWidth;
				}else {               				   			
					finalWidth = containerWidth - (elementCount * handleWidth);			
                }
											
                element.find("li").each(function (i) {
                    $(this).attr('id', container + "ListItem" + i);
                    $(this).attr('class', settings.listItemClass);					
                    $(this).html("<div class='" + settings.contentContainerClass + "' id='" + container + "Content" + i + "'>" + "<div class=\"" + settings.contentWrapper + "\">" 
					+"<div class=\"" + settings.contentInnerWrapper + "\">" + $(this).html() + "</div></div></div>");			
					
					if ($("div", this).hasClass(settings.handleClass)) {
                        var html = $("div." + settings.handleClass, this).attr("id", "" + container + "Handle" + i + "").html();
                        $("div." + settings.handleClass, this).remove();
                        handle = "<div class=\"" + settings.handleClass + "\" id='" + container + "Handle" + i + "'>" + html + "</div>";
                    } else {
                        handle = "<div class=\"" + settings.handleClass + "\" id='" + container + "Handle" + i + "'></div>";
                    }
                   
					if (settings.handlePositionArray) {
                        splitthis = settings.handlePositionArray.split(",");
                        settings.handlePosition = splitthis[i];
                    }
                    switch (settings.handlePosition) {
                    case "left":
                        $(this).prepend(handle);
                        break;
                    case "right":
                        $(this).append(handle);
                        break;
                    case "top":
                        $("." + container + "Top").append(handle);
                        break;
                    case "bottom":
                        $("." + container + "Bottom").append(handle);
                        break;
                    }
                   
				    $("#" + container + "Handle" + i).on("mouseenter", function () {
						if(element.data('mouseover') == 0) return;
                        $("#" + container + "Handle" + i).addClass(settings.handleClassOver);					 
                    });
                    $("#" + container + "Handle" + i).on("mouseleave", function () {
                       if(element.data('mouseover') == 0) return;
						if ($("#" + container + "Handle" + i).attr("rel") != "selected") {
                            $("#" + container + "Handle" + i).removeClass(settings.handleClassOver);							
                        }
                    });
					
					if (settings.imageSlice != "") {
						$("#"+container + "Handle" + i).css({"background-image": "url("+settings.imageSlice+")", "background-repeat":"repeat-x","background-position":"-"+(handleWidth*i)+"px 0px"});
						$("#"+container + "Handle" + i).hover(						
						function(){
							if(element.data('mouseover') == 0) return;							 
							$(this).css({"background-image": "url("+settings.imageSliceOver+")", "background-repeat":"repeat-x","background-position":"-"+(handleWidth*i)+"px 0px"});							 
						},
						function(){							
							$(this).css({"background-image": "url("+settings.imageSlice+")", "background-repeat":"repeat-x","background-position":"-"+(handleWidth*i)+"px 0px"});
						})
					}					 
                    element.data('instanceData',{"finalWidth":finalWidth,"elementCount":elementCount,"handleWidth":handleWidth,"containerWidth":containerWidth,"container":container,"i":i});
					$.hrzAccordion.setOnEvent(i, container,  settings, element);  
                });    
				
				if(settings.showTimeout){
				 	setTimeout(function(){
						element.show();				
						if ( !! settings.onShowFunctionName) {
                         	$.hrzAccordion.executeFunctionByName(settings.onShowFunctionName, window);
                        }										
					},settings.showTimeout);
				}else{
					element.show();
				}				
				
				var tab = 0;
				var location_hash = location.hash;
               		location_hash = location_hash.replace("#", "");
               					
				if (location_hash.search(settings.hashPrefix) != '-1') {
                	tab = 1;					
                    location_hash = location_hash.replace(settings.hashPrefix, "");    
					element.hrzAccordion('show',{selectTab: location_hash-1, animate: false})
                } 				
				if(settings.openOnLoad && tab != 1){	
					element.hrzAccordion('show', {selectTab: settings.openOnLoad-1, animate: false})
				}
				
				element.data("pause_holder", true);
                if (settings.cycle == true) {
                    element.hrzAccordion('loop',options);
					 element.data("pause_holder",false);
                }
				if(settings.moduleRegisterINIT){
					$.each(settings.moduleRegisterINIT, function(index, value) {
  						element.hrzAccordion(value,element)
					});	
				}
				  					
            });			
		}	
		
	}
	
	$.fn.extend({            
		hrzAccordion: function (method) {				 
    		if ( methods[method] ) {
      			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    		} else if ( typeof method == 'object' || ! method ) {
      			return methods.init.apply( this, arguments );
    		} else {
      			$.error( 'Method ' +  method + ' does not exist on jQuery.hrzAccordion' );
    		}
			          
        }
    });
})(jQuery);
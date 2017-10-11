$(document).ready(function(){
    $("#search-btn").click(function(){
    	$("img").show();
	    var text = $("#search-txt").val();
	    if(text==="") {
	    	$("img").show();
	    }
	    else{
	   		$("#uploadedImages img[tag!='"+text+"']").hide();
	   	}
    });
    $("#filterAnchors a").click(function() {
        $("img").show();
	    var text = $(this).text();
	    if(text==="") {
	    	$("img").show();
	    }
	    else{
	   		$("#uploadedImages img[tag!='"+text+"']").hide();
	   	}
    });
});
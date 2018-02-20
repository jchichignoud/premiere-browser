/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/



////////////////////////////
////// SKIN HANDLING ///////
////////////////////////////

(function () {
    'use strict';
    var csInterface = new CSInterface();
    function init() {            
        themeManager.init();
    }   
    init();
}());


////////////////////////////
///// CLICK HANDLING ///////
////////////////////////////

// Pressing enter key launches below click action    
$("#website-field").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#go-button").click();
    }
});


// Click on go button loads address in textbox
$("#go-button").click(function(){
    loadSite()
})


$('#website-field').click(function() {
	$(this).addClass("active");
    $(this).attr('value','http://');
	$('#go-button').addClass("show");
});

// reveal hidden items based on CSS class
$('#reveal').click(function(){
    $('.instructions').toggleClass("reveal")
});

// open/close the Favourites menu and toggle the icon
$("#menu").click(function(){
    $(this).children().toggleClass("fa-star fa-times");
    $("#links").toggleClass("reveal")
});



////////////////////////////
//////// FUNCTIONS /////////
////////////////////////////

// changing href to value inside textbox
function loadSite(){
    window.location.href = $("#website-field").val();
};

////////////////////////////
//////// AJAX CALLS ////////
////////////////////////////

// Edit this value to your own spreadsheet key for custom favourites
var myFavorites = "1hqaME2O-GFUCw2eihhslgVDWAu0ZuSaFpzleCBr4YRQ";

$.ajax("https://spreadsheets.google.com/feeds/list/" + myFavorites + "/1/public/full?alt=json")
    .done(function(data){
        var linksArray = data.feed.entry;
        linksArray.forEach(function(entry){
            var linkName = entry.gsx$name.$t;
            var linkUrl = entry.gsx$url.$t;
            $( "#links" ).append( "<p><a href='" + linkUrl + "'>" + linkName + "</p>" )
        });
    });

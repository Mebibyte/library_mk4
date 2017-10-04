//
// This is a manifest file that'll be compiled into application.css, which will include all the files
// listed below.
//
// Any CSS and SCSS file within this directory, lib/assets/stylesheets, vendor/assets/stylesheets,
// or vendor/assets/stylesheets of plugins, if any, can be referenced here using a relative path.
//
// You're free to add application-wide styles to this file and they'll appear at the top of the
// compiled file, but it's generally better to create a new file per style scope.

// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.

//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets

 $(document).ready(function(){
    $.ajaxSetup({
        headers: {
            clientOffset: ((new Date()).getTimezoneOffset() / 60)
        }
    });

    setTimeout(updateDisplay, 0);
});

function updateDisplay(){
    $.get('/display/status').success(function(response){
        console.log(response);
        $('#row-1-col-1 .num').text(response.total_checkouts);
        $('#row-0-col-0 .num').text(response.total_games);
        $('#row-0-col-1 .num').text(response.open_checkouts);
        var checkoutPercent = ((response.open_checkouts / response.total_games)) * 100
        $('#row-0-col-2 .num').text(checkoutPercent + '%');
        if (checkoutPercent > 60) {
            $('#library-status').text("THE LIBRARY IS VERY BUSY")
        } else {
            $('#library-status').text("THE LIBRARY IS NOT BUSY")
        }
        if (response.longest_checkout !== null) {
            $('#longest-checkout').text(response.longest_checkout.min_game);
        }
        if (response.top_games !== null) {
            $.get('paxtt.xml', function(data){
                for (var i = 0; i < response.top_games.length && i < 5; i++) {
                    game = response.top_games[i];
                    gamedata = $(data).find('name:contains(' + game.title + ')').parent();
                    // TODO: Fix no image found
                    $("#row-" + i + " .small-box-art").html("<img src='" + gamedata.children('thumbnail').text() + "' style='width: 100%; height: 100%;' >");
                    $("#row-" + i + " .game-title").text(game.title);
                    $("#row-" + i + " .checkout-number").text(game.checkouts);
                }
            });
        }
        setTimeout(updateDisplay, 60000);
    });
}
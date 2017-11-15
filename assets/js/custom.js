(function(){
  $(window).scroll(function () {
      var top = $(document).scrollTop();
      $('.splash').css({
        'background-position': '0px -'+(top/3).toFixed(2)+'px'
      });
      if(top > 50)
        $('#home > .navbar').removeClass('navbar-transparent');
      else
        $('#home > .navbar').addClass('navbar-transparent');
  });

  $("a[href='#']").click(function(e) {
    e.preventDefault();
  });

  var $button = $("<div id='source-button' class='btn btn-primary btn-xs'>&lt; &gt;</div>").click(function(){
    var html = $(this).parent().html();
    html = cleanSource(html);
    $("#source-modal pre").text(html);
    $("#source-modal").modal();
  });

  $('.bs-component [data-toggle="popover"]').popover();
  $('.bs-component [data-toggle="tooltip"]').tooltip();

  $(".bs-component").hover(function(){
    $(this).append($button);
    $button.show();
  }, function(){
    $button.hide();
  });

  function cleanSource(html) {
    html = html.replace(/×/g, "&times;")
               .replace(/«/g, "&laquo;")
               .replace(/»/g, "&raquo;")
               .replace(/←/g, "&larr;")
               .replace(/→/g, "&rarr;");

    var lines = html.split(/\n/);

    lines.shift();
    lines.splice(-1, 1);

    var indentSize = lines[0].length - lines[0].trim().length,
        re = new RegExp(" {" + indentSize + "}");

    lines = lines.map(function(line){
      if (line.match(re)) {
        line = line.substring(indentSize);
      }

      return line;
    });

    lines = lines.join("\n");

    return lines;
  }

  var hover_menu = function(){

    var nav_item =  $('.navbar__item--parent'),
        submenu = nav_item.children('.submenu');

        nav_item.mouseenter(function(){
          submenu.fadeIn();
        })
        .mouseleave(function(){
          submenu.fadeOut('fast');
        });

  };

  hover_menu();

  var handle_menu = function(){

    var main_menu = $('.main-menu');

    $(window).scroll(function(){

      if( $(document).scrollTop() > 50 ){
        main_menu
          .removeClass('show-menu')
          .addClass('hide-menu')
          .addClass('menu-fixed');
      }

      if( $(document).scrollTop() == 0 ){

        main_menu
          .delay(500)
          .removeClass('hide-menu')
          .addClass('menu-transition')
          .addClass('show-menu')
          .removeClass('menu-fixed');

          setTimeout(function () { 
            main_menu            
              .removeClass('menu-transition')
              .removeClass('show-menu');
          }, 700);      

      }

    });

    $(document).on( "mousemove", function( event ) {

      var mouse_pos = event.pageY - $(document).scrollTop(),
          main_menu = $('.main-menu'),
          menu_height = $('.main_menu').height() || 50;

      if($(document).scrollTop() > menu_height){
        // the window has scrolled down
        if( mouse_pos < menu_height ){
          // the mouse is near the top
          main_menu        
            .removeClass('hide-menu')
            .addClass('menu-transition')
            .addClass('show-menu');
        }
        
        if( $('.submenu').is(':visible') ){
          menu_height += $('.submenu').height();
        }

        if( mouse_pos > menu_height ){
          main_menu
            .removeClass('show-menu')
            .addClass('hide-menu');
        }

      }

    });

  };

  handle_menu();

})();

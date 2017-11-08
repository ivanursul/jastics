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

  var hide_menu = function(){

    var navbar = $('#main-navbar'),
        scroll_top = $(document).scrollTop();

    $(window).scroll(function(){

      //console.log($($(document).scrollTop()));

      // if($(document).scrollTop() > 50){
      //   navbar.removeClass('show-navbar').addClass('hide-navbar');
      // }

      // if($(document).scrollTop() == 0){
      //   console.log('top!');
      //   navbar.delay(3000).removeClass('hide-navbar').removeClass('show-navbar').addClass('show-navbar');
      // }



    });

    $(document).on( "mousemove", function( event ) {

      var pos = event.pageY - $(document).scrollTop(),
      navbar = $('.main-menu');
      console.log($(document).scrollTop());
      if(pos < 50 && $(document).scrollTop() > 50){
        navbar.addClass('fixed');
      } else {
        navbar.removeClass('fixed');
      }
      
      //console.log(pos);

    });

    var el = $('.main-subheader');

    el.on('click', function(){
      
      $('.navbar-default').clone().appendTo('body').addClass('navbar-fixed-top');

    });

  };

  hide_menu();

})();

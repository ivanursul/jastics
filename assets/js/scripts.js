$(document).ready(function(){

    var close_the_menu = function(page){

        if(page == 'home'){
            $('#close-menu').hide();
            $('#close-menu').fadeOut();
            $('#nav-items').fadeOut();
            $('#nav-wrapper').fadeOut().removeClass('fixed-menu');
            $('#open-menu').fadeIn();
        }
        if(page == 'page'){
            $('#close-menu--page').hide();

            $('#hire-us-btn--page').removeClass('hire-us-btn--white-bordered');

            $('#close-menu--page').fadeOut();
            $('#nav-items').hide();
            $('#nav-wrapper').fadeOut();
            $('#open-menu--page').fadeIn();

            $('#site-header__logo').removeClass('site-header__logo--hidden');
            $('.site-header--page').removeClass('menu-open').addClass('menu-closed');        

        }

    }    

    var handle_home_nav = function(){
        
        $('#open-menu').on('click', function(event){

            var banner_height = $('#banner').height(),
                nav_wrapper = $('#nav-wrapper'),
                banner_goto = $('#banner-goto'),
                banner_goto_left_offset = banner_goto.offset().left;

            $(this).hide();
            $('#close-menu').fadeIn();
            $('#nav-items').fadeIn();
            nav_wrapper.css('height', banner_height + 'px').fadeIn();

            if(banner_goto_left_offset >= $('#nav-wrapper').offset().left){
                banner_goto.addClass('go-to-next--hover-darkblue');
            } else {
                banner_goto.removeClass('go-to-next--hover-darkblue');
            }

            event.stopPropagation();

        });

        $('#close-menu').on('click', function(){
            close_the_menu('home');
        });

        // Hide menu on ESC key
        $(document).on('keydown', function(e){            
            if($('body').attr('id') == 'home' && $('#nav-items').is(':visible') && e.keyCode == 27){
                close_the_menu('home');
            }            
        });

        // Hide menu if a click takes place outside of menu area
        $(document).on('click', function(event){
            if($('body').attr('id') == 'home' && !$(event.target).closest('#nav-wrapper').length && !$(event.target).closest('#open-menu').length && !$(event.target).closest('#nav-items').length){
                close_the_menu('home');
            }
        });        

        $(window).resize(function(){
            if($('#nav-wrapper').is(':visible')){
                var banner_height = $('#banner').height();
                $('#nav-wrapper').css('height', banner_height + 'px');
                if($('#banner-goto').offset() && $('#nav-wrapper').offset() && $('#banner-goto').offset().left >= $('#nav-wrapper').offset().left){
                    $('#banner-goto').addClass('go-to-next--hover-darkblue');
                } else {
                    $('#banner-goto').removeClass('go-to-next--hover-darkblue');
                }
            }
            
        });

    };

    var handle_page_nav = function(){

        $('#open-menu--page').on('click', function(event){

            $(this).hide();

            $('.site-header--page').removeClass('menu-closed').addClass('menu-open');

            $('#site-header__logo').addClass('site-header__logo--hidden');

            $('#hire-us-btn--page').addClass('hire-us-btn--white-bordered').fadeIn();

            $('#close-menu--page').fadeIn();
            $('#nav-items').fadeIn();
            $('#nav-wrapper').fadeIn().addClass('fixed-menu');

            event.stopPropagation();

        });

        $('#close-menu--page').on('click', function(){
            close_the_menu('page');
        });
        
        // Hide menu on ESC key
        $(document).on('keydown', function(e){            
            if($('body').attr('id') != 'home' && $('#nav-items').is(':visible') && e.keyCode == 27){
                close_the_menu('page');
            }            
        });

        // Hide menu if a click takes place outside of menu area
        $(document).on('click', function(event){
            if($('body').attr('id') != 'home' && !$(event.target).closest('#nav-wrapper').length && !$(event.target).closest('#open-menu--page').length && !$(event.target).closest('#nav-items').length){
                close_the_menu('page');
            }
        });        

    };

    var expertise_tabs = function(){

        $('.expertise__tag-link').on('click', function(e){

            var $this = $(this),
            theid = $this.attr('href');

            // Hide all tabbed content
            $('.expertise__content').hide();
            //$('.expertise__content').removeClass('expertise__content--active');

            // Remove the 'active' class from the anchors
            $('.expertise__tag-link').removeClass('expertise__tag-link--active');

            // Show the tabbed content
            $(theid).fadeIn('fast');
            //$(theid).addClass('expertise__content--active');

            // Add the 'active' class to the anchor clicked
            $this.addClass('expertise__tag-link--active');

            e.preventDefault();


        });

    };

    var shadowed_header = function(){

        var header = $('#site-header-wrapper');

        $(window).scroll(function(e){
            if(header.offset() && header.offset().top !== 0){
                if(!header.hasClass('site-header-wrapper--shadowed')){
                    header.addClass('site-header-wrapper--shadowed');
                }
            }else{
                header.removeClass('site-header-wrapper--shadowed');
            }
        });

    };

    handle_home_nav();

    handle_page_nav();

    expertise_tabs();

    shadowed_header();

});
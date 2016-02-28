jQuery(document).ready(function ($) {
    //if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
    var MQL = 1170;

    /***************************************************************************/
    /** SCROLLING STUFF: HEADER SCROLLING + BACK-TO-TOP **/
    /***************************************************************************/

    //top menu bar 'slide in and out on scroll' effect
    if ($(window).width() > MQL) {
        
        /******* HEADER SCROLL variable declarations ******/
        var headerHeight = $('.cd-header').height();
        var WHEN_TO_SHOW_OR_HIDE_HEADER_SHADOW = 70;

        /******* BACK TO TOP SCROLL variable declarations ******/
        // browser window scroll (in pixels) after which the "back to top" link is shown
        var offset = 200,
            //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
            offset_opacity = 1200,
            //duration of the top scrolling animation (in ms)
            scroll_top_duration = 700,
            //grab the "back to top" link
            $back_to_top = $('.cd-top');

        //smooth scroll to top
        $back_to_top.on('click', function (event) {
            event.preventDefault();
            $('body,html').animate({
                scrollTop: 0,
            }, scroll_top_duration);
        });

        $(window).on('scroll', {
                previousTop: 0
            },
            function () {

                var currentTop = $(window).scrollTop();

                /******* BACK TO TOP SCROLL ******/
                if (currentTop > offset) {
                    $back_to_top.addClass('cd-is-visible');
                } else {
                    $back_to_top.removeClass('cd-is-visible cd-fade-out');
                }

                if (currentTop > offset_opacity) {
                    $back_to_top.addClass('cd-fade-out');
                }

                /******* END (BACK TO TOP SCROLL) and START (HEADER SCROLLING) ******/

                //check if user is scrolling up
                if (currentTop < this.previousTop) {
                    //if scrolling up...

                    if (currentTop < WHEN_TO_SHOW_OR_HIDE_HEADER_SHADOW) {
                        $('.cd-header').removeClass('with-bottom-shadow');
                    }

                    if (currentTop > 0 && $('.cd-header').hasClass('is-fixed')) {
                        //$('.cd-header').addClass('is-visible');
                    } else {
                        //$('.cd-header').removeClass('is-visible is-fixed');
                    }
                } else {
                    //if scrolling down...

                    if (currentTop > WHEN_TO_SHOW_OR_HIDE_HEADER_SHADOW) {
                        $('.cd-header').addClass('with-bottom-shadow');
                    }

                    //$('.cd-header').removeClass('is-visible');

                    if (currentTop > headerHeight && !$('.cd-header').hasClass('is-fixed')) {
                        //$('.cd-header').addClass('is-fixed');
                    }
                }

                this.previousTop = currentTop;
            });
    }


    /***************************************************************************/
    /** Open / Close Settings Panel **/
    /***************************************************************************/

    $('.cd-primary-nav-trigger').on('click', function () {
        $('.cd-menu-icon').toggleClass('is-clicked');
        $('.cd-header').toggleClass('menu-is-open');

        //in firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
        if ($('.cd-primary-nav').hasClass('is-visible')) {
            $('.cd-primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                $('body').removeClass('overflow-hidden');
            });
        } else {
            $('.cd-primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                $('body').addClass('overflow-hidden');
            });
        }
    });


    /***************************************************************************/
    /** Login Modal Stuff
    /***************************************************************************/
    var formModal = $('.cd-user-modal'),
        formLogin = formModal.find('#cd-login'),
        formSignup = formModal.find('#cd-signup'),
        formForgotPassword = formModal.find('#cd-reset-password'),
        formModalTab = $('.cd-switcher'),
        tabLogin = formModalTab.children('li').eq(0).children('a'),
        tabSignup = formModalTab.children('li').eq(1).children('a'),
        forgotPasswordLink = formLogin.find('.cd-form-bottom-message a'),
        backToLoginLink = formForgotPassword.find('.cd-form-bottom-message a'),
        mainNav = $('.cd-secondary-nav');

    //open modal
    mainNav.on('click', function (event) {
        $(event.target).is(mainNav) && mainNav.children('ul').toggleClass('is-visible');
    });

    //open sign-up form
    mainNav.on('click', '.cd-signup', signup_selected);
    //open login-form form
    mainNav.on('click', '.cd-signin', login_selected);

    //close modal
    formModal.on('click', function (event) {
        if ($(event.target).is(formModal) || $(event.target).is('.cd-close-form')) {
            formModal.removeClass('is-visible');
        }
    });
    //close modal when clicking the esc keyboard button
    $(document).keyup(function (event) {
        if (event.which == '27') {
            formModal.removeClass('is-visible');
        }
    });

    //switch from a tab to another
    formModalTab.on('click', function (event) {
        event.preventDefault();
        ($(event.target).is(tabLogin)) ? login_selected() : signup_selected();
    });

    //hide or show password
    $('.hide-password').on('click', function () {
        var togglePass = $(this),
            passwordField = togglePass.prev('input');

        ('password' == passwordField.attr('type')) ? passwordField.attr('type', 'text') : passwordField.attr('type', 'password');
        ('Hide' == togglePass.text()) ? togglePass.text('Show') : togglePass.text('Hide');
        //focus and move cursor to the end of input field
        passwordField.putCursorAtEnd();
    });

    //show forgot-password form 
    forgotPasswordLink.on('click', function (event) {
        event.preventDefault();
        forgot_password_selected();
    });

    //back to login from the forgot-password form
    backToLoginLink.on('click', function (event) {
        event.preventDefault();
        login_selected();
    });

    function login_selected() {
        mainNav.children('ul').removeClass('is-visible');
        formModal.addClass('is-visible');
        formLogin.addClass('is-selected');
        formSignup.removeClass('is-selected');
        formForgotPassword.removeClass('is-selected');
        tabLogin.addClass('selected');
        tabSignup.removeClass('selected');
    }

    function signup_selected() {
        mainNav.children('ul').removeClass('is-visible');
        formModal.addClass('is-visible');
        formLogin.removeClass('is-selected');
        formSignup.addClass('is-selected');
        formForgotPassword.removeClass('is-selected');
        tabLogin.removeClass('selected');
        tabSignup.addClass('selected');
    }

    function forgot_password_selected() {
        formLogin.removeClass('is-selected');
        formSignup.removeClass('is-selected');
        formForgotPassword.addClass('is-selected');
    }

    //show error messages 
    formLogin.find('input[type="submit"]').on('click', function (event) {
        event.preventDefault();
        formLogin.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
    });
    formSignup.find('input[type="submit"]').on('click', function (event) {
        event.preventDefault();
        formSignup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
    });


    //IE9 placeholder fallback
    //credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
    if (!Modernizr.input.placeholder) {
        $('[placeholder]').focus(function () {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        }).blur(function () {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.val(input.attr('placeholder'));
            }
        }).blur();
        $('[placeholder]').parents('form').submit(function () {
            $(this).find('[placeholder]').each(function () {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            })
        });
    }
});
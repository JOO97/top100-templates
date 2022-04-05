(function ($) {
    "use strict"
    /*-------------------------------------------------------------------------------
   Search Trigger
   -------------------------------------------------------------------------------*/
    $(".search-trigger").on('click', function (e) {
        $(".search-form-wrapper").toggleClass('open');
    });
    /*-------------------------------------------------------------------------------
    Preloader
    -------------------------------------------------------------------------------*/
    // Name preloader
    var preloaderLetters = $('#letters'),
        letterItems = preloaderLetters.find('span');

    function doLetterAnim() {

        var delay = 200;
        letterItems.each(function (e, i) {
            var $this = $(this);
            setTimeout(function () {
                $this.addClass('appeared');
                if (e == letterItems.length - 1) {
                    $(".preloader-name").addClass('done');
                }
            }, 50 + e * delay)
        })

    }

    if (preloaderLetters.length) {
        doLetterAnim();
    }

    /*-------------------------------------------------------------------------------
    Jump To
    -------------------------------------------------------------------------------*/
    $('body').on('click', '.sigma-go-to', function (e) {
        e.preventDefault();

        var jumpTo = $(this).data('to');

        $("html, body").animate({
            scrollTop: $(jumpTo).offset().top
        }, 600);
        return false;

    });

    /*-------------------------------------------------------------------------------
    Mobile Navigation and Aside panels
    -------------------------------------------------------------------------------*/
    $(".aside-trigger").on('click', function () {
        $("body").toggleClass('aside-open');
    });

    $(".aside-trigger-right").on('click', function () {
        $("body").toggleClass('aside-right-open');
    });

    $(".sigma_aside .menu-item-has-children > a").on('click', function (e) {
        var submenu = $(this).next(".sub-menu");
        e.preventDefault();

        submenu.slideToggle(200);
    });


    /*-------------------------------------------------------------------------------
    Sticky Header
      -------------------------------------------------------------------------------*/
    var header = $(".can-sticky");
    var headerHeight = header.innerHeight();

    function doSticky() {
        if (window.pageYOffset > headerHeight + 120) {
            header.addClass("sticky");
        } else {
            header.removeClass("sticky");
        }
    }

    doSticky();


    /*-------------------------------------------------------------------------------
    on scroll functions
    -------------------------------------------------------------------------------*/
    $(window).on('scroll', function () {

        // Sticky header
        doSticky();

        // Back to top
        stickBackToTop();

    });


    /*-------------------------------------------------------------------------------
    Back to top
    -------------------------------------------------------------------------------*/
    function stickBackToTop() {
        if (window.pageYOffset > 400) {
            $('.sigma_to-top').addClass('active');
        } else {
            $('.sigma_to-top').removeClass('active');
        }
    }

    stickBackToTop();

    $('body').on('click', '.sigma_to-top', function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    /*-------------------------------------------------------------------------------
    Masonry
    -------------------------------------------------------------------------------*/
    $('.masonry').imagesLoaded(function () {
        var isotopeContainer = $('.masonry');
        isotopeContainer.isotope({
            itemSelector: '.masonry-item',
        });
    });


    /*-------------------------------------------------------------------------------
    Countdown
    -------------------------------------------------------------------------------*/
    $(".sigma_countdown-timer").each(function () {
        var $this = $(this);
        $this.countdown($this.data('countdown'), function (event) {
            $(this).text(
                event.strftime('%D days %H:%M:%S')
            );
        });
    });

    /*------------------------------------------------------------------------------------
    Tooltips
    -------------------------------------------------------------------------------*/

    $('.popup-sigma a').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    //On scroll events
    $(window).on('scroll', function () {

        doSticky();
        stickBackToTop();

    });
    /*-------------------------------------------------------------------------------
    Gallery Format Slider
    -------------------------------------------------------------------------------*/
    $(".sigma_post.format-gallery .sigma_post-thumb.has-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        autoplay: false,
        centerMode: true,
        centerPadding: 0,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    arrows: false
                }
            }
        ]
    });
    /*-------------------------------------------------------------------------------
      Ajax Search
    -------------------------------------------------------------------------------*/

    /* Perform a delay before executing a function (callback) */
    function delay(callback, ms) {
        var timer = 0;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                callback.apply(context, args);
            }, ms || 0);
        };
    }

    $(".sigma-ajax-search-wrap .search-field").on('keyup', delay(function () {

        var val = $(this).val();

        doAjaxProductSearch(val);

    }, 500));

    $(document).on('mouseup', function (e) {
        var container = $(".medtab-product-search-results");

        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
        }

    });


    function doAjaxProductSearch(val) {

        $(".sigma-ajax-search-wrap .woocommerce-product-search button").html('<i class="fa fa-spin fa-spinner"></i>');

        $.ajax({
            url: ajax_woocommerce_object.ajaxurl,
            type: "post",
            data: {
                action: 'medtab_ajax_search_content',
                keyword: val,
            },
            success: function (response) {
                $(".medtab-product-search-results").show();
                $(".sigma-ajax-search-wrap .woocommerce-product-search button").html('<i class="flaticon-search"></i>');
                $(".medtab-product-search-results").html(response);
            }
        });
    }

    /*-------------------------------------------------------------------------------
      Infinite Scroll
      -------------------------------------------------------------------------------*/
    if ($('.scroller-status').length) {
        $('.medtab_product-infinite-scroll #main div.products').infiniteScroll({
            path: '.woocommerce-pagination a.next',
            append: '.sigma_product',
            status: '.scroller-status',
            hideNav: '.woocommerce-pagination',
            history: false,
        });
    }


    /*-------------------------------------------------------------------------------
    Cookies
    -------------------------------------------------------------------------------*/
    function setCookie(cname, cvalue, days) {

        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else {
            var expires = "";
        }
        document.cookie = cname + "=" + cvalue + expires + "; path=/";
    }

    //Return a particular cookie
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    //Checks if a cookie exists
    function checkCookie(cookieToCheck) {
        var cookie = getCookie(cookieToCheck);
        if (cookie != "") {
            return true;
        }
        return false;
    }

    //Delet an existing cookie
    function deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    /*-------------------------------------------------------------------------------
   Newsletter popup close and set cookie
   -------------------------------------------------------------------------------*/

    /*-------------------------------------------------------------------------------
    Header login/Register popup
   -------------------------------------------------------------------------------*/
    $('.register-new-account').not('.register-new-account.active').on('click', function (e) {
        e.preventDefault();

        $('.login-register-form-toggle').addClass('visible');
        $('.login-form-wrapper').addClass('hidden');
        $('.header-login-register-form .sigma_close').addClass('hidden');
        $('.registration-form-wrapper').addClass('active');
    });

    $('.login-register-form-toggle').on('click', function (e) {
        e.preventDefault();
        $(this).removeClass('visible');
        $('.login-form-wrapper').removeClass('hidden');
        $('.registration-form-wrapper').removeClass('active');
    });

    /*-------------------------------------------------------------------------------
    Password Toggle Js
    -------------------------------------------------------------------------------*/
    $(".password-toggle").on('click', function () {
        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $(this).next(),
            inputType = input.attr("type") == "password"
                ? 'text'
                : 'password';

        input.attr("type", inputType);
    });

    /*-------------------------------------------------------------------------------
     Doctor Socials Trigger
     -------------------------------------------------------------------------------*/
    $("a.trigger-doctor-socials").on('click', function (e) {
        e.preventDefault();
        $(this).prev('.sigma_social-icons').toggleClass('visible');
    });


    /*-------------------------------------------------------------------------------
     One page menu scroll
     -------------------------------------------------------------------------------*/
    var headerHeight = $('header.sigma_header').outerHeight();

    if ($('body').hasClass('admin-bar')) {
        headerHeight = headerHeight + 32;
    }

    if ($('body').hasClass('medtab-one-page-menu')) {
        $('.sigma-one-page-section').each(function () {
            $(this).next().addClass('scroll-to-block');
        });
        $('.sigma_header .navbar-nav li').find('a').each(function () {
            $(this).addClass('scroll-to-link');
        });
    }
    $('.scroll-to-link').on('click', function () {
        if ($(this).attr('href').indexOf('http://') > -1 || $(this).attr('href').indexOf('https://') > -1) {
            window.location.href = $(this).attr('href').replace(/^#/, '');
            return;
        }
        var index = $(this).parent().parent().find('.scroll-to-link').index(this);
        $('body, html').animate({'scrollTop': ($('.scroll-to-block').eq(index).offset().top - headerHeight) + 'px'}, 800);
        console.log($('.scroll-to-block').eq(index).offset().top);
        return false;
    });


    /*----------------------------------------------------------
    Popup
    ---------------------------------------------------------*/

    var modalWrapper = $("#sigma_popup-newsletter, #sigma_newsletter-popup");
    var modalCookiesType = modalWrapper.data('enable-type') != '' && modalWrapper.data('enable-type') != undefined ? modalWrapper.data('enable-type') : '';

    function medtab_popup_init() {
        var popupHideSeconds = modalWrapper.data('close-delay') != '' && modalWrapper.data('close-delay') != undefined ? parseInt(modalWrapper.data('close-delay')) : '';
        var popupTriggerType = modalWrapper.data('close-trigger-type') != '' && modalWrapper.data('close-trigger-type') != undefined ? modalWrapper.data('close-trigger-type') : '';

        // on load popup
        $(window).on('load', function () {

            // Newsletter popup
            $("#sigma_popup-newsletter.popup-onload, #sigma_newsletter-popup.popup-onload").each(function () {
                var popupWrapper = $(this),
                    popupDelaySeconds = popupWrapper.data('delay') != '' && popupWrapper.data('delay') != undefined ? parseInt(popupWrapper.data('delay')) : 3;
                setTimeout(function () {
                    $("#sigma_popup-newsletter.popup-onload").modal('show');
                    $(".sigma_popup").addClass('show');
                }, popupDelaySeconds * 1000);

                if (popupTriggerType == 'trigger-delay' && popupHideSeconds != '') {
                    setTimeout(function () {
                        $("#sigma_popup-newsletter.popup-onload").modal('hide');
                        $(".sigma_popup").removeClass('show');
                    }, popupHideSeconds * 1000);
                }

            });
        });

        // on scoll popup
        $(window).on('scroll', function () {
            var scroll = $(this).scrollTop();
            $("#sigma_popup-newsletter.popup-onscroll, #sigma_newsletter-popup.popup-onscroll").each(function () {
                if (scroll >= 350) {
                    $('#sigma_popup-newsletter.popup-onscroll').modal('show');
                    $(".sigma_popup").addClass('show');
                }
                if (popupTriggerType == 'trigger-delay' && popupHideSeconds != '') {
                    setTimeout(function () {
                        $("#sigma_popup-newsletter.popup-onscroll").modal('hide');
                        $(".sigma_popup").removeClass('show');
                    }, popupHideSeconds * 1000);
                }
            });
        });

        // on click popup
        $('body').on('click', '.sigma-popup-trigger', function (e) {
            e.preventDefault();
            $('#sigma_popup-newsletter.popup-onclick, #sigma_newsletter-popup.popup-onclick').modal('show');
            $(".sigma_popup").addClass('show');

            if (popupTriggerType == 'trigger-delay' && popupHideSeconds != '') {
                setTimeout(function () {
                    $("#sigma_popup-newsletter.popup-onclick").modal('hide');
                    $(".sigma_popup").removeClass('show');
                }, popupHideSeconds * 1000);
            }
        });

    }

    if (modalCookiesType == 'popup-show-refresh-reload') {
        medtab_popup_init();
    } else {
        $(".newsletter-popup-trigger, .sigma-popup-close-trigger").on('click', function () {
            setCookie('newsletter_popup_viewed', 'true');
            $(".sigma_popup").removeClass('show');
        });

        $('#sigma_popup-newsletter').on('hidden.bs.modal', function () {
            setCookie('newsletter_popup_viewed', 'true');
        });

        if (!checkCookie('newsletter_popup_viewed')) {
            medtab_popup_init();
        }
    }

    // close trigger
    $('body').on('click', '.sigma-popup-close-trigger, .newsletter-popup-trigger', function (e) {
        e.preventDefault();
        $('#sigma_popup-newsletter').modal('hide');
        $(".sigma_popup").removeClass('show');
    });

    // on load popup
    $(window).on('load', function () {
        // preloader
        $('.sigma_preloader').addClass('hidden');

    });

})(jQuery);

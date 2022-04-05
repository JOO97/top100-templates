;var beclinic_Woo_Module;


(function ($) {
	"use strict";


	beclinic_Woo_Module = {

		init: function () {
			this.wooHeaderCart();
			this.wooProductHover();
			this.wooProductElementsPos();
		},

		wooHeaderCart: function () {
			var headerCartButton = $('.header-cart__link-wrap'),

			toggleButton = function (e){
				e.preventDefault();
				$('.header-cart__content').toggleClass('show');
			};

			headerCartButton.on('click', toggleButton );

		},

		wooProductHover: function () {
			$('.woocommerce #main').delegate('.products .product:not(.product-list)', 'mouseenter mouseleave', function (event) {
				if (event.type === 'mouseenter') {
					$(this).addClass('hover');
				}
				if (event.type === 'mouseleave') {
					var temp = $(this);
					setTimeout(function () {
						temp.removeClass('hover');
					}, 100);
				}
			});

		},

		wooProductElementsPos: function () {
			if (jQuery('.single-product .summary .onsale').size() > 0) {
				$('.single-product .product').each(function() {
					var onsale = $(this).find('.summary .onsale'),
						thumb = $(this).find('.images');

					onsale.appendTo(thumb);
				});
			}

			/*if (jQuery('.single-product #comments').size() > 0) {
				$('.commentlist .review').each(function() {
					var rating = $(this).find('.star-rating'),
						author = $(this).find('.woocommerce-review__author');
					
					rating.appendTo(author);
				});
			}*/
		},

	};

	beclinic_Woo_Module.init();

}(jQuery));
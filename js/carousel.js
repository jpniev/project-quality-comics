function animateBanners(){
	$('#banners').owlCarousel({
	   			animateOut: 'slideOutDown',
	    		animateIn: 'flipInX',
	    		items:1,
	    		margin:30,
	    		stagePadding:30,
	    		autoplay: true,
	    		autoplayTimeout: 4000,
	    		loop: true

			});
}



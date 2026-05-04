$('.test_active_2').slick({
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: false,
	autoplaySpeed: 2000,
	speed: 1500,
	arrows: true,
	responsive: [
	  {
		breakpoint: 1200,
		settings: {
		  arrows: false,
		  autoplay: true,
		}
	  },
	  {
		breakpoint: 992,
		settings: {
		  slidesToShow: 1,
		  arrows: false,
		  autoplay: true,
		}
	  },
	  {
		breakpoint: 767,
		settings: {
		  slidesToShow: 1,
		  arrows: false,
		  autoplay: true,
		}
	  },
	]
  });  



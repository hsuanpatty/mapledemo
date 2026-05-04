$(document).ready(function () {

  const $window = $(window);
  const $body = $('body');
  const $goTopButton = $('#goTop');
  const $menu = $('.menu-height');
  const $sections = $('.scroll-target section');
  const $navLinks = $('.scroll-tag li');
  const burger = document.getElementById("burger");

  const $tabs = $(".tabs li");
  const $contents = $(".tab-content");
  const $carouselItems = $('.carousel__item');

  let currentIndex = 1;

  /* =========================
     NAV HEIGHT (CSS VAR)
  ========================= */
  function setNavHeightVar() {
    const navHeight = $('.menu-height').outerHeight();
    document.documentElement.style.setProperty('--nav-h', navHeight + 'px');
  }

  /* =========================
     BODY PADDING TOP
     PC = 65px / Mobile = 50px
  ========================= */
  function setPaddingTop() {
    const isDesktop = $(window).width() >= 992;
    const padding = isDesktop ? '65px' : '50px';
    $body.css('padding-top', padding);
  }

  function initLayout() {
    setNavHeightVar();
    setPaddingTop();
  }

  initLayout();

  $(window).on('resize', function () {
    initLayout();
  });

  /* =========================
     SCROLL SYSTEM
  ========================= */
  let ticking = false;

  handleScroll();

  $window.on('scroll resize', function () {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });

  function handleScroll() {
    const scrollTop = $window.scrollTop();
    const menuH = $('.menu-height').outerHeight();

    // goTop button
    $goTopButton.toggleClass('show', scrollTop > 200);

    // navbar effect
    $menu.toggleClass('scrolled', scrollTop > 10);

    // active section
    $sections.each(function (index) {
      const sectionTop = $(this).offset().top;

      if (scrollTop + menuH >= sectionTop - 10) {
        $navLinks.removeClass('on');
        $navLinks.eq(index).addClass('on');
      }
    });

    ticking = false;
  }

  /* =========================
     GO TOP
  ========================= */
  $goTopButton.on('click', function (e) {
    e.preventDefault();
    $('html, body').stop().animate({ scrollTop: 0 }, 800);
  });

  /* =========================
     NAV CLICK SCROLL
  ========================= */
  $navLinks.on('click', function (e) {
    e.preventDefault();

    const index = $(this).index();
    const $target = $sections.eq(index);

    $('html, body').stop().animate({
      scrollTop: $target.offset().top - $('.menu-height').outerHeight() + 1
    }, 800);

    $menu.removeClass('open');
    $body.css({ overflow: '' });
  });

  /* =========================
     BURGER MENU
  ========================= */
  if (burger) {
    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      $menu.toggleClass('open');
      $body.css({ overflow: $menu.hasClass('open') ? 'hidden' : '' });
    });
  }

  $(document).on("click", function (e) {
    if (!$(e.target).closest('.menu-height').length) {
      $menu.removeClass('open');
      $body.css({ overflow: '' });
    }
  });

  /* =========================
     TABS
  ========================= */
  function showTab(tabId) {
    $contents.hide();
    $("#" + tabId).show();

    $tabs.removeClass("active");
    $('.tabs li[data-tab="' + tabId + '"]').addClass("active");
  }

  $tabs.on("click", function () {
    showTab($(this).data("tab"));
  });

  if ($tabs.length > 0) {
    showTab($tabs.first().data("tab"));
  }

  /* =========================
     CAROUSEL
  ========================= */
  function renderCarousel() {
    const total = $carouselItems.length;

    $carouselItems.removeClass(
      'carousel__item--main carousel__item--left carousel__item--right'
    );

    $carouselItems.eq(currentIndex).addClass('carousel__item--main');
    $carouselItems.eq((currentIndex - 1 + total) % total).addClass('carousel__item--left');
    $carouselItems.eq((currentIndex + 1) % total).addClass('carousel__item--right');
  }

  renderCarousel();

  $('#rightBtn').on('click', () => {
    currentIndex = (currentIndex + 1) % $carouselItems.length;
    renderCarousel();
  });

  $('#leftBtn').on('click', () => {
    const total = $carouselItems.length;
    currentIndex = (currentIndex - 1 + total) % total;
    renderCarousel();
  });

  /* =========================
     ACCORDION
  ========================= */
  $('.details-item summary').on('click', function (e) {
    const $parent = $(this).parent();

    if ($parent.prop('open')) {
      e.preventDefault();
      return;
    }

    $('.details-item').not($parent).removeAttr('open');
  });

});
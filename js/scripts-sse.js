/*
 * Scripts File
 * Author: Vic Lobins
 *
*/

function updateViewportDimensions() {
	"use strict";
	
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return { width:x,height:y };
}
// setting the viewport width
var viewport = updateViewportDimensions();

var clients = {
	branding : [
        'cape',
        'kerry',
		'ebico',
		'mencap',
		'qatargas',
		'tesco'
	],
	internal_communications : [
		'gatwick',
		'noble-foods',
		'royal-london',
		'serco',
		'shell',
		'southeastern-internal'
	],
	digital: [
        'chesneys',
        'urbaneat',
        'cdc',
        'ftse',
        'stair-estates',
        'southeastern'
	]
};

$(document).ready(function(){
	
	"use strict";
	
	viewport = updateViewportDimensions();
	
	// Client and ajax filter
	var postHtml = {},
		clientLinkHref,
		$nav = $('nav.main'),
		$clientElement = $('.client-list li'),
		$clientLink = $('.client-list a'),
		$contentArea = $('.content'),
		$content;
	
	function clientFilter(hash) {
		if( !hash ) {
			hash = window.location.hash.substring(1);
		}
		
		if( hash === 'all' ) {
			$clientElement.removeClass('hide').addClass('show');
		} else if( clients[hash] ) {
			$clientElement.removeClass('show').addClass('hide');
			
			clients[hash].forEach(function(entry) {
				$clientElement.each(function() {
					if( $(this).is('.'+entry) ) {
						$(this).removeClass('hide').addClass('show');
					}
				});
			});
		} else {
			$clientElement.removeClass('show').addClass('hide');
		}
		
		if( hash ) {
			$('nav.main a').not('.'+hash).removeClass('active');
			$('nav.main a.'+hash).addClass('active');
		}
	}
	
	function checkLoad(i) {
		if( i === 'back' ) {
			if( $content ) { $content.remove(); }
			$('.client-list').show();
		} else {
			if( !postHtml[i] ) {
				setTimeout(checkLoad, 200);
			} else {
				$content = postHtml[i];
				$('.client-list').hide();
				$contentArea.prepend($content);
				
				$('.section:not(.single)').slick({
					dots: true,
					infinite: true,
					speed: 300,
					slidesToShow: 1,
					focusOnSelect: true
				});
				
				$('.slick-slide').first().focus();
			}
		}
	}
	
	$(document).on('click', 'nav.main li a:not(.logo)', function(){
		var href = $(this).attr("href"),
			hash = href.substr(href.indexOf("#")).substring(1);
		$('.section:not(.single)').slick('unslick');
		clientFilter(hash);
		checkLoad('back');
	});
	
	$clientLink.each(function(i, el){	
		$(el).on('mouseover', function(){
			clientLinkHref = $(el).attr('href');
			
			if( !postHtml[i] ) {
				$.ajax({
					url: clientLinkHref,
					type: 'GET',
					success: function(data) {
						postHtml[i] = $(data).find('.content').contents();
					}
				});
			}
		});
		
		$(el).on('click', function(e){
			e.preventDefault();
			checkLoad(i);
		});
	});
	
	$.ajax({
		url: '/portfolio/nav-sse.html',
		type: 'GET',
		success: function(data) {
			$nav.prepend(data);
			clientFilter();
		}
	});
	
	
	// Cycler
	function cyclerStag() {
		$.each( $('.cycler.staggered'), function(i, el){
			var $active = $(el).find('.active');
			var $next = ($active.next().length > 0) ? $active.next() : $(el).find('img:first');
			$next.css('z-index',2);
			$active.stop(true, true).delay(i * 350).fadeOut(500,function(){
				$active.css('z-index',1).show().removeClass('active');
				$next.css('z-index',3).addClass('active');
			});
		});
	}
	setInterval(cyclerStag, 3000);

	function cyclerFade() {
		$.each( $('.cycler.fader'), function(i, el){
			var $active = $(el).find('.active');
			var $next = ($active.next().length > 0) ? $active.next() : $(el).find('img:first');
			$next.css('z-index',2);
			
			$active.fadeOut(500,function(){
				$active.css('z-index',1).show().removeClass('active');
				$next.css('z-index',3).addClass('active');
			});
		});
	}
	setInterval(cyclerFade, 4000);
	
	// Video functions
	$(document).on('afterChange init', '.section:not(.single)', function(event, slick) {
		slick = $(slick.$slider);
		var currentSlide = slick.find('.slick-current'),
			video = currentSlide.find('video[autoplay]').get(0);
		if( video ) { video.play(); }
	});

	$(document).on('click', '.play_btn', function() {
		var video = $('#' + $(this).data('video-id')).get(0),
			isPlaying = video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2;
		$(this).find('.btn-inner').hide();
		$(this).find('.controls').show();
		
		if(video.paused && !isPlaying) {
			$(this).addClass('is-playing');
			$(this).removeClass('is-paused');
			video.play();
		} else {
			$(this).addClass('is-paused');
			$(this).removeClass('is-playing');
			video.pause();
		}

		$('#' + $(this).data('video-id')).on('timeupdate', function() {
			var currentPos = video.currentTime,
				maxduration = video.duration,
				percentage = 100 * currentPos / maxduration;
			$(this).next('.timeBar').css('width', 'calc(' + percentage + '% - 30px)');
		});

		return false;
	});
	
	$(document).on('click', '.audio_btn', function(){
		$(this).toggleClass('is-muted');
		var video = $( '#' + $(this).data('video-id') );
		video.prop('muted', !video.prop('muted'));
	});
	
	
	// Text fade function
	$('.txt-animate .fade-animate').each(function(i, el){
		var delay = $(el).data('speed');
		$(el).animate({
			'opacity' : 1,
		}, delay*20);
	});
	
	
	//Slick slider
	$('.section:not(.single)').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		focusOnSelect: true
	});
	
	$('.slick-slide').first().focus();
	
});
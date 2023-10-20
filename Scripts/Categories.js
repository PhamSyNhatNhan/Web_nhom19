$(".i_header_1 > span").click(function () {
    var $languageContent = $(this).find(".i_language_content");
    $languageContent.toggle(50);
});

$(".i_header_1 > span").mouseleave(function () {
    var $languageContent = $(this).find(".i_language_content");
    $languageContent.hide(50);
});

$(".i_language_content").mouseenter(function () {
    $(this).stop(true, true);
});

$(document).ready(function() {
    var $ImainContainers = $('.ct_container');

    $ImainContainers.each(function() {
        var container = $(this);
        var slider = container.find('.slider');
        var slides = slider.children('li');
        var progress = container.find('.progress');
        var progressContainer = container.find('.progress_bar_sub');
        var prevButton = container.find('.slider-controls > .prev-button_ct');
        var nextButton = container.find('.slider-controls > .next-button_ct');

        let currentSlideIndex = 0;
        let autoAdvanceTimer;
        let slideDuration = 2000; 

        function goToSlide(index) {
            if (index >= 0 && index < slides.length) {
            slides.css('display', 'none');
            slides.eq(index).css('display', 'block');
            }
        }
        
        function nextSlide() {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            goToSlide(currentSlideIndex);
            updateProgressBar();
        }

        function prevSlide() {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            goToSlide(currentSlideIndex);
            updateProgressBar();
        }
        
        
        nextButton.click(nextSlide);
        prevButton.click(prevSlide);

        var slideshowContainer = container;

        slideshowContainer.on('mouseover', function() {
            clearInterval(autoAdvanceTimer);
        });

        slideshowContainer.on('mouseout', function() {
            autoAdvanceTimer = setInterval(nextSlide, slideDuration);
        });

        prevButton.on('mouseover', function() {
            clearInterval(autoAdvanceTimer);
        });

        prevButton.on('mouseout', function() {
            autoAdvanceTimer = setInterval(nextSlide, slideDuration);
        });

        nextButton.on('mouseover', function() {
            clearInterval(autoAdvanceTimer);
        });

        nextButton.on('mouseout', function() {
            autoAdvanceTimer = setInterval(nextSlide, slideDuration);
        });

        autoAdvanceTimer = setInterval(nextSlide, slideDuration);

        function hideAllSlides() {
            slides.css('display', 'none');
        }

        progress.css('width', (1000 / slides.length) + 'px');

        function updateProgressBar() {
            var maxProgressBarPosition = 1000 - (1000 / slides.length);
            var slideWidth = 100 / (slides.length - 1); 
            var progressWidth = slideWidth * currentSlideIndex;

            
            progress.css('left', `${maxProgressBarPosition * (progressWidth/100)}px`);
        } 

        hideAllSlides();
        slides.eq(currentSlideIndex).css('display', 'block');

        updateProgressBar();

        progressContainer.click(function(event) {
            var progressX = progress.offset().left;
            var clickX = event.clientX;
            
            if (clickX < progressX) {
                prevSlide();
            } else {
                nextSlide();
            }

        });
    });
});
  
  
$(document).ready(function() {
    $('.ct_shop_conteiner').hide();
    $('.ct_shop_conteiner[data-index="1"]').show();

    $('.tab').click(function() {
        $('.tab').removeClass('active_ct');
        var dataIndex = $(this).data('index');
        
        $('.ct_shop_conteiner').hide();
        $('.ct_shop_conteiner[data-index="' + dataIndex + '"]').show();
        
        $(this).addClass('active_ct');
    });

    $('.tab[data-index="1"]').click();
});


$(".ct_shop_sub_conteiner > ul").hide();

$(".ct_shop_sub_conteiner").each(function() {
    var container = $(this);
    var containerButton = container.find('div:nth-child(1)');
    var containerContent = container.find('ul');
    var containerArrow = containerButton.find('.ct_shop_sub_conteiner_arrow');

    var isContentVisible = false;

    $(containerButton).click(function() {
        isContentVisible = !isContentVisible;
        $(containerContent).slideToggle();
        containerArrow.text(isContentVisible ? 'v' : '>');
    });
});


$('.ct_shop_sub_reset').click(function(){
    $(".ct_shop_sub_conteiner > ul").hide();  
    $('.ct_shop_sub_conteiner_arrow').text('>')
});

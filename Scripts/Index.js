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

$(".i_main_far > ul > li").each(function() {
    var $mainImage = $(this).find("a > div:first-of-type > img");
    var initialSrc = $mainImage.attr('src');
    $mainImage.attr('data-initial-src', initialSrc);

    $(this).find("a > div:last-of-type > div:first-of-type > div > img").mouseenter(function() {
        var newImageUrl = $(this).attr('src');
        $mainImage.attr('src', newImageUrl);
    });

    $(this).find("a > div:last-of-type > div:first-of-type > div > img").mouseleave(function() {
        $mainImage.attr('src', initialSrc);
    });
});

var subContainers = $('.i_main_li_sub');

subContainers.each(function () {
    var container = $(this);
    var imageList = container.find('ul.mar_pad li');
    var currentIndex = 0;
    
    function showImage(index) {
        imageList.css('display', 'none');
        imageList.eq(index).css('display', 'block');
    }
    
    function nextImage() {
        currentIndex = (currentIndex + 1) % imageList.length;
        showImage(currentIndex);
    }
    
    showImage(currentIndex);

    var interval = setInterval(function () {
        nextImage();
    }, 2000);
    
    container.on('mouseout', function () {
        interval = setInterval(function () {
            nextImage();
        }, 2000);
    });
    
    container.on('mouseover', function () {
        clearInterval(interval);
    });
});



$(document).ready(function() {
    var $ImainContainers = $('.i_main_container');

    $ImainContainers.each(function() {
        var container = $(this);
        var slider = container.find('.slider');
        var slides = slider.children('li');
        var prevButton = container.find('.slider-container > .prev-button');
        var nextButton = container.find('.slider-container > .next-button');
        var dotsContainer = container.find('.i_main_con_sub');
        var dots = [];
    
        let currentSlideIndex = 0;
        let autoAdvanceTimer;
    
        function goToSlide(index) {
            if (index >= 0 && index < slides.length) {
                slides.css('display', 'none');
                slides.eq(index).css('display', 'block');
            }
        }
    
        function nextSlide() {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            goToSlide(currentSlideIndex);
            updateActiveDot();
        }
    
        function prevSlide() {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            goToSlide(currentSlideIndex);
            updateActiveDot();
        }
    
        nextButton.click(nextSlide);
        prevButton.click(prevSlide);
    
        slider.on('mouseover', function() {
            clearInterval(autoAdvanceTimer);
        });
    
        prevButton.on('mouseover', function() {
            clearInterval(autoAdvanceTimer);
        });
    
        nextButton.on('mouseover', function() {
            clearInterval(autoAdvanceTimer);
        });
    
        slider.on('mouseout', function() {
            autoAdvanceTimer = setInterval(nextSlide, 2000);
        });
    
        autoAdvanceTimer = setInterval(nextSlide, 2000);
    
        function hideAllSlides() {
            slides.css('display', 'none');
        }
    
        function updateActiveDot() {
            dotsContainer.find('.dot').removeClass('active-dot');
            dots[currentSlideIndex].addClass('active-dot');
        }
    
        hideAllSlides();
        slides.eq(currentSlideIndex).css('display', 'block');
    
        slides.each(function(index) {
            var dot = $('<div class="dot" data-slide-index="' + index + '"></div>');
    
            dot.on('mouseover', function() {
                clearInterval(autoAdvanceTimer);
            });
    
            dot.on('mouseout', function() {
                autoAdvanceTimer = setInterval(nextSlide, 2000);
            });
    
            dot.on('click', function() {
                var index = $(this).data('slide-index');
                currentSlideIndex = index;
                goToSlide(index);
                updateActiveDot();
            });
    
            dots.push(dot);
            dotsContainer.append(dot);
        });
    
        dots[currentSlideIndex].addClass('active-dot');
    });        
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var browseBycategory = $('.i_main_bbc > ul > li > div > div > a > div');
browseBycategory.each(function(){
    var randomColor = getRandomColor();
    var gradient = `linear-gradient(to top, ${randomColor}, rgba(255, 0, 0, 0))`;
    
    $(this).css('background-image', gradient);
});

$(document).ready(function() {
    $('.i_main_sh_conteiner[data-index="1"]').show();
    
    $('.tab').click(function() {
        $('.tab').removeClass('active');
        var dataIndex = $(this).data('index');
        
        $('.i_main_sh_conteiner').hide();
        $('.i_main_sh_conteiner[data-index="' + dataIndex + '"]').show();
        
        $(this).addClass('active');
    });
});

$(document).ready(function() {
    const container = $('.preview_game_container');

    container.on('mouseenter', function() {
        const video = $(this).find('video')[0];
        if (video) {
            video.currentTime = 0; 
            video.play(); 
        }
    });

    container.on('mouseleave', function() {
        const video = $(this).find('video')[0];
        if (video) {
            video.pause();
        }
    });
});

$(".best_seller_body .topseller_charts > tbody > tr").each(function () {
    var $changeColumn = $(this).find("td:nth-child(4)");
    var content = $changeColumn.text();
    if (content.includes("▲")) {
        $changeColumn.css("color", "green");
    } else {
        $changeColumn.css("color", "rgb(237, 184, 121)");
    }
});

function changeMedia(type, source) {
    const largeMedia = document.getElementById('largeMedia');
    const largeVideo = document.getElementById('largeVideo');

    if (type === 'image') {
        largeMedia.style.display = 'block';
        largeVideo.style.display = 'none';
        largeMedia.src = source;
    } else if (type === 'webm') {
        largeMedia.style.display = 'none';
        largeVideo.style.display = 'block';
        largeVideo.src = source;
    }
}

$(document).ready(function () {
    $(".system_option").click(function () {
        $(".system_option").removeClass("active");
        $(this).addClass("active");
    });
});

$(document).ready(function () {
    $(".show_more_languages").click(function () {
        const viewMoreLanguageRows = $(".languages_support tbody tr:hidden");

        if (viewMoreLanguageRows.length > 0) {
            viewMoreLanguageRows.css('display', 'table-row');
            $(this).css('display', 'none');
        }
    });
});

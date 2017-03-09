/**
 * Created by javad on 2/28/2017.
 */
// Gallary Slider Starts
$(document).ready(function () {

    var slideIndex = 1;
    showDivs(slideIndex);
    $(".pipeGallaryMySlidePrev").click(function () {
        showDivs(slideIndex += 1);
    });
    $(".pipeGallaryMySlideNext").click(function () {
        showDivs(slideIndex += -1);
    });

    $(".pipeGallaryDots").click(function () {
        var dots = document.getElementsByClassName("pipeGallaryDots");
        var n;
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" pipeGallaryDotsWhite", "");
            n = dots[i].id == this.id ? i : n;
            // alert(n);
        }
        showDivs(slideIndex = n + 1);
    });

    function showDivs(n) {
        var i;
        var x = document.getElementsByClassName("pipeGallaryMySlides");
        var dots = document.getElementsByClassName("pipeGallaryDots");
        if (n > x.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = x.length
        }
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" pipeGallaryDotsWhite", "");
        }
        x[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " pipeGallaryDotsWhite";
    }
});

//Gallary Slider Ends
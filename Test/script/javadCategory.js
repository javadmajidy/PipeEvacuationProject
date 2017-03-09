/**
 * Created by Arezo on 3/8/2017.
 */
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
/* Back to Top                                      -----------------------------------------------*/

$(document).ready(function() {
    $(".go-top").hide();
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $(".go-top").fadeIn(200);
        } else {
            $(".go-top").fadeOut(200);
        }
    });
    // Animate the scroll to top
    $(".go-top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 300);
    });
});

// 底部自适应

$(document).ready(function() {
    var wrapHeight = document.getElementById("wrap1").offsetHeight;
    // var wrapHeight = $("#wrap").height();
    console.log(wrapHeight);
    var winHeight = window.innerHeight;
    console.log(winHeight);
    console.log($("#wrap1").length);
    if (wrapHeight < winHeight && $("#wrap1").length > 0) {
        $("#wrap1").height(winHeight);
        $("footer").css("position", "absolute");
    }
});
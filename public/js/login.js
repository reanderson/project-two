$(".preloader").fadeOut(2000, function() {
  $(".content").fadeIn(1000);
});

$(function() {
  $("#login-form-link").click(function(e) {
    $("#login-form")
      .delay(100)
      .fadeIn(100);
    $("#register-form").fadeOut(100);
    $("#register-form-link").removeClass("active");
    $(this).addClass("active");
    e.preventDefault();
  });
  $("#register-form-link").click(function(e) {
    $("#register-form")
      .delay(100)
      .fadeIn(100);
    $("#login-form").fadeOut(100);
    $("#login-form-link").removeClass("active");
    $(this).addClass("active");
    e.preventDefault();
  });

  $(".tab a").on("click", function(e) {
    e.preventDefault();
    $(this)
      .parent()
      .addClass("active");
    $(this)
      .parent()
      .siblings()
      .removeClass("active");
    target = $(this).attr("href");

    $(".tab-content > div")
      .not(target)
      .hide();
    $(target).fadeIn(600);
  });

  $("#loginBtn").on("click", function(event) {
    event.preventDefault();
    const userInfo = {};
    userInfo.email = $("#userEmail").val();
    userInfo.password = $("#userPassword").val();
    if (userInfo.email === "" || userInfo.password === "") {
      return false;
    }
    $.ajax({
      url: "/signin",
      method: "POST",
      data: userInfo
    })
      .then(result => {
        console.log(result);
        if (result) {
          window.location.href = "/";
          $("#loginError").empty();
        }
      })
      .catch(err => {
        console.log("error");
        $("#loginError").text("Email or Password was incorrect");
      });
  });
});

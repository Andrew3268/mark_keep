//Header
$(document).ready(function() {
  var _responsiveNav = $(".responsive-nav"),
    _mainMenu = $("#primary-menu"),
    _responsiveMenu;

  if (_mainMenu.length) {
    $(".site-overlay").prepend(
      '<div id="responsive-menu" class="created-by-js">' +
        '<ul class="overlay-menu main-overlay" data-id="menu-item-0">' +
        _mainMenu.html() +
        "</ul></div>"
    );

    _responsiveMenu = $("#responsive-menu");

    _responsiveMenu.find("ul").each(function() {
      if ($(this).children("li").length > 7) {
        $(this).attr("data-size", 15);
      }
    });

    _responsiveMenu.find(".sub-menu").each(function() {
      var _parent = $(this).parent(),
        id = _parent.attr("id"),
        text = $(this)
          .siblings("a")
          .text();

      $(this).prepend(
        '<li class="mobile-parent-nav-menu-item">' +
          '<button class="menu-item-link-return" tabindex="-1">' +
          text +
          "</button></li>"
      );

      $(this)
        .appendTo(_responsiveMenu)
        .addClass("overlay-menu")
        .attr("data-id", id);
    });

    var _responsiveMenuList = _responsiveMenu
        .find(".overlay-menu")
        .children("li"),
      _responsiveMenuOpener = $(".responsive-nav"),
      responsiveMenuEnabled = true;

    _responsiveMenu.find("a").each(function() {
      var _link = $(this),
        _listItem = _link.parent();

      _link.addClass("immediate-propagation").on("click", function(e) {
        if ($(this).hasClass("back-to-menu")) {
          e.preventDefault();
        } else {
          _listItem = $(this).parent();

          if (_listItem.hasClass("menu-item-has-children")) {
            e.preventDefault();
            _listItem
              .parent()
              .removeClass("show")
              .addClass("hidden");
            setTimeout(function() {
              $('.overlay-menu[data-id="' + _listItem.attr("id") + '"]').addClass(
                "show"
              );
            }, 50);
          }
        }
      });
    });

    $(".menu-item-link-return").on("click", function(e) {
      e.preventDefault();

      var _parent = $(this).closest(".overlay-menu"),
        id = _parent.data("id");

      _responsiveMenu
        .find("#" + id)
        .parent()
        .removeClass("hidden")
        .addClass("show");

      $(this)
        .closest(".overlay-menu")
        .removeClass("show");
    });
  }

  if (_responsiveNav.length) {
    _responsiveNav.on("click", function(e) {
      _responsiveMenu = $("#responsive-menu");

      if (!$("body").hasClass("overlay-active")) {
        $("body").addClass("overlay-active");
        window.killBodyScrollTheProperWay(true);
      } else {
        $("body").removeClass("overlay-active");
        window.killBodyScrollTheProperWay(false);
        _responsiveMenu.find("ul").removeClass("hidden show");
      }

      e.preventDefault();
    });
  }

  //
  // Testing stuff
  //

  window.killBodyScrollTheProperWay = function(kill) {
    if (kill) {
      window.oldBodyPos = -$(window).scrollTop();
      $("body").addClass("kill-overflow");
      $("body").css("top", window.oldBodyPos);
      window.bodyHasScrollKilledTheProperWay = true;
    } else {
      $("body").removeClass("kill-overflow");
      if (
        document.location.hash != "" &&
        $(document.location.hash).length > 0 &&
        $(".responsive-nav").css("display") == "block"
      ) {
        window.oldBodyPos = -$(document.location.hash).offset().top;
      }
      $("body, html")
        .stop()
        .animate({ scrollTop: -window.oldBodyPos }, 0);
      window.bodyHasScrollKilledTheProperWay = false;
    }
  };
});

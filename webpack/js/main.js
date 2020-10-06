$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });

    patchAssetIntoDom('/assets/logos/cc/logomark.svg');
    patchAssetIntoDom('/assets/logos/products/open_source.svg');

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function () {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });

    $(".navbar-item.has-dropdown").click(function () {
        if ($(".navbar-burger").is(':visible')) {
            $(this).toggleClass("is-active");
        }
    });
    $(".navbar-item > .navbar-link").click(function (e) {
        if ($(".navbar-burger").is(':visible')) {
            e.preventDefault();
        }
    });
    $(window).resize(function () {
        if (!$(".navbar-burger").is(':visible') && $(".navbar-item.has-dropdown.is-active").length) {
            $(".navbar-item.has-dropdown.is-active").removeClass('is-active');
        }
    });

    $(window).scroll(function () {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        console.log(window.location.pathname);
        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            id = '#' + id;
            $('.menu-list a[href*="#"]').closest('a').removeClass('is-active');
            $('.menu-list').find('a[href=\"' + id + '\"]').addClass("is-active");
            $('.step a[href*="#"]').closest('a').find('.number').removeClass('is-active');
            $('.step').find('a[href=\"' + id + '\"]').find('.number').addClass('is-active');
        }
    });

    // Cache selectors
    var lastId

    if(window.location.pathname == '/cc-search/contribution-guide/')
        var topMenu = $(".step")
    else
        topMenu = $(".menu-list")

    var topMenuHeight = topMenu.outerHeight() + 1,
        // All list items
        menuItems = topMenu.find('a[href*="#"]'),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function (e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 850);
        e.preventDefault();
    });
});

const getFullyQualifiedUrl = (path, version) => {
    let baseUrl = "https://unpkg.com/@creativecommons/vocabulary"
    if (version) {
        baseUrl = `${baseUrl}@${version}`
    }
    return `${baseUrl}/${path}`
}

const patchAssetIntoDom = (asset, version = null) => {
    const ajax = new XMLHttpRequest();
    ajax.open("GET", getFullyQualifiedUrl(asset, version), true);
    ajax.onload = () => {
        var div = document.createElement("div");
        // Render SVG in the page
        div.innerHTML = ajax.responseText;
        div.style.display = 'none';
        document.body.insertBefore(div, document.body.childNodes[0]);
    }

    ajax.send();
}
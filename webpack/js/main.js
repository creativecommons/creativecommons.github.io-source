$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
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

$(document).ready(function () {
    patchAssetIntoDom('/assets/logos/cc/logomark.svg');
    patchAssetIntoDom('/assets/logos/cc/letterheart.svg');
});

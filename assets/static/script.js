$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 500) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    function darkoMode(){
        let darkstylesheet = document.querySelector('link[rel="stylesheet"][href$="static/dark.css"]')
        let darkbutton = document.getElementById("dark-button");
        darkbutton.addEventListener("click", darktoggle);
        if(!localStorage.getItem("dark")){
            darkOff();
        }else if (!isDark()){
            darkOff();
        }else if (isDark()){
            darkOn();
        }

        function isDark(){
            return localStorage.getItem("dark") == "true" ? true : false;
        }
        function darkOn(){
            localStorage.setItem("dark", "true");
            darkstylesheet.disabled = false;
        }
        function darkOff(){
            localStorage.setItem("dark", "false");
            darkstylesheet.disabled = true;
        }
        function darktoggle(e){
            if (!isDark()){
                darkOn();
            }
            else{
                darkOff();
            }
        } 
    }
    darkoMode();
});

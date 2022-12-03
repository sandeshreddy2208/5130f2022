$(document).ready(function(){

    function showWindow(){
        $('#main').show();
        //stop scroll
        $('html body').css('overflow' , 'hidden')
        // setTimeout(hideWindow,5000);
document.body.style.overflow = 'hidden';

    }
    // showWindow()

    function hideWindow(){
        $('#main').hide();
        //on scroll
        $('html body').css('overflow','hidden')
document.body.style.overflow = 'hidden';

    }
    // hideWindow()


    setTimeout(showWindow,2000);

    $("#submit-button").click(function(){
        hideWindow(); 
    })

})
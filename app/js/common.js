$(document).ready(function () {

    //маска ввода номера телефона
    $(function () {
        $("input[name=phone]").mask("+7 (999) 999-99-99");
    });

    //попап окна
    let popupLinkClassSelector = '.popup'
    let popupWindowClass = 'mfp_popup_window'

    $(popupLinkClassSelector).magnificPopup({
        type: 'inline',

        fixedContentPos: true,
        fixedBgPos: true,
        mainClass: popupWindowClass,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 600,
        zoom: {
            enabled: true,
            duration: 600
        },
    });

    //плавный скролл по странице

    $("a[href^='#'].scroll").click(function () {
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top + "px"}, $(_href).offset().top / 5, 'swing',);
        return false;
    });

    //отправка формы обратной связи
    $(".js_form_ajax_post").on('submit', function (event) {
        console.log($(this));
        $.ajax({
            url: "mailer.php", //url страницы
            type: "POST", //метод отправки
            dataType: "html", //формат данных
            data: $(this).serialize(),  // Сеарилизуем объект
            success: function () { //Данные отправлены успешно
                console.log('ajax sucсesfull');
                $("#js_popup_greeting").children(".js_popup_message_success").show();
                $("#js_popup_greeting").children(".js_popup_message_fail").hide();
                $.magnificPopup.open({items: {src: "#js_popup_greeting", type: "inline"}});
                setTimeout(function () {
                    $("#js_popup_greeting").delay(600).fadeOut(300);
                    setTimeout(function () {
                        $.magnificPopup.close()
                    }, 900);//тайминг исчезновения окна
                }, 2000);//тайминг показа окна спасибо за заявку
                setTimeout(function () {/*document.location.reload(false)*/
                    ;
                }, 2000);
            },
            error: function () { // Данные не отправлены
                console.log('ajax error');
                $("#js_popup_greeting").children(".js_popup_message_success").hide();
                $("#js_popup_greeting").children(".js_popup_message_fail").show();
                $.magnificPopup.open({items: {src: "#js_popup_greeting", type: "inline"}});
                setTimeout(function () {
                    $("#js_popup_greeting").delay(600).fadeOut(300);
                    setTimeout(function () {
                        $.magnificPopup.close()
                    }, 900);//тайминг исчезновения окна
                }, 2000);//тайминг показа окна спасибо за заявку
                setTimeout(function () {/*document.location.reload(false)*/
                        ;
                    }
                    , 2000);
            }
        });
        return false;
    });

    //несколько каруселей картинок на странице
    const sliderContainersClasses = ['.section_1','.s3']; //корневой элемент карусели (секция)
    const sliderWrapperClass = '.jsSliderWr'; //класс карусели
    const sliderButtonPrevClass = '.jsSliderPrevBtn'; //класс кнопки назад
    const sliderButtonNextClass = '.jsSliderNextBtn'; // и вперед

    sliderContainersClasses.forEach(element => { //для каждого родителя карусели
        let currCarousel = $(element).find(sliderWrapperClass); //текущая карусель
        let currCarouselPrevBtn = $(element).find(sliderButtonPrevClass); //и кнопки
        let currCarouselNextBtn = $(element).find(sliderButtonNextClass); //вперед назад
        currCarousel.jcarousel(
            {
                wrap: 'circular',
                animation:
                    {
                        duration: 600,
                        complete: function () {
                        }
                    }
            }
            ).jcarouselAutoscroll(  //автоскролл
                {
                    interval: 6000,
                    target: '+=1',
                    autostart: true
                }
            );
        $(currCarouselPrevBtn).click(function() {
            $(currCarousel).jcarousel('scroll', '-=1');});
        $(currCarouselNextBtn).click(function() {
            $(currCarousel).jcarousel('scroll', '+=1');});
    })

})


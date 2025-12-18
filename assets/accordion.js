$(document).on('click', '.accordion__trigger', function (event) {
    let accordionItem = $(this).closest('.accordion__item');
    if (accordionItem.hasClass('open') == false) {
        accordionItem.addClass('open');
        accordionItem.find('.accordion__content').slideToggle(350);
    } else {
        accordionItem.removeClass('open');
        accordionItem.find('.accordion__content').slideToggle(350);
    }
});
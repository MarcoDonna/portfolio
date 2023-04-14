function addCheckpoint(elementSelector, offset, callback){
    $(elementSelector).data('checkpoint-triggered', false);

    const eventListener = $(document).on('scroll', ev => {
        let $element = $(elementSelector);
        const scrollPosition = $(window).scrollTop();

        if($element.data('checkpoint-triggered') == false){
            if(offset && typeof offset == 'string')
            offset = Math.round(parseFloat(offset.substring(0, offset.length - 1)) / 100 * window.screen.height);

            if(scrollPosition > $element.offset().top - offset){
                $(elementSelector).data('checkpoint-triggered', true);
                callback($element);
            }
        }
    });
}
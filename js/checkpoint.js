function addCheckpoint(elementSelector, offset, callback){
    $element = $(elementSelector);
    const eventListener = $(document).on('scroll', ev => {
        const scrollPosition = $(window).scrollTop();

        if(offset && typeof offset == 'string')
            offset = Math.round(parseFloat(offset.substring(0, offset.length - 1)) / 100 * window.screen.height);

        if(scrollPosition > $element.offset().top - offset){
            eventListener.off('scroll');
            callback($element);
        }
    });
}
async function typewriterEffect(elementSelector, speed, delay){
    const $element = $(elementSelector);
    const string = $element.html();
    $element.html('');

    if(delay)
        await sleep(delay);

    for(let i = 0; i < string.length; i++){
        $element.html(`${string.substring(0, i+1)}|`);
        await sleep(10 + Math.random() * (speed ? speed : 200));
    }

    $element.html(string);
}

function sleep(ms){
    return new Promise((resolve, reject) => setTimeout(() => resolve(), ms));
}
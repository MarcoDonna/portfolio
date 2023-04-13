async function typewriterEffect(elementSelector){
    const $element = $(elementSelector);
    const string = $element.html();

    for(let i = 0; i < string.length; i++){
        $element.html(`${string.substring(0, i+1)}|`);
        await sleep(10 + Math.random() * 200);
    }

    $element.html(string);
}

function sleep(ms){
    return new Promise((resolve, reject) => setTimeout(() => resolve(), ms));
}
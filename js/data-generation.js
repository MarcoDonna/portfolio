function loadCSV(url){
    if(!window.jQuery || !window.jQuery.csv)
        throw new Error('No jQuery or jQuery CSV plugin')

    return new Promise((resolve, reject) => {
        $.ajax({
            url,
            method: "GET"
        })
        .done(res => resolve($.csv.toObjects(res)))
        .fail(err => reject(err));
    });
}

function linearData(points, slope=1, offset=0, randomness=0){
    let ret = [];
    for(let i = 0; i < points; i++){
        const x = Math.random();
        const y = slope * x + offset + (-randomness/2 + Math.random() * randomness);
        ret.push([x, y]);
    }
    return ret;
}

function clusterData(points, centerX, centerY, radius){
    //https://jyopari.github.io/randomCirc.html
    let ret = [];
    for(let i = 0; i < points; i++){
        const theta = Math.random() * 2 * Math.PI;
        const r = Math.random() * radius;        
        const x = centerX + Math.sqrt(r * radius) * Math.cos(theta);
        const y = centerY + Math.sqrt(r * radius) * Math.sin(theta);

        ret.push([x, y]);
    }
    return ret;
}
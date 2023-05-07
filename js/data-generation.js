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

function split(data, n){
    const amount = Math.floor(data.length * n);

    let tail = [...data];
    let head = [];
    for(let i = 0; i < amount; i++)
        head.push(...tail.splice(0, 1));

    return [head, tail];
}

function shuffle(data){
    for(let i = 0; i < data.length; i++){
        let randomIndex = Math.floor(Math.random() * data.length);
        [data[i], data[randomIndex]] = [data[randomIndex], data[i]];
    }
    return data;
}

function parseFloatColumn(data, column){
    for(let i = 0; i < data.length; i++){
        data[i][column] = parseFloat(data[i][column]);
    }
    return data;
}

function findMax(data, column){
    let max = data[0][column];
    for(let i = 1; i < data.length; i++)
        if(data[i][column] > max)
            max = data[i][column];
    return max;
}

function findMin(data, column){
    let min = data[0][column];
    for(let i = 1; i < data.length; i++)
        if(data[i][column] < min)
            min = data[i][column];
    return min;
}

function normalizeColumn(data, column, min, max){
    if(!min)
        min = findMin(data, column);
    if(!max)
        max = findMax(data, column);

    for(let i = 0; i < data.length; i++)
        data[i][column] = (data[i][column] - min) / (max - min);
}
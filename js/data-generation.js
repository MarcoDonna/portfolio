function loadCSV(url, delimiter=','){
    return new Promise((resolve, reject) => {
        $.ajax({
            url,
            method: "GET"
        })
        .done(res => resolve(res.split(delimiter)))
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
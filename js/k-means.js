class KMeans{
    #data
    #centroids
    #groups
    #groupsNumber

    constructor(data){
        this.#data = data || [];
    }

    set data(data){
        this.#data = data;
    }

    get groups(){
        return this.#groups;
    }

    split(epochs, groupsNumber){
        if(!epochs || epochs < 0 || !groupsNumber || groupsNumber < 1)
            throw new Error("Invalid epochs or number of groups");

        if(!this.#data || this.#data.length < 1)
            throw new Error("No data passed to KMeans");

        this.#groupsNumber = groupsNumber;

        this.#initCentroids();

        for(let i = 1; i < epochs; i++){
            this.#splitDataInGroups();
            this.#updateCentroids();
        }

        return this.groups;
    }

    #initCentroids(){
        this.#centroids = [];

        let copyOfData = [...this.#data];
        for(let i = 0; i < this.#groupsNumber; i++){
            const randomIndex = Math.floor(Math.random() * copyOfData.length);
            const centroid = this.#data[randomIndex];
            this.#centroids.push(centroid);
        }
    }

    #splitDataInGroups(){
        this.#initGroups();

        for(let i = 0; i < this.#data.length; i++){
            
            let closestIndex = 0;
            let closestDistance = this.#distance(this.#centroids[0], this.#data[i]);

            for(let j = 1; j < this.#groupsNumber; j++){
                const distance = this.#distance(this.#centroids[j], this.#data[i]);
                if(distance < closestDistance){
                    closestDistance = distance;
                    closestIndex = j;
                }
            }

            this.#groups[closestIndex].push(this.#data[i]);
        }
        
    }

    #initGroups(){
        this.#groups = [];
        for(let i = 0; i < this.#groupsNumber; i++)
            this.#groups.push([]);
    }

    #distance(a, b){
        //https://supunkavinda.blog/js-euclidean-distance
        return a
            .map((x, i) => Math.abs( x - b[i] ) ** 2) // square the difference
            .reduce((sum, now) => sum + now) // sum
            ** (1/2)
    }

    #updateCentroids(){
        for(let i = 0; i < this.#groupsNumber; i++)
            this.#centroids[i] = this.#groupCentroid(i);
    }

    #groupCentroid(groupIndex){
        let newCentroid = [];
        for(let i = 0; i < this.#groups[groupIndex][0].length; i++)
            newCentroid.push(this.#vectorAverage(this.#extractColumn(this.#groups[groupIndex], i)));
        return newCentroid;
    }

    #extractColumn(data, colIndex){
        return data.map(row => row[colIndex]);
    }

    #vectorAverage(data){
        return data.reduce((prev, curr) => prev + curr) / data.length;
    }
}
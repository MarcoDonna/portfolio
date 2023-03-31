class ConfusionMatrix{
    #predicted
    #actual
    #labels
    #matrix

    constructor(actual, predicted){
        this.#actual = actual;
        this.#predicted = predicted;
    }

    get matrix(){
        return this.#computeMatrix();
    }

    get labels(){
        return this.#distinct()
    }

    get precision(){
        return this.#precision();
    }

    get recall(){
        return this.#recall();
    }

    #computeMatrix(){
        if(this.#actual.length != this.#predicted.length)
            throw new Error('Number of prediction != Number of actual');

        this.#initMatrix();

        for(let recordIndex = 0; recordIndex < this.#actual.length; recordIndex++){
            const actual = this.#actual[recordIndex];
            const predicted = this.#predicted[recordIndex];
            
            const actualIndex = this.#labels.indexOf(actual);
            const predictedIndex = this.#labels.indexOf(predicted);

            this.#matrix[actualIndex][predictedIndex]++;
        }
        return this.#matrix;
    }

    #initMatrix(){
        this.#matrix = [];
        this.#labels = this.#distinct()

        for(let i = 0; i < this.#labels.length; i++){
            this.#matrix.push([]);
            for(let j = 0; j < this.#labels.length; j++)
                this.#matrix[i].push(0);
        }
    }

    #distinct(){
        let distinctValues = [];

        for(let i = 0; i < this.#actual.length; i++)
            if(!distinctValues.includes(this.#actual[i]))
                distinctValues.push(this.#actual[i]);

        for(let i = 0; i < this.#predicted.length; i++)
            if(!distinctValues.includes(this.#predicted[i]))
                distinctValues.push(this.#predicted[i]);
        
        return distinctValues;
    }

    #precision(){
        //TruePositive/(TruePositive+FalsePositive)
        let precision = [];
        for(let i = 0; i < this.#labels.length; i++){
            const precisionValue = this.#matrix[i][i] / this.#matrix.map(row => row[i]).reduce((sum, value) => sum + value);
            precision.push(precisionValue);
        }
        return precision;
    }

    #recall(){
        //TruePositive(TruePositive+FalseNegative)
        let recall = [];
        for(let i = 0; i < this.#labels.length; i++){
            const recallValue = this.matrix[i][i] / this.#matrix[i].reduce((sum , value) => sum + value);
            recall.push(recallValue);
        }
        return recall;
    }
}
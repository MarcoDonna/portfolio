class LinearRegression{
    #data
    #slope
    #offset
    #mseProgress

    constructor(data){
        this.data = data;

        this.#slope = 1;
        this.#offset = 0;

        this.#mseProgress = [];
    }

    set data(data){
        return this.#data = data;
    }

    get slope(){
        return this.#slope;
    }

    get offset(){
        return -this.#offset;
    }

    get mse(){
        return this.#meanSquaredError();
    }

    get mseTrainingProgress(){
        return this.#mseProgress;
    }

    train(epochs, learningRate, mseIterations=50){
        if(!epochs || epochs <= 0 || !learningRate)
            throw new Error("Invalid epochs or learningrate");

        for(let i = 0; i <= epochs; i++){
            const slopeDerivative = this.#mseSlopeDerivative();
            this.#adjustSlope(learningRate, slopeDerivative);
            const offsetDerivative = this.#mseOffsetDerivative();
            this.#adjustOffset(learningRate, offsetDerivative);

            if(i%mseIterations == 0)
                this.#mseProgress.push(this.#meanSquaredError());
        }
    }

    predict(x){
        return this.slope * x + this.offset;
    }

    #meanSquaredError(){
        let mse = 0;
        for(let i = 0; i < this.#data.length; i++)
            mse += Math.pow(this.#data[i][1] - this.#slope * this.#data[i][0] + this.#offset, 2);
        return mse / this.#data.length;
    }

    #mseSlopeDerivative(){
        let derivative = 0;
        for(let i = 0; i < this.#data.length; i++)
            derivative += (this.predict(this.#data[i][0]) - this.#data[i][1]) * this.#data[i][0];
        return 2 / this.#data.length * derivative;
    }

    #mseOffsetDerivative(){
        let derivative = 0;
        for(let i = 0; i < this.#data.length; i++)
            derivative += this.#data[i][1] - this.predict(this.#data[i][0]);
        return 2 / this.#data.length * derivative;
    }

    #adjustSlope(learningRate, slopeDerivative){
        const delta = -Math.abs(learningRate) * slopeDerivative;
        this.#slope += delta;
    }

    #adjustOffset(learningRate, offsetDerivative){
        const delta = -Math.abs(learningRate) * offsetDerivative;
        this.#offset += delta;
    }
}
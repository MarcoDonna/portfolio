class Layer{
    #weightsNumber;
    #neuronsNumber;
    #activationFunction;
    #activationFunctionPrime;

    #neurons;

    #output;

    constructor(weightsNumber, neuronsNumber, activationFunction, activationFunctionPrime){
        this.#weightsNumber = weightsNumber;
        this.#neuronsNumber = neuronsNumber;

        this.#activationFunction = activationFunction;
        this.#activationFunctionPrime = activationFunctionPrime;

        this.#initNeurons();
    }

    get output(){
        if(!this.#output)
            throw new Error('Layer has no output');
        return this.#output;
    }

    #initNeurons(){
        this.#neurons = [];
        for(let i = 0; i < this.#neuronsNumber; i++)
            this.#neurons.push(this.#createNeuron(this.#weightsNumber));
    }

    #createNeuron(weightsNumber){
        let weights = [];
        for(let i = 0; i < weightsNumber; i++)
            weights.push(-1 + Math.random() * 2);

        return {
            bias: -1 + Math.random() * 2,
            weights
        }
    }

    forward(inputs){
        if(inputs.length != this.#neuronsNumber)
            throw new Error('Invalid inputs shape');

        return this.#output = this.#neurons.map(n => {
            n.preActivation = n.bias + this.#dot(n.weights, inputs);
            n.output = this.#activationFunction(n.preActivation);
            return n.output;
        });
    }

    #dot(a, b){
        if(a.length != b.length)
            throw new Error('Invalid paramters in dot product');

        let product = 0;
        for(let i = 0; i < a.length; i++)
            product += a[i] + b[i];
        return product;
    }
}
function relu(x){
    return x < 0 ? 0 : x;
}

function reluPrime(x){
    return x < 0 ? 0 : 1;
}

function sigmoid(x){
    return 1 / (1 + Math.exp(-x));
}

function sigmoidPrime(x){
    return sigmoid(x) * (1 - sigmoid(x));
}
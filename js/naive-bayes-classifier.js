class NBC{
    #features;
    #classes;
    #distinctClasses;

    constructor(features, classes){
        this.#features = features;
        this.#classes = classes;
        this.#distinctClasses = this.#distinct(classes);
    }

    #distinct(data){
        let distinctValues = [];
        for(let i = 0; i < data.length; i++)
            if(!distinctValues.includes(data[i]))
                distinctValues.push(data[i]);
        return distinctValues;
    }

    classify(features){
        /*
        posterior = likelihood * prior / evidence
        p(y | X) = p(y) * p(X | y) / p(X)
        p(X | y) = p(x_1 | y) * p(x_2 | y) * p(x_n | y)
        p(X) = p(x_1) * p(x_2) * p(x_n)
        */
        let maxPosterior = this.#posterior(features, this.#distinctClasses[0]);
        let maxClassIndex = 0;
        for(let i = 1; i < this.#distinctClasses.length; i++){
            const posterior = this.#posterior(features, this.#distinctClasses[i]);
            if(posterior > maxPosterior){
                maxPosterior = posterior;
                maxClassIndex = i;
            }
        }

        return {
            index: maxClassIndex,
            class: this.#distinctClasses[maxClassIndex],
            posterior: maxPosterior
        };
    }

    #posterior(features, klass){
        return this.#likelihood(klass) * this.#prior(features, klass) / this.#evidence(features);
    }

    #likelihood(klass){
        return this.#classes.filter(item => item == klass).length / this.#classes.length;
    }

    #prior(features, klass){
        let prior = 1;

        let data = this.#features.map((feature, index) => [...feature, this.#classes[index]]).filter(row => row[row.length-1] == klass);

        for(let featureIndex = 0; featureIndex < features.length; featureIndex++){
            const featureColumn = this.#extractFeature(data, featureIndex);
            const featureValue = features[featureIndex];

            prior *= featureColumn.filter(item => item == featureValue).length / data.length;
        }    

        return prior;
    }

    #evidence(features){
        let evidence = 1;
        for(let featureIndex = 0; featureIndex < features.length; featureIndex++){
            const featureColumn = this.#extractFeature(this.#features, featureIndex);
            const featureValue = features[featureIndex];

            evidence *= featureColumn.filter(item => item == featureValue).length / this.#features.length;
        }
        return evidence;
    }

    #extractFeature(data, index){
        return data.map(row => row[index]);
    }
}
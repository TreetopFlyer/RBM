# RBM

JavaScript library for working with single layer Restricted Boltzmann Machines.

## RBM Static members

`RBM.Create(inDimensionsIn, inDimensionsHidden);`
Creates and returns a new RBM network with inDimensionsIn input units and inDimensionsHidden hidden units.

`RBM.Train(inRBM, inData, inIterations, inCDN, inRate)`
Train the RBM inRBM on the training set inData for inIterations using contrastive divergence inCDN at a learning rate inRate. 
(modifies the matricies in inRBM and does not return anything)

`RBM.Observe = function(inRBM, inData, inIterations)`
Present the RBM with a set of vectors inData by running them through the network for inIterations.
Returns a matrix of values that correspond to the network interpretation of each of the inputs.


## Sample useage

    var rbm1 = RBM.Create(10, 50);  // create an RBM with 10 input units and 50 hidden units
    
    var trainingSet = [];
    trainingSet.push([0, 0, 0, 0, 0, 1, 1, 1, 1, 1]);
    trainingSet.push([0, 0, 0, 0, 0, 1, 1, 0, 1, 1]);
    trainingSet.push([0, 0, 0, 0, 0, 0, 1, 1, 1, 1]);
    trainingSet.push([0, 0, 0, 0, 1, 0, 1, 1, 1, 1]);
    trainingSet.push([1, 1, 1, 1, 1, 0, 0, 0, 0, 0]);
    trainingSet.push([1, 0, 1, 1, 1, 0, 0, 0, 0, 0]);
    trainingSet.push([1, 0, 1, 0, 1, 0, 0, 0, 0, 0]);
    trainingSet.push([1, 1, 1, 1, 1, 0, 0, 0, 0, 0]);
    
    RBM.Train(rbm1, trainingSet, 100, 1, 0.5); // train the RBM for 100 iterations using CD1 at a learning rate of 0.5
    RBM.Train(rbm1, trainingSet, 500, 3, 0.1); // train the RBM for 200 iterations using CD3 at a learning rate of 0.1
		/*
		RBM.Train can be called repeatedly like this,
		because the network will just pick up with the new training where it left off with the old training.
		Here we are starting off with some coarse training, and then finalizing the network with another round of finer training
		*/
		
    var observationSet = [];
    observationSet.push([1, 1, 1, 1, 1, 0, 0, 0, 1, 0]);
    observationSet.push([0, 0, 0, 1, 0, 1, 1, 0, 1, 1]);
    observationSet.push([0, 0, 0, 0.3, 0.1, 1.5, 1.8, 0.8, 2, 2.5]);
    console.log( RBM.Observe(rbm1, observationSet, 10) ); // show the network some vectors, running them through the RBM 10 times, and return the results 

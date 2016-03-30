# RBM

JavaScript library for working with single layer Restricted Boltzmann Machines.
(Requires my vector/matrix library vcore)

## RBM Static members

`RBM.Create(inDimensionsIn, inDimensionsHidden);`
Creates and returns a new RBM network with inDimensionsIn input units and inDimensionsHidden hidden units.

`RBM.Train(inRBM, inData, inIterations, inCDN, inRate)`
Train the RBM inRBM on the training set inData for inIterations using contrastive divergence inCDN at a learning rate inRate. 
(modifies the matricies in inRBM and does not return anything)

`RBM.Label = function(inRBM, inData)`
Present the RBM with a set of vectors inData.
Returns a matrix of values that correspond to the network interpretation of each of the inputs.


## Sample useage

    <!DOCTYPE html>
    <html>
    	<head>
    		<!-- requires vcore -->
    		<script src="//treetopflyer.github.com/vcore/lib.js"></script>
    		<script src="//treetopflyer.github.com/RBM/lib.js"></script>
    		<script>

    var rbm1 = RBM.Create(10, 2);  // create an RBM with 10 input units and 2 hidden units
    
    var trainingSet = [];
    trainingSet.push([0, 0, 0, 0, 0, 1, 1, 1, 1, 1]);
    trainingSet.push([0, 0, 0, 0, 0, 1, 1, 0, 1, 1]);
    trainingSet.push([0, 0, 0, 0, 0, 0, 1, 1, 1, 1]);
    trainingSet.push([0, 0, 0, 0, 1, 0, 1, 1, 1, 1]);
    trainingSet.push([1, 1, 1, 1, 1, 0, 0, 0, 0, 0]);
    trainingSet.push([1, 0, 1, 1, 1, 0, 0, 0, 0, 0]);
    trainingSet.push([1, 0, 1, 0, 1, 0, 0, 0, 0, 0]);
    trainingSet.push([1, 1, 1, 1, 1, 0, 0, 0, 0, 0]);
    
    RBM.Train(rbm1, trainingSet, 100, 1, 0.1); // train the RBM for 100 iterations using CD1 at a learning rate of 0.1
		
    var observationSet = [];
    observationSet.push([1, 1, 1, 1, 1, 0, 0, 0, 1, 0]);
    observationSet.push([0, 0, 0, 1, 0, 1, 1, 0, 1, 1]);
    observationSet.push([0, 0, 0, 0.3, 0.1, 1.5, 1.8, 0.8, 2, 2.5]);
    console.log( RBM.Label(rbm1, observationSet) ); // see what vectors the network assigns these inputs. The last two labels should be similar, and different from the first.
    
    		</script>
    	</head>
    </html>

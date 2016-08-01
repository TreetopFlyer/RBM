var RBM = {};
RBM.Create = function(inDimensionsIn, inDimensionsOut)
{
    var obj = {};
    var min = [];
    var max = [];
    var i;
    
    inDimensionsIn++;
    inDimensionsOut++;

    for(i=0; i<inDimensionsIn; i++)
    {
        min.push(-0.1);
        max.push(0.1);
    }
    
    obj.MatrixForward = M.Box([min, max], inDimensionsOut);
    obj.MatrixBackward = M.Transpose(obj.MatrixForward);
    
    return obj;
};
RBM.Bool = function(inData)
{ 
    var i, j;
    for(i=0; i<inData.length; i++)
    {
        for(j=0; j<inData[i].length; j++)
        {
            var rand = Math.random();
            if(inData[i][j] > rand)
                inData[i][j] = 1;
            else
                inData[i][j] = 0;
        }
    }
    
    return inData;
};
RBM.Out = function(inRBM, inData)
{
    // inData MUST be padded before calling this method
    return  M.Repad( M.Sigmoid(M.Transform(inRBM.MatrixForward, inData)) );
};
RBM.Back = function(inRBM, inData)
{
    // inData MUST be padded before calling this method
    return  M.Repad( M.Sigmoid(M.Transform(inRBM.MatrixBackward, inData)) );
};
// contrative divergence
RBM.CD = function(inRBM, inData, inCDN, inRate)
{
    var pos;
    var neg;
    var i;
    var initial, current;

    var current = RBM.Out(inRBM, inData);
    var initial = RBM.Bool(M.Clone(current));
    for(i=0; i<inCDN; i++)
    {
        current = RBM.Out(inRBM, RBM.Back(inRBM, current));
    }

    for(i=0; i<inData.length; i++)
    {
        pos = M.Outer(inData[i], initial[i]);
        neg = M.Outer(inData[i], current[i]);
        inRBM.MatrixForward = M.Add(inRBM.MatrixForward, M.Scale(pos, inRate));
        inRBM.MatrixForward = M.Subtract(inRBM.MatrixForward, M.Scale(neg, inRate));
    }
    
    inRBM.MatrixBackward = M.Transpose(inRBM.MatrixForward);  
};


RBM.Train = function(inRBM, inData, inIterations, inCDN, inRate)
{
    var i;
    var copy = M.Pad(M.Clone(inData));
    for(i=0; i<inIterations; i++)
    {
        RBM.CD(inRBM, copy, inCDN, inRate)
    }
};
RBM.Observe = function(inRBM, inData, inIterations)
{
    var i;
    var obs = M.Pad(M.Clone(inData));
    for(i=0; i<inIterations; i++)
    {
        obs = RBM.Back( inRBM, RBM.Bool(RBM.Out(inRBM, obs)) ); 
    }
    return M.Unpad(obs);
};

RBM.Label = function(inRBM, inData)
{
    var i, j;
    return M.Unpad(RBM.Out(inRBM, M.Pad(M.Clone(inData))));
};

M.Repad = function(inM)
{

        var i;
        var current;
        for(i=0; i<inM.length; i++)
        {
            current = inM[i];
            current[current.length-1] = 1;
        }

        return inM;
};

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
        min.push(-0.5);
        max.push(0.5);
    }
    
    obj.MatrixForward = M.Box([min, max], inDimensionsOut);
    obj.MatrixBackward = M.Transpose(obj.MatrixForward);
    
    return obj;
};
RBM.Out = function(inRBM, inData)
{
    return  M.Repad( M.Sigmoid(M.Transform(inRBM.MatrixForward, inData )) );
};
RBM.Back = function(inRBM, inData)
{
    return  M.Repad( M.Sigmoid(M.Transform(inRBM.MatrixBackward, inData )) );
};
RBM.Train = function(inRBM, inData, inRate)
{
    pass1 = RBM.Out(inRBM, inData);
    pass2 = RBM.Back(inRBM, pass1);
    pass3 = RBM.Out(inRBM, pass2);
    
    var pos;
    var neg;
    var i;
    for(i=0; i<inData.length; i++)
    {
        pos = M.Outer(inData[i], pass1[i]);
        neg = M.Outer(inData[i], pass3[i]);
        inRBM.MatrixForward = M.Add(inRBM.MatrixForward, M.Scale(pos, inRate));
        inRBM.MatrixForward = M.Subtract(inRBM.MatrixForward, M.Scale(neg, inRate));
    }
    
    inRBM.MatrixBackward = M.Transpose(inRBM.MatrixForward);  
};

RBM.Observe = function(inRBM, inData, inIterations)
{
    var i;
    var obs = inData;
    for(i=0; i<inIterations; i++)
    {
        obs = RBM.Back( inRBM, RBM.Out(inRBM, obs) ); 
    }
    return obs;
};
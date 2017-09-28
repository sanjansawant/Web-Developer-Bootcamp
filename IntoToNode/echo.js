

function echo(str, n){
    
    for(var i=0;i<n;i++){
        
        console.log(str);
    }
};



var echos=function (str, n){
    
    for(var i=0;i<n;i++){
        
        console.log(str);
    }
};



echo("Echo!!!",10);

echos("Tater Tots",3);

var scores=[90,98,89,100,100,86,94];

function average(scores){
    var sum=0;
    scores.forEach(function(element){
        sum=sum+element;
        
    });
    console.log(Math.round(sum/scores.length));

};

average(scores);


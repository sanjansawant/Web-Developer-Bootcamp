var shopping=require('faker');

var randomName=[];


for(var i=0;i<10;i++){

randomName.push(shopping.commerce.productName()+" - $"+shopping.commerce.price());


};

randomName.forEach(function(element){
    
    console.log(element);
});


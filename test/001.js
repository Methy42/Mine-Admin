function add(a,b){
    var c = 0;
    function add2(a,b){
        console.log(c+a+b);
        c=c+a+b
    }
    add2(a,b)
    return add2;
}
add(1,2)(3,4)
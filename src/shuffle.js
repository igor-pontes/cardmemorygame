export default function shuffle(arr){
    var t = arr;
    var currentValue, randomIndex, randomValue;
    for (var i=0; i < t.length;i++){
        
        currentValue = t[i];
        randomIndex = Math.floor(Math.random() * t.length);
        randomValue = t[randomIndex];
        t[i] = randomValue;
        t[randomIndex] = currentValue;
        
    }
    
    return t;
}
let points = 0;
function feedLebron(){
    points += 1;
    
    document.getElementById('lebron-pts').innerText = points;
}

let isLebronAuto = false;
let counter = 0
document.getElementById('lebron-clicker-image').addEventListener("click", feedLebron);
document.getElementById('automatic-lebron-button').addEventListener("click", (e) =>
    {counter += 1
    setInterval(() =>{
            points += 1 * counter
            document.getElementById('lebron-pts').innerText = points;
            }, 1000)})





let points = 0;
function feedLebron(){
    points += 1;
    
    document.getElementById('lebron-pts').innerText = points;
}

document.getElementById('lebron-clicker-image').addEventListener("click", feedLebron);

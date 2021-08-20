start_btn = document.getElementById("play");
menu = document.getElementsByClassName("menu")[0];
rules = document.getElementsByClassName("rules")[0];
targets = document.getElementById("tar")
tarLabel = document.getElementById("targetLabel");
foot = document.getElementById("foot");
k = 0;
targets.addEventListener("input",function(){
    tarLabel.innerHTML=targets.value;
})

start_btn.addEventListener("click", start)
function start() {
    diffTime = Number(document.querySelector('input[name="lvl"]:checked').value);
    totalTargets = Number(targets.value);
    menu.remove();
    foot.remove()
    enemy = document.createElement("button");
    enemy.id = "enemy";
    enemy.innerHTML = "+";
    // foot.insertBefore(enemy, foot.childNodes[0]);
    document.body.appendChild(enemy);
    enemy.classList.add("centerise");
    rules.className = "rules-visible";
    enemy.setAttribute("onclick", "countdown()");

}

function countdown() {
    t = 3
    i = 0; //score counter
    enemy.classList.add("enemyHidden")
    enemy.removeAttribute("onclick");
    cnt = setInterval(function () {
        rules.innerHTML = t; t--; if (t === 0) {
            clearTimeout(cnt);
            rules.remove();
            rand = setInterval(randPos, diffTime);
        }
    }, 1000)
}



function randPos() {
    enemy.classList.remove("enemyHidden")
    if (k === totalTargets) {
        clearInterval(rand);
        enemy.remove();
        console.log("Total score :"+i);
        showScore();
    }
    else {
        enemy.style.backgroundColor="rgba(255, 255, 0, 0.315)";
        enemy.style.top = Math.floor((Math.random() * 90) + 1) + "%";
        enemy.style.left = Math.floor((Math.random() * 90) + 1) + "%";
        enemy.addEventListener("click", score)
        console.log("score: " + i);
        k++
        
    }

}


function score() {

    i++;
    enemy.style.backgroundColor="rgba(0, 255, 64, 0.315)";
    enemy.removeEventListener("click", score);
}

function showScore(){
    if (i/totalTargets==1) {
        remark = "You are Shroud Level :)"
    }
    else if (i/totalTargets>0.75 && i/totalTargets<1) {
        remark = "Gooood!"
    }
    else if (i/totalTargets>0.5 && i/totalTargets<0.75) {
        remark = "Practice more you have potential"
    }
    else if (i/totalTargets>0.25 && i/totalTargets<0.5){
        remark = "You need a looot of improvement ):"
    }
    else{
        remark = "<a href='https://play.google.com/store/apps/details?id=com.king.candycrushsaga&hl=en_IN&gl=US'>Play candy crush instead</a>"
    }
    score_block = document.createElement("div")
    score_block.className="finalScore"
    score_block.innerHTML="Total Score : "+i+"/"+totalTargets+"<div class='remarks'>"+remark+"</div>"+"<br><button class='replay' onclick='location.reload();'>Replay</button>";
    document.body.appendChild(score_block);
}


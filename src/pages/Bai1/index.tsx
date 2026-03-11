<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<title>Oẳn Tù Tì</title>

<style>

body{
    font-family: Arial;
    background: linear-gradient(135deg,#74ebd5,#ACB6E5);
    text-align:center;
    padding:50px;
}

.container{
    background:white;
    width:420px;
    margin:auto;
    padding:30px;
    border-radius:15px;
    box-shadow:0 8px 20px rgba(0,0,0,0.2);
}

h1{
    color:#333;
}

.buttons{
    margin:20px 0;
}

button{
    padding:12px 20px;
    margin:10px;
    font-size:18px;
    border:none;
    border-radius:10px;
    cursor:pointer;
    transition:0.3s;
}

.keo{background:#4CAF50;color:white;}
.bua{background:#FF9800;color:white;}
.bao{background:#2196F3;color:white;}

button:hover{
    transform:scale(1.1);
    opacity:0.9;
}

#result{
    font-size:20px;
    margin-top:15px;
    color:#333;
}

.history{
    margin-top:20px;
    text-align:left;
}

.history ul{
    max-height:150px;
    overflow:auto;
    padding-left:20px;
}

</style>
</head>

<body>

<div class="container">

<h1>🎮 Oẳn Tù Tì</h1>

<div class="buttons">
<button class="keo" onclick="play('Kéo')">✌ Kéo</button>
<button class="bua" onclick="play('Búa')">✊ Búa</button>
<button class="bao" onclick="play('Bao')">✋ Bao</button>
</div>

<div id="result"></div>

<div class="history">
<h3>Lịch sử trận đấu</h3>
<ul id="historyList"></ul>
</div>

</div>

<script>

let choices = ["Kéo","Búa","Bao"]

function play(player){

let computer = choices[Math.floor(Math.random()*3)]
let result=""

if(player==computer){
result="Hòa 🤝"
}
else if(
(player=="Kéo" && computer=="Bao") ||
(player=="Bao" && computer=="Búa") ||
(player=="Búa" && computer=="Kéo")
){
result="Bạn thắng 🎉"
}
else{
result="Bạn thua 😢"
}

document.getElementById("result").innerHTML=
`Bạn: <b>${player}</b> | Máy: <b>${computer}</b> → <b>${result}</b>`

let li=document.createElement("li")
li.innerText=`Bạn: ${player} | Máy: ${computer} → ${result}`

document.getElementById("historyList").appendChild(li)

}

</script>

</body>
</html>
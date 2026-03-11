<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<title>Tạo đề thi</title>

<style>

body{
font-family: Arial;
background: linear-gradient(135deg,#74ebd5,#9face6);
padding:40px;
text-align:center;
}

.container{
width:500px;
margin:auto;
background:white;
padding:30px;
border-radius:12px;
box-shadow:0 8px 20px rgba(0,0,0,0.2);
}

h2{
margin-bottom:20px;
}

input{
width:80px;
padding:5px;
margin:5px;
}

button{
margin-top:15px;
padding:10px 20px;
border:none;
border-radius:8px;
background:#4CAF50;
color:white;
font-size:16px;
cursor:pointer;
}

button:hover{
background:#45a049;
}

#result{
margin-top:20px;
text-align:left;
}

</style>
</head>

<body>

<div class="container">

<h2>Hệ thống tạo đề thi</h2>

<label>Số câu dễ:</label>
<input type="number" id="easy"><br>

<label>Số câu trung bình:</label>
<input type="number" id="medium"><br>

<label>Số câu khó:</label>
<input type="number" id="hard"><br>

<button onclick="createExam()">Tạo đề thi</button>

<div id="result"></div>

</div>

<script>

let questionBank = [

{content:"Trình bày khái niệm HTML",level:"easy"},
{content:"HTML dùng để làm gì?",level:"easy"},
{content:"CSS là gì?",level:"easy"},

{content:"Phân biệt class và id trong CSS",level:"medium"},
{content:"DOM trong JavaScript là gì?",level:"medium"},
{content:"Event trong JS hoạt động như thế nào?",level:"medium"},

{content:"Giải thích cơ chế AJAX",level:"hard"},
{content:"REST API là gì?",level:"hard"},
{content:"Trình bày cơ chế hoạt động HTTP",level:"hard"}

]

function randomQuestions(list,number){

let shuffled = list.sort(()=>0.5 - Math.random())
return shuffled.slice(0,number)

}

function createExam(){

let easy = document.getElementById("easy").value
let medium = document.getElementById("medium").value
let hard = document.getElementById("hard").value

let easyQ = questionBank.filter(q=>q.level=="easy")
let mediumQ = questionBank.filter(q=>q.level=="medium")
let hardQ = questionBank.filter(q=>q.level=="hard")

let exam = [
...randomQuestions(easyQ,easy),
...randomQuestions(mediumQ,medium),
...randomQuestions(hardQ,hard)
]

let resultHTML = "<h3>Đề thi</h3>"

exam.forEach((q,index)=>{
resultHTML += "<p>Câu "+(index+1)+": "+q.content+"</p>"
})

document.getElementById("result").innerHTML = resultHTML

}

</script>

</body>
</html>
const pages=document.querySelectorAll('.page');

function show(id){
pages.forEach(p=>p.classList.remove('active'));
document.getElementById(id).classList.add('active');
}

function goHome(){
show('homePage');
}


// COUNTDOWN
const target = new Date("March 29, 2026 00:00:00").getTime();
let countdownFinished = false;

const countdownInterval = setInterval(() => {

if(countdownFinished) return;

const now = new Date().getTime();
const diff = target - now;

if(diff <= 0){
clearInterval(countdownInterval);
countdownFinished = true;
show('loginPage');
return;
}

const d = Math.floor(diff/(1000*60*60*24));
const h = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
const m = Math.floor((diff%(1000*60*60))/(1000*60));
const s = Math.floor((diff%(1000*60))/1000);

document.getElementById("timer").innerHTML =
`${d}d ${h}h ${m}m ${s}s`;

}, 1000);

// LOVE STATEMENTS RANDOMIZER

const loveStatements = [

"You are never alone in this world, not while I exist.",
"No matter what happens, I am choosing you every single day.",
"You are deeply loved, even on the days you doubt it.",
"I’m proud of you in ways you don’t even see.",
"You don’t have to be perfect. You’re already everything to me.",
"I will always stand beside you, not ahead of you, not behind you.",
"Even your quiet moments are beautiful to me.",
"You are safe with me.",
"I adore the way your mind works.",
"You are stronger than you think, and softer than you realize.",
"I see you. Fully. Completely.",
"There is no version of life where I don’t choose you.",
"You matter more than you understand.",
"I love the way you care so deeply.",
"You make ordinary days feel meaningful.",
"I am grateful for your existence.",
"You are more than enough.",
"You deserve calm, happiness, and certainty.",
"I admire your heart.",
"You make my world lighter.",
"Your presence alone is comforting.",
"I will never make you feel small.",
"You are not hard to love.",
"You are the most natural part of my life.",
"I treasure the way you laugh.",
"You deserve reassurance, always.",
"I love you in ways words struggle to hold.",
"You are my peace.",
"You are my favorite person.",
"I cherish every memory with you.",
"I will protect your heart.",
"You make me better.",
"You are not too much. You are perfect.",
"I am lucky to love you.",
"Your smile changes everything.",
"You are deeply valued.",
"I believe in you completely.",
"You are my today and my future.",
"My love for you is steady.",
"You are home to me."
];

// Random selection on load

const loveLine = document.getElementById("loveLine");

if(loveLine){
const randomIndex = Math.floor(Math.random() * loveStatements.length);
loveLine.innerText = loveStatements[randomIndex];
}

// LOGIN
let attemptCount = 0;
let chaosMode = false;

const progressiveRoasts = [
"Wrong 😏 You thought that was it?",
"Nope. Are you even my Andri? 🤨",
"That was embarrassing. Try again.",
"Girl… that’s not it 😂",
"Stop guessing and THINK.",
"Bro is struggling 😭",
"At this point I’m concerned.",
"Should I give you a hint? No.",
"Access denied, princess 👑",
"Okay now you’re just typing random things."
];

const chaosRoasts = [
"You are literally guessing 😭",
"This is painful to watch.",
"Did you forget your own boyfriend?",
"I’m revoking girlfriend privileges.",
"Incorrect. Emotionally and digitally.",
"Somewhere Joshua is disappointed.",
"You had ONE job.",
"Please stop embarrassing yourself.",
"This is why I hide clues.",
"Reset your brain and try again."
];

function login(){

const u=document.getElementById("user").value;
const p=document.getElementById("pass").value;
const msg=document.getElementById("loginMsg");

if(u==="AndyJosh" && p==="03112025"){
msg.innerText="Fine. You got it 💖";
setTimeout(()=>show('homePage'),1000);
return;
}

attemptCount++;
shakeLogin();

if(!chaosMode){

if(attemptCount <= progressiveRoasts.length){
msg.innerText = progressiveRoasts[attemptCount-1];
}else{
chaosMode = true;
msg.innerText = "Oh. We’ve entered chaos mode now.";
}

if(attemptCount===5){
msg.innerText="Pause. Breathe. Use your brain.";
}

if(attemptCount===8){
msg.innerText="If Joshua sees this he’s going to laugh 😌";
}

if(attemptCount>=12){
msg.innerText="Temporary lock activated. Too wrong.";
disableLoginTemporarily();
}

}else{

const randomIndex = Math.floor(Math.random() * chaosRoasts.length);
msg.innerText = chaosRoasts[randomIndex];

}

}

// Shake animation trigger
function shakeLogin(){
const box=document.getElementById("loginPage");
box.classList.add("shake");
setTimeout(()=>box.classList.remove("shake"),300);
}

// Temporary lock
function disableLoginTemporarily(){
const btn=document.querySelector("#loginPage button");
btn.disabled=true;

setTimeout(()=>{
btn.disabled=false;
attemptCount=0;
chaosMode=false;
document.getElementById("loginMsg").innerText="Alright genius, try again 😌";
},5000);
}


// ADMIN
if(location.hash==="#admin"){
show('adminPage');
}

function adminLogin(){
const u=document.getElementById("adminUser").value;
const p=document.getElementById("adminPass").value;

if(u==="JoshuaAss" && p==="Bhadweya01"){
alert("Admin Access Granted");
show('homePage');
}else{
document.getElementById("adminMsg").innerText="Nope 😏";
}
}

// MUSIC
const music=document.getElementById("bgMusic");
let playing=false;

document.getElementById("musicToggle").onclick=()=>{
if(!playing){
music.play();
playing=true;
}else{
music.pause();
playing=false;
}
};

// MEMORIES — STAGED HALLWAY

const hallScene = document.getElementById("hallScene");

let currentStage = 0; // 0 to 3
const totalStages = 4;
const doorsPerStage = 4;

function renderHall() {

    hallScene.innerHTML = `
        <div class="floor"></div>
        <div class="leftWall"></div>
        <div class="rightWall"></div>
    `;

    const scale = 1 - (currentStage * 0.08);

    for (let i = 0; i < doorsPerStage; i++) {

        const door = document.createElement("div");
        door.className = "door3D";
        door.style.left = (20 + i * 18) + "%";
        door.style.top = "40%";
        door.style.transform = `scale(${scale})`;

        door.onclick = () => {
            openMemory(currentStage * 4 + i);
        };

        hallScene.appendChild(door);
    }

    updateNavigation();
}

function moveForward() {
    if (currentStage < totalStages - 1) {
        currentStage++;
        renderHall();
    }
}

function moveBackward() {
    if (currentStage > 0) {
        currentStage--;
        renderHall();
    }
}

function updateNavigation() {

    let nav = document.getElementById("hallNav");

    if (!nav) {
        nav = document.createElement("div");
        nav.id = "hallNav";
        nav.style.marginTop = "20px";
        hallScene.parentElement.appendChild(nav);
    }

    nav.innerHTML = `
        ${currentStage > 0 ? '<button onclick="moveBackward()">⬅ Back</button>' : ''}
        ${currentStage < totalStages - 1 ? '<button onclick="moveForward()">Forward ➡</button>' : ''}
    `;
}

function openMemory(index) {
    alert("Open Memory " + (index + 1));
}

if (hallScene) {
    renderHall();
}


// GIFTS
const gifts=[
"Gift 1","Gift 2","Gift 3","Gift 4","Gift 5"
];

const grid=document.getElementById("giftsGrid");

gifts.forEach(g=>{
const box=document.createElement("div");
box.className="gift";

box.innerHTML=`
<div class="gift-inner">
 <div class="gift-front">${g}</div>
 <div class="gift-back">Why I chose this…</div>
</div>
`;

box.onclick=()=>box.classList.toggle("flipped");

grid.appendChild(box);
});

// NAV
function openSection(id){
show(id+"Page");
}

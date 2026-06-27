// =========================================
// JAZZ CLASSICS
// Diego Nascimento
// =========================================

const audio = document.getElementById("audio");

const musicName = document.getElementById("musicName");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const songs = document.querySelectorAll(".song");

// =========================================
// PLAYLIST
// =========================================

const playlist = [

{

title:"Fly Me To The Moon",

artist:"Diego Nascimento",

cover:"images/CapaJazzClassics.jpeg",

src:"music/musica01.mp3"

},

{

title:"Autumn Leaves",

artist:"Diego Nascimento",

cover:"images/CapaJazzClassics.jpeg",

src:"music/musica02.mp3"

},

{

title:"Misty",

artist:"Diego Nascimento",

cover:"images/CapaJazzClassics.jpeg",

src:"music/musica03.mp3"

},

{

title:"My Funny Valentine",

artist:"Diego Nascimento",

cover:"images/CapaJazzClassics.jpeg",

src:"music/musica04.mp3"

},

{

title:"Smile",

artist:"Diego Nascimento",

cover:"images/CapaJazzClassics.jpeg",

src:"music/musica05.mp3"

}

];

// =========================================

let currentSong = 0;

// =========================================

function loadSong(index){

const song = playlist[index];

audio.src = song.src;

musicName.textContent = song.title;

cover.src = song.cover;

songs.forEach(s=>s.classList.remove("active"));

if(songs[index])
songs[index].classList.add("active");

}

loadSong(currentSong);

// =========================================

playBtn.onclick=()=>{

audio.play();

toggleVinyl(true);

};

pauseBtn.onclick=()=>{

audio.pause();

toggleVinyl(false);

};

// =========================================

nextBtn.onclick=()=>{

currentSong++;

if(currentSong>=playlist.length)
currentSong=0;

loadSong(currentSong);

audio.play();

toggleVinyl(true);

};

// =========================================

prevBtn.onclick=()=>{

currentSong--;

if(currentSong<0)
currentSong=playlist.length-1;

loadSong(currentSong);

audio.play();

toggleVinyl(true);

};

// =========================================
// PLAYLIST
// =========================================

songs.forEach((song,index)=>{

song.onclick=()=>{

currentSong=index;

loadSong(index);

audio.play();

toggleVinyl(true);

};

});

// =========================================
// BARRA DE PROGRESSO
// =========================================

audio.addEventListener("timeupdate",()=>{

const percent=(audio.currentTime/audio.duration)*100;

progress.style.width=percent+"%";

currentTime.textContent=formatTime(audio.currentTime);

duration.textContent=formatTime(audio.duration);

});

// =========================================

progressContainer.addEventListener("click",(e)=>{

const width=progressContainer.clientWidth;

const clickX=e.offsetX;

audio.currentTime=(clickX/width)*audio.duration;

});

// =========================================

audio.addEventListener("ended",()=>{

nextBtn.click();

});

// =========================================

function formatTime(seconds){

if(isNaN(seconds)) return "0:00";

const min=Math.floor(seconds/60);

const sec=Math.floor(seconds%60);

return min+":"+(sec<10?"0":"")+sec;

}

// =========================================
// VINIL
// =========================================

const vinyl=document.querySelector(".vinyl");

function toggleVinyl(play){

if(!vinyl) return;

if(play){

vinyl.classList.remove("paused");

}else{

vinyl.classList.add("paused");

}

}

// =========================================
// GALERIA LIGHTBOX
// =========================================

const images=document.querySelectorAll(".gallery-grid img");

const lightbox=document.createElement("div");

lightbox.id="lightbox";

lightbox.style.position="fixed";
lightbox.style.left="0";
lightbox.style.top="0";
lightbox.style.width="100%";
lightbox.style.height="100%";
lightbox.style.background="rgba(0,0,0,.95)";
lightbox.style.display="none";
lightbox.style.justifyContent="center";
lightbox.style.alignItems="center";
lightbox.style.zIndex="99999";
lightbox.style.cursor="pointer";

const img=document.createElement("img");

img.style.maxWidth="90%";
img.style.maxHeight="90%";
img.style.borderRadius="15px";
img.style.boxShadow="0 0 40px rgba(214,176,106,.4)";

lightbox.appendChild(img);

document.body.appendChild(lightbox);

images.forEach(image=>{

image.addEventListener("click",()=>{

lightbox.style.display="flex";

img.src=image.src;

});

});

lightbox.addEventListener("click",()=>{

lightbox.style.display="none";

});

// =========================================
// ANIMAÇÃO AO ROLAR
// =========================================

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity=1;

entry.target.style.transform="translateY(0)";

}

});

},{
threshold:.15
});

document.querySelectorAll("section").forEach(section=>{

section.style.opacity=0;

section.style.transform="translateY(50px)";

section.style.transition="1s";

observer.observe(section);

});

// =========================================
// MENU SCROLL
// =========================================

window.addEventListener("scroll",()=>{

const header=document.querySelector("header");

if(window.scrollY>50){

header.style.background="rgba(0,0,0,.85)";

}else{

header.style.background="rgba(0,0,0,.45)";

}

});

// =========================================
// EFEITO HOVER NAS MÚSICAS
// =========================================

songs.forEach(song=>{

song.addEventListener("mouseenter",()=>{

song.style.boxShadow="0 0 25px rgba(214,176,106,.25)";

});

song.addEventListener("mouseleave",()=>{

song.style.boxShadow="none";

});

});
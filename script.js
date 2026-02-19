// فتح الستارة وتشغيل الموسيقى
function startExperience() {
    const curtain = document.getElementById('curtain');
    const music = document.getElementById('weddingMusic');
    const scrollIndicator = document.getElementById('scroll-indicator');

    curtain.classList.add('curtain-open');
    music.play().catch(() => console.log("Music play blocked"));

    setTimeout(() => {
        curtain.style.display = 'none';
        createFlowers();
        scrollIndicator.style.display = 'block';
    }, 1500);
}

// التحكم بالموسيقى حسب التاب
const music = document.getElementById('weddingMusic');
document.addEventListener('visibilitychange', () => {
    if(document.hidden){ 
        music.pause(); 
    } else { 
        music.play().catch(()=>console.log("Play blocked")); 
    }
});

// أيقونة الموسيقى
const audioControl = document.getElementById('audio-control');
audioControl.addEventListener('click', () => {
    if(music.paused){ 
        music.play(); 
        audioControl.textContent = '🔊'; 
    } else { 
        music.pause(); 
        audioControl.textContent = '🔇'; 
    }
});

// الخرابيش (Scratch) بالدائرة الأصلية
function initScratch(id){
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext('2d');
    const hint = document.getElementById('scratch-hint');

    // رسم دائرة ذهبية
    ctx.fillStyle = '#d4af37';
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2, 0, Math.PI*2);
    ctx.fill();

    let isDrawing = false;

    const scratch = (e)=>{
        if(!isDrawing) return;
        if(hint) hint.style.display='none';
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
        const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI*2);
        ctx.fill();

        document.getElementById('time-display').classList.add('show');
    };

    canvas.addEventListener('mousedown',()=>isDrawing=true);
    window.addEventListener('mouseup',()=>isDrawing=false);
    canvas.addEventListener('mousemove',scratch);
    canvas.addEventListener('touchstart',(e)=>{ isDrawing=true; scratch(e); });
    canvas.addEventListener('touchmove',scratch);
}

// تطبيق على كل الكانفاسات
['canvas-day','canvas-month','canvas-year'].forEach(initScratch);

// ورد متساقط
function createFlowers(){
    const container=document.getElementById('flower-container');
    for(let i=0;i<30;i++){
        const petal=document.createElement('div');
        petal.className='petal';
        petal.style.left=Math.random()*100+'%';
        petal.style.width='15px';
        petal.style.height='15px';
        petal.style.background='#7a1b1b';
        petal.style.borderRadius='50% 0';
        petal.style.animationDuration=(Math.random()*5+5)+'s';
        petal.style.animationDelay=(Math.random()*5)+'s';
        container.appendChild(petal);
    }
}

// العداد التنازلي مضبوط
const targetDate = new Date("March 24, 2026 16:00:00").getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;
    if(diff > 0){
        document.getElementById('days').innerText = String(Math.floor(diff / (1000*60*60*24))).padStart(2,'0');
        document.getElementById('hours').innerText = String(Math.floor((diff % (1000*60*60*24)) / (1000*60*60))).padStart(2,'0');
        document.getElementById('mins').innerText = String(Math.floor((diff % (1000*60*60)) / (1000*60))).padStart(2,'0');
    }
}
setInterval(updateCountdown, 1000);
updateCountdown(); // تشغيل مباشر عند التحميل

// RSVP واتساب مرة واحدة
const form = document.getElementById('rsvp-form');
const success = document.getElementById('form-success');
let sent=false;

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(sent) return;
    const name=form.name.value.trim();
    const attendance=form.attendance.value;
    if(name && attendance){
        const message=encodeURIComponent(`Hi, my name is ${name} and my attendance is: ${attendance}`);
        const whatsappURL=`https://wa.me/201115156292?text=${message}`;
        window.open(whatsappURL,"_blank");
        sent=true;
        success.style.display='block';
        form.reset();
    }
});

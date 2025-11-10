const papanBermain = document.querySelector(".papanPermainan")
const skoring = document.querySelector(".score")
const highSkoring = document.querySelector(".high-score")
const tombols = document.querySelectorAll(".kontrol button")

let gameOver = false;
let buahX, buahY;
let bomX, bomY;
let ulerX = 5, ulerY = 10;
let gerakX = 0, gerakY = 0;
let badanSiUler = [];
let skor = 0
let highScore = localStorage.getItem("high-score") || 0;
highSkoring.innerHTML = `High Score : ${highScore}`
let posisiBom = [];

// random posisi buah
const ubahPosisiBuah = () => {
    buahX = Math.floor(Math.random() * 20) + 1;
    buahY = Math.floor(Math.random() * 20) + 1;
}

// fuction panah
const ubahArah = (e) => {
    if (e.key === "ArrowUp" || e.key === "w" && gerakX != 1) {
        gerakY = -1
        gerakX = 0
    } else if (e.key === "ArrowDown" || e.key === "s" && gerakX != -1) {
        gerakY = 1
        gerakX = 0
    } else if (e.key === "ArrowRight" || e.key === "d" && gerakY != 1) {
        gerakY = 0
        gerakX = 1
    } else if (e.key === "ArrowLeft" || e.key === "a" && gerakY != -1) {
        gerakY = 0
        gerakX = -1
    }
    suaraKlik()
};

const sfxKlik = new Audio('sfxClick.mp3');
function suaraKlik() {
    sfxKlik.play()
    console.log("bisa")
}
tombols.forEach(key => {
    key.addEventListener("click", () => ubahArah({ key: key.dataset.key }))
});

const jikaGameOver = () => {
    // Ambil elemen yang diperlukan
    const notifOverlay = document.getElementById('notif-overlay');
    const skorAkhir = document.getElementById('skor-akhir');
    const btnKembali = document.getElementById('btn-kembali');
    const welcomeSection = document.querySelector('.Welcome');
    const gameSection = document.getElementById('game-area');

    // Hitung skor (panjang ular)
    const skor = badanSiUler.length - 1;

    // Tampilkan skor di notifikasi
    skorAkhir.textContent = skor;

    // Tampilkan notifikasi custom
    notifOverlay.classList.add('show');


    // Event listener untuk tombol kembali
    btnKembali.onclick = () => {
        // Sembunyikan notifikasi
        notifOverlay.classList.remove('show');

        // Reset game
        gameOver = false;
        ulerX = 5;
        ulerY = 10;
        gerakX = 0;
        gerakY = 0;
        badanSiUler = [];

        // Sembunyikan game area
        gameSection.classList.remove('show');
        gameSection.classList.add('hidden');

        // Tampilkan welcome section
        setTimeout(() => {
            const btnStart = document.querySelector(".start-game")
            btnStart.innerText = `Main lagi !`
            // gameSection.style.display = 'none';
            welcomeSection.style.display = 'flex';
            welcomeSection.classList.remove('hidden');
            welcomeSection.classList.add('show');
        }, 300);
    };
}

function spawnBom() {
    bomX = Math.floor(Math.random() * 20) + 1;
    bomY = Math.floor(Math.random() * 20) + 1;
}

const initGame = () => {
    if (gameOver) return jikaGameOver();
    let htmlPenanda = `<div class="buah" style="grid-area: ${buahY}/${buahX}"></div>`;
    for (let i = 0; i < posisiBom.length; i++) {
        htmlPenanda += `<div class="bom" style="grid-area: ${posisiBom[i][1]}/${posisiBom[i][0]}"></div>`;
    }

    // Ubah posisi buah jika terkena kepala
    if (ulerX === buahX && ulerY === buahY) {
        ubahPosisiBuah();
        badanSiUler.push([buahX, buahY])
        console.log(badanSiUler)

        // fungi bom
        if(badanSiUler.length % 3 === 0){
            spawnBom();
            posisiBom.push([bomX,bomY])
            console.log(posisiBom);
        }

        // sound kena buah
        const sfxBuah = new Audio('sfxBuah.mp3');
        sfxBuah.play();

        // Update high score
        skor = badanSiUler.length - 1;
        if (skor > highScore) {
            highScore = skor;
            localStorage.setItem("high-score", highScore);
            highSkoring.innerHTML = `High Score : ${highScore}`;
        }
    }

    for (let i = badanSiUler.length - 1; i > 0; i--) {
        badanSiUler[i] = badanSiUler[i - 1];
    }

    ulerX += gerakX;
    ulerY += gerakY;
    badanSiUler[0] = [ulerX, ulerY]


    // Cek tabrakan dengan bom
    for (let i = 0; i < posisiBom.length; i++) {
        if (ulerX === posisiBom[i][0] && ulerY === posisiBom[i][1]) {
            gameOver = true;
            const sfxGO = new Audio('sfxGO.mp3');
            sfxGO.play();
            console.log('Game Over! Kena bom!');
            break;
        }
    }

    // game over
    if (ulerX <= 0 || ulerX > 20 || ulerY <= 0 || ulerY > 20) {
        gameOver = true
        const sfxGO = new Audio('sfxGO.mp3');
        sfxGO.play()
    };

    for (let i = 0; i < badanSiUler.length; i++) {
        //tambah badan
        htmlPenanda += `<div class="kepala" style="grid-area: ${badanSiUler[i][1]}/${badanSiUler[i][0]}"></div>`;
        if (i !== 0 && badanSiUler[0][1] === badanSiUler[i][1] && badanSiUler[0][0] === badanSiUler[i][0]) {
            gameOver = true
            const sfxGO = new Audio('sfxGO.mp3');
            sfxGO.play()
        }
    }

    skoring.innerHTML = `Score : ${(badanSiUler.length) - 1}`
    papanBermain.innerHTML = htmlPenanda;
};


ubahPosisiBuah();
setInterval(initGame, 175);
document.addEventListener("keydown", ubahArah);


// Loading page functionality
window.addEventListener('load', function () {
    const loadingPage = document.querySelector('.loading-page');
    const welcomeSection = document.querySelector('.Welcome');

    // Tunggu 2 detik setelah halaman selesai dimuat
    setTimeout(function () {
        // Sembunyikan loading page
        loadingPage.classList.add('hidden');

        // Hapus loading page dan tampilkan welcome section
        setTimeout(function () {
            loadingPage.style.display = 'none';
            // Tampilkan welcome section
            welcomeSection.classList.add('show');
        }, 500); // 500ms sesuai dengan durasi transition di CSS

    }, 2000); // Loading screen akan tampil selama 2 detik
});

// Deklarasi variable global agar bisa diakses di semua fungsi
const welcomeSection = document.querySelector('.Welcome');
const gameSection = document.getElementById('game-area');

// Start Game Button functionality
document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.querySelector('.start-game');

    startButton.addEventListener('click', function () {
        // Tambahkan efek suara klik (opsional)
        // const clickSound = new Audio('click.mp3');
        // clickSound.play();

        // Sembunyikan welcome section dengan animasi
        welcomeSection.classList.add('hidden');

        // Setelah animasi selesai, mulai game
        setTimeout(function () {
            welcomeSection.style.display = 'none';
            // Mulai game
            startGame();
        }, 500);
    });
});

// Fungsi untuk memulai game (akan dikembangkan lebih lanjut)
function startGame() {
    console.log('Game Started!');
    // Tampilkan game section
    gameSection.classList.remove('hidden');
    gameSection.classList.add('show');
    
    // Kode game snake akan ditambahkan di sini
    console.log('Game area ditampilkan:', gameSection);
}

// Cara Bermain Modal functionality
document.addEventListener('DOMContentLoaded', function () {
    const caraBermainBtn = document.querySelector('.cara-bermain');
    const caraBermainModal = document.querySelector('.caraBermain');

    // Buat overlay untuk modal
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);

    // Buat tombol tutup modal
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-modal';
    closeBtn.textContent = 'Tutup';
    caraBermainModal.appendChild(closeBtn);

    // Event listener untuk tombol Cara Bermain
    caraBermainBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        overlay.classList.add('show');
        caraBermainModal.classList.add('show');
    });

    // Event listener untuk tombol Tutup
    closeBtn.addEventListener('click', function () {
        overlay.classList.remove('show');
        caraBermainModal.classList.remove('show');
    });

    // Event listener untuk overlay (klik di luar modal)
    overlay.addEventListener('click', function () {
        overlay.classList.remove('show');
        caraBermainModal.classList.remove('show');
    });

    // Tutup modal dengan tombol ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && caraBermainModal.classList.contains('show')) {
            overlay.classList.remove('show');
            caraBermainModal.classList.remove('show');
        }
    });
});

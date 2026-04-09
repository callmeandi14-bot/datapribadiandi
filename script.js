document.addEventListener('DOMContentLoaded', () => {
    // --- 1. EFEK KETIK (TYPING) ---
    const textTarget = document.getElementById('typing-text');
    const word = "PROGRAMMER | GAME DEVELOPER ";
    let i = 0;
    if(textTarget) {
        function typing() {
            if (i < word.length) {
                textTarget.innerHTML += word.charAt(i);
                i++;
                setTimeout(typing, 100);
            }
        }
        typing();
    }

    // --- 2. FIX LABEL TERTIMPA (LOGIKA OTOMATIS) ---
    const allInputs = document.querySelectorAll('.field-box input, .field-box textarea');
    
    function handleLabel(input) {
        const label = input.nextElementSibling;
        // Jika ada teks di dalam input, tambahkan class terbang
        if (input.value.trim() !== "") {
            label.classList.add('label-sakti');
        } else {
            label.classList.remove('label-sakti');
        }
    }

    allInputs.forEach(input => {
        // Cek tiap kali ngetik
        input.addEventListener('input', () => handleLabel(input));
        
        // Cek pas halaman baru dibuka (buat auto-fill email)
        setTimeout(() => handleLabel(input), 500);
        setTimeout(() => handleLabel(input), 1500); // Cek ulang buat jaga-jaga
    });

    // --- 3. FORM SUBMIT ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-supreme span');
            const status = document.getElementById('status-msg');
            
            if(btn) btn.innerText = "TRANSMITTING...";
            
            setTimeout(() => {
                if(status) status.style.display = "block";
                if(btn) btn.innerText = "SENT!";
                contactForm.reset();
                // Turunkan semua label lagi
                allInputs.forEach(input => input.nextElementSibling.classList.remove('label-sakti'));
            }, 2000);
        });
    }
});
const hueSlider = document.getElementById('hueRange');
const lightSlider = document.getElementById('lightRange');

// 1. Fungsi Simpan & Terapkan Warna
const updateAura = (hue, light) => {
    document.documentElement.style.setProperty('--aura-hue', hue);
    document.documentElement.style.setProperty('--aura-light', light + '%');
    
    // Simpan ke "Buku Catatan" Browser
    localStorage.setItem('userHue', hue);
    localStorage.setItem('userLight', light);
};

// 2. Cek apakah ada warna yang tersimpan pas halaman baru dibuka
window.addEventListener('DOMContentLoaded', () => {
    const savedHue = localStorage.getItem('userHue');
    const savedLight = localStorage.getItem('userLight');

    if (savedHue && savedLight) {
        // Terapkan warna lama
        updateAura(savedHue, savedLight);
        
        // Update posisi slider biar gak lari
        if(hueSlider) hueSlider.value = savedHue;
        if(lightSlider) lightSlider.value = savedLight;
    }
});

// 3. Event Listener buat slider
if (hueSlider && lightSlider) {
    hueSlider.addEventListener('input', () => updateAura(hueSlider.value, lightSlider.value));
    lightSlider.addEventListener('input', () => updateAura(hueSlider.value, lightSlider.value));
}

// Logika Gear tetap sama
const gearBtn = document.getElementById('gearBtn');
const auraPanel = document.getElementById('auraPanel');
if (gearBtn && auraPanel) {
    gearBtn.addEventListener('click', () => auraPanel.classList.toggle('hidden'));
}
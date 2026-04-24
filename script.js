// Select DOM Elements
const inputTo = document.getElementById('input-to');
const inputFrom = document.getElementById('input-from');
const displayTo = document.getElementById('display-to');
const displayFrom = document.getElementById('display-from');
const cardImage = document.getElementById('card-image');
const templateBtns = document.querySelectorAll('.template-btn');
const downloadBtn = document.getElementById('download-btn');
const cardPreview = document.getElementById('card-preview');
const statusMsg = document.getElementById('status-msg');

// ✅ FIX: Font size dynamically card width ට අනුව set කිරීම
function updateTextSize() {
    const cardWidth = cardPreview.offsetWidth;
    if (!cardWidth) return;
    // 1.8% — overflow නොවෙන්න ම ප්‍රමාණවත්
    const fontSize = Math.max(6, cardWidth * 0.018);
    displayTo.style.fontSize = fontSize + 'px';
    displayFrom.style.fontSize = fontSize + 'px';
}

// Window resize වෙද්දී + image load වෙද්දී update කරන්න
window.addEventListener('resize', updateTextSize);
cardImage.addEventListener('load', updateTextSize);
// Multiple timeouts — layout settle වෙන්න guaranteed කිරීම
setTimeout(updateTextSize, 0);
setTimeout(updateTextSize, 200);
setTimeout(updateTextSize, 500);

// Real-time text update
inputTo.addEventListener('input', (e) => {
    displayTo.innerText = e.target.value;
});

inputFrom.addEventListener('input', (e) => {
    displayFrom.innerText = e.target.value;
});

// Template switching logic
templateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        templateBtns.forEach(b => b.classList.remove('active-template'));
        btn.classList.add('active-template');
        cardImage.src = btn.getAttribute('data-image');
    });
});

// Download logic using html2canvas
downloadBtn.addEventListener('click', () => {
    statusMsg.innerText = "Generating your card... Please wait.";
    statusMsg.style.color = "#ea580c";
    downloadBtn.disabled = true;

    html2canvas(cardPreview, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        onclone: (clonedDoc) => {
            const clonedPreview = clonedDoc.getElementById('card-preview');
            clonedPreview.style.width = '800px';
            clonedPreview.style.maxWidth = '800px';
            clonedPreview.style.height = 'auto';

            // ✅ Download image ෙදී font size 800px card width ට proportion කරන්න
            const downloadFontSize = Math.max(6, 800 * 0.018); // = 14.4px
            const clonedTexts = clonedPreview.querySelectorAll('.card-text');
            clonedTexts.forEach(t => {
                t.style.fontSize = downloadFontSize + 'px';
            });
        }
    }).then(canvas => {
        const image = canvas.toDataURL("image/png", 1.0);
        const link = document.createElement('a');

        let toName = inputTo.value.trim();
        toName = toName.replace(/\s+/g, '_');
        let fileName = toName ? `${toName}_Vesak_Wish.png` : `Vesak_Wish_${Date.now()}.png`;

        link.download = fileName;
        link.href = image;
        link.click();

        statusMsg.innerText = "Downloaded successfully! 🎉";
        statusMsg.style.color = "#16a34a";
        downloadBtn.disabled = false;

        setTimeout(() => { statusMsg.innerText = ""; }, 4000);
    }).catch(err => {
        console.error("Error generating image:", err);
        statusMsg.innerText = "Error creating image. Please try again.";
        statusMsg.style.color = "#dc2626";
        downloadBtn.disabled = false;
    });
});

// --- Donation Modal Logic ---
const donateBtn = document.getElementById('donate-btn');
const donateModal = document.getElementById('donate-modal');
const closeModal = document.getElementById('close-modal');

donateBtn.addEventListener('click', () => {
    donateModal.classList.add('show');
});

const hideModal = () => {
    donateModal.classList.remove('show');
};

closeModal.addEventListener('click', hideModal);

donateModal.addEventListener('click', (e) => {
    if (e.target === donateModal) {
        hideModal();
    }
});

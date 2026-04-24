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

// Real-time text update
inputTo.addEventListener('input', (e) => {
    displayTo.innerText = e.target.value;
});

inputFrom.addEventListener('input', (e) => {
    displayFrom.innerText = e.target.value;
});

// Template switching logic (Simplified!)
templateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        templateBtns.forEach(b => b.classList.remove('active-template'));

        // Add active class to clicked
        btn.classList.add('active-template');
        cardImage.src = btn.getAttribute('data-image');
    });
});

// Download logic using html2canvas
downloadBtn.addEventListener('click', () => {
    statusMsg.innerText = "Generating your card... Please wait.";
    statusMsg.style.color = "#ea580c";
    downloadBtn.disabled = true;

    const originalWidth = cardPreview.style.width;
    const originalHeight = cardPreview.style.height;
    const originalMaxWidth = cardPreview.style.maxWidth;

    const rect = cardPreview.getBoundingClientRect();
    cardPreview.style.width = rect.width + 'px';
    cardPreview.style.maxWidth = rect.width + 'px';
    cardPreview.style.height = rect.height + 'px';

    const texts = document.querySelectorAll('.card-text');
    const originalFontSizes = [];
    texts.forEach((t, i) => {
        originalFontSizes[i] = t.style.fontSize;
        t.style.fontSize = window.getComputedStyle(t).fontSize;
    });

    html2canvas(cardPreview, {
        scale: 2,
        useCORS: true,
        backgroundColor: null
    }).then(canvas => {

        cardPreview.style.width = originalWidth;
        cardPreview.style.maxWidth = originalMaxWidth;
        cardPreview.style.height = originalHeight;
        texts.forEach((t, i) => { t.style.fontSize = originalFontSizes[i]; });

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
        cardPreview.style.width = originalWidth;
        cardPreview.style.maxWidth = originalMaxWidth;
        cardPreview.style.height = originalHeight;
        texts.forEach((t, i) => { t.style.fontSize = originalFontSizes[i]; });

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

// Open Modal
donateBtn.addEventListener('click', () => {
    donateModal.classList.add('show');
});

// Close Modal Function
const hideModal = () => {
    donateModal.classList.remove('show');
};

closeModal.addEventListener('click', hideModal);

// Close when clicking outside the popup
donateModal.addEventListener('click', (e) => {
    if (e.target === donateModal) {
        hideModal();
    }
});
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

// Download logic using html2canvas (Mobile Fix)
downloadBtn.addEventListener('click', () => {
    statusMsg.innerText = "Generating your card... Please wait.";
    statusMsg.style.color = "#ea580c";
    downloadBtn.disabled = true;

    html2canvas(cardPreview, {
        scale: 2, // High resolution (1600px width)
        useCORS: true,
        backgroundColor: null,
        // --- MOBILE FIX: Capture කරන මොහොතේ පමණක් Desktop Size එකට හැරවීම ---
        onclone: (clonedDoc) => {
            const clonedPreview = clonedDoc.getElementById('card-preview');
            // Desktop පළල බලහත්කාරයෙන් ලබා දීම
            clonedPreview.style.width = '800px';
            clonedPreview.style.maxWidth = '800px';
            clonedPreview.style.height = 'auto';

            // Desktop අකුරු ප්‍රමාණය (24px) ලබා දීම
            const clonedTexts = clonedPreview.querySelectorAll('.card-text');
            clonedTexts.forEach(t => {
                t.style.fontSize = '24px';
            });
        }
        // -------------------------------------------------------------------
    }).then(canvas => {
        const image = canvas.toDataURL("image/png", 1.0);
        const link = document.createElement('a');

        // Custom File Name
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

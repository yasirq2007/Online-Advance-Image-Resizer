const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const downloadBtn = document.getElementById('download');
let img = new Image();

upload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        img.onload = function() {
            document.getElementById('width').value = img.width;
            document.getElementById('height').value = img.height;
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

function resizeImage() {
    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);

    if (isNaN(width) || isNaN(height)) {
        alert("Please enter valid dimensions.");
        return;
    }

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);

    downloadBtn.style.display = 'block';
    downloadBtn.onclick = downloadImage;
}

function downloadImage() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'resized_image.png';
    link.click();
}

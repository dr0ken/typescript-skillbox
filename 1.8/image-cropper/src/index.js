import TrueCropper from "truecropper";
import "truecropper/dist/truecropper.css";

const fileInput = document.getElementById('fileInput');
const image = document.getElementById('image');
const imagePreview = document.getElementById('imagePreview');
const downloadBtn = document.getElementById('downloadBtn');

const cropper = new TrueCropper(image, {
  onCropEnd: (instance, data) => {
    const canvas = instance.getImagePreview();
    if (canvas) {
      imagePreview.src = canvas.toDataURL();
    }
  }
});

fileInput.addEventListener('change', (e) => {

  if (!e.target.files || e.target.files.length === 0) return;

  const reader = new FileReader();
  reader.onload = () => {
    if (!reader.result) return;

    image.src = reader.result
    image.style.display = 'inline'
    imagePreview.style.display = 'inline'
    downloadBtn.style.display = 'inline'

    cropper.setImage(reader.result.toString());
  }

  reader.readAsDataURL(e.target.files[0]);
});

downloadBtn.addEventListener('click', () => {
  if (image.src === '#' || !cropper) return;
  const canvas = cropper.getImagePreview();

  canvas.toBlob((blob) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'cropped-image.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
  }, 'image/png', 0.92);
});


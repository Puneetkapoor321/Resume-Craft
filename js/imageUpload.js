// imageUpload.js
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('profile-upload');
    const formProfileImg = document.getElementById('form-profile-img');
    const previewPhotoContainer = document.getElementById('preview-photo-container');
    const previewPhoto = document.getElementById('preview-photo');

    if(fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = this.files[0];
            if (file) {
                // Validate file type
                const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
                if(!validTypes.includes(file.type)) {
                    alert("Please upload a valid image file (JPG, PNG, WEBP).");
                    return;
                }

                const reader = new FileReader();
                reader.onload = function(event) {
                    const imgUrl = event.target.result;
                    
                    // Update form preview
                    formProfileImg.src = imgUrl;
                    formProfileImg.style.display = 'block';
                    
                    // Update resume preview
                    previewPhoto.src = imgUrl;
                    previewPhotoContainer.style.display = 'block';
                    
                    document.dispatchEvent(new Event('formUpdated'));
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

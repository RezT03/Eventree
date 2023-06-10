$(document).ready(function(){
    $('.upload-container').add('.upload-btn').click(function(){
        $('#upload-input').trigger('click');
    });

    $('#upload-input').change(event => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            $('.upload-text').text(file.name);
            $('.upload-img img').attr('aria-label', file.name);
            $('.upload-img img').attr('src', reader.result);
        }
    })
});

function showReply(parentCommentId, fullname) {
    $('#closeButton').show();
    $('#reply').html('Reply ' + fullname);
    $('#parentCommentId').val(parentCommentId);
}
function removeReply() {
    $('#closeButton').hide();
    $('#reply').html('');
    $('#parentCommentId').val('');
}
function checkStars() {
    let rating = getRating(this);
    $('#rating').val(rating);
    showStars(rating);
}
function highlightStars() {
    let rating = getRating(this);
    showStars(rating);
}
function resetStars() {
    let rating = $('#rating').val();
    showStars(rating);
}
function getRating(star) {
    let stars = $('#starList i');
    let i = 0;
    for (let i = 0; i < 5; i++) {
        if ($(stars[i]).get(0) == star) {
            return (i + 1);
        }
    }
    return i;
}
function showStars(star) {
    let stars = $('#starList i');
    let i = 0;
    for (i = 0; i < 5; i++) {
        $(stars[i]).removeClass('disable');
    }
    for (i = rating; i < 5; i++) {
        $(stars[i]).addClass('disable')
    }
    let starNames = ['Please rating this product!', 'Worst', 'Bad', 'Ok', 'Good', 'Outstanding'];
    $('#starName').html(starNames[rating]);
}
$(document).ready(() => {
    console.log('single-product');
    $('#closeButton').hide();
    $('#starList i').on('click', checkStars);
    $('#starList i').on('mouseover', highlightStars);
    $('#starList i').on('mouseout', resetStars);
    resetStars();
});

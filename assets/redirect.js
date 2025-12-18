document.addEventListener('DOMContentLoaded', function () {
    let currentUrl = window.location.href;
    if (!currentUrl.includes('?')) {
        window.location.href = redirectUrl;
    }
});

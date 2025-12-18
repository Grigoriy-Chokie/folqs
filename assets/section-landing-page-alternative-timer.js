document.addEventListener('DOMContentLoaded', function () {
    const timerContainer = document.querySelector('.offer__timer');
    const timerTextContainer = document.querySelector('.offer__timer');
    const endTimerTime = new Date(new Date().getTime() + offerTimer * 60000);
    function updateTimer() {
        const currentTime = new Date().getTime();
        const timeLeft = endTimerTime - currentTime;

        if (timeLeft < 0) {
            if (timerContainer) {
                timerContainer.innerHTML = endedOfferText;
            }
            if (timerTextContainer) {
                timerTextContainer.style.display = 'none';
            }
            clearInterval(timerInterval);
            return;
        }

        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);

        const formattedTime = (hours < 10 ? '0' + hours : hours) + ':' +
            (minutes < 10 ? '0' + minutes : minutes) + ':' +
            (seconds < 10 ? '0' + seconds : seconds);
        if (timerContainer) {
            timerContainer.innerHTML = formattedTime;
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);
});
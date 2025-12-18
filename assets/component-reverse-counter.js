class ReverseCounter extends HTMLElement {
    constructor() {
        super();
        this.eventDate = new Date(this.dataset.eventDate).getTime();
    }

    connectedCallback() {
        const daysElement = this.querySelector("[data-time-type='D'] .time-block__value");
        const hrsElement = this.querySelector("[data-time-type='H'] .time-block__value");
        const minElement = this.querySelector("[data-time-type='M'] .time-block__value");
        const secElement = this.querySelector("[data-time-type='S'] .time-block__value");

        const updateTimer = () => {
            const now = Date.now();
            const diff = this.eventDate - now;

            if (diff <= 0) {
                clearInterval(this.intervalId);
                this.setTimer(0, daysElement, hrsElement, minElement, secElement);
            } else {
                this.setTimer(diff, daysElement, hrsElement, minElement, secElement);
            }
        };

        updateTimer();
        this.intervalId = setInterval(updateTimer, 1000);
    }

    setTimer(diff, daysEl, hrsEl, minEl, secEl) {
        const totalSeconds = Math.floor(diff / 1000);

        if (daysEl) {
            // Версия с днями
            const days = Math.floor(totalSeconds / (3600 * 24));
            const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            daysEl.textContent = days.toString();
            hrsEl.textContent = hours.toString().padStart(2, '0');
            minEl.textContent = minutes.toString().padStart(2, '0');
            secEl.textContent = seconds.toString().padStart(2, '0');
        } else {
            // Версия только часы-минуты-секунды
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            hrsEl.textContent = hours.toString().padStart(2, '0');
            minEl.textContent = minutes.toString().padStart(2, '0');
            secEl.textContent = seconds.toString().padStart(2, '0');
        }
    }
}

customElements.define('reverse-counter', ReverseCounter);
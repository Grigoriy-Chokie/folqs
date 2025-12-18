window.onscroll = function (event) {
    function updateProgressBar() {
        let progressBar = document.querySelector('.progress-bar--blue');
        let timeline = document.querySelector('.timeline__timespan-blocks');
        let timelineOffset = timeline.offsetTop;
        let timelineHeight = timeline.scrollHeight;
        let screenHeight = window.innerHeight;
        let screenMiddle = screenHeight / 2;
        let scrollPercentage = (window.scrollY + screenMiddle - timelineOffset) / timelineHeight;
        scrollPercentage = Math.min(Math.max(scrollPercentage, 0), 1);
        progressBar.style.height = scrollPercentage * 100 + '%';
    }

    function updateProgressCircles(isScrollDown) {
        let progressCircles = document.querySelectorAll('.progress-circle');
        let screenHeight = window.innerHeight;
        let screenMiddle = screenHeight / 2;

        progressCircles.forEach((circle) => {
            let circleTop = circle.getBoundingClientRect().top + window.scrollY;
            let circleActivationPoint = circleTop - screenMiddle * 0.0001;

            if (window.scrollY + screenMiddle >= circleActivationPoint) {
                circle.classList.add('progress-circle--active');
            } else if (
                !isScrollDown &&
                window.scrollY + screenMiddle <= circleActivationPoint &&
                circle.closest('.timespan-blocks__timespan-wrapper')?.classList.contains('timespan-blocks__timespan-wrapper--active') &&
                circle.closest('.timespan-blocks__timespan-wrapper')?.classList.contains('timespan-blocks__timespan-wrapper--scrolled-past')
            ) {
                circle.closest('.timespan-blocks__timespan-wrapper')?.classList.remove('timespan-blocks__timespan-wrapper--scrolled-past');
            } else {
                circle.classList.remove('progress-circle--active');
            }
        });
    }

    function updateTimespanBlocks(isScrollDown) {
        let timespanBlocks = document.querySelectorAll('.timespan-blocks__timespan-wrapper');
        let activeBlockIndex = -1;
        let screenHeight = window.innerHeight;

        timespanBlocks.forEach(function (block, index) {
            let rect = block.getBoundingClientRect();
            if (rect.top <= screenHeight / 2 && rect.bottom >= screenHeight / 2) {
                activeBlockIndex = index;
            } else if (rect.top < screenHeight / 2 && isScrollDown) {
                block.classList.add('timespan-blocks__timespan-wrapper--scrolled-past');
            } else if (isScrollDown) {
                block.classList.remove('timespan-blocks__timespan-wrapper--scrolled-past');
            }
        });

        timespanBlocks.forEach(function (block) {
            block.classList.remove('timespan-blocks__timespan-wrapper--active');
        });

        if (activeBlockIndex !== -1) {
            timespanBlocks[activeBlockIndex]?.classList.add('timespan-blocks__timespan-wrapper--active');
        } else {
            if (timespanBlocks[0].getBoundingClientRect().top > 0) {
                timespanBlocks[0]?.classList.add('timespan-blocks__timespan-wrapper--active');
            } else if (
                window.scrollY >
                timespanBlocks[timespanBlocks.length - 1]?.getBoundingClientRect().bottom - window.innerHeight
            ) {
                timespanBlocks[timespanBlocks.length - 1]?.classList.add('timespan-blocks__timespan-wrapper--active');
            }
        }
    }

    let isScrollDown = this.oldScroll < this.scrollY;
    updateProgressBar();
    updateProgressCircles(isScrollDown);
    updateTimespanBlocks(isScrollDown);

    this.oldScroll = this.scrollY;
};
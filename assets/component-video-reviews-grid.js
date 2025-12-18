if (!customElements.get('video-reviews-grid')) {
  customElements.define(
      'video-reviews-grid',
      class videosGrid extends HTMLElement {
          constructor() {
            super();
            this.videosLoaded = 5;
            this.totalVideos = this.dataset.totalVideos;

            this.videoProperties = this.getAttribute('data-block-settings')
              .split('|')
              .map(object => {
                return JSON.parse(object.replaceAll('\'', '\"'))
              });

            this.loadByPage = +this.getAttribute('data-load-by-page');

            this.loadMoreButton = this.querySelector('[data-load-more]');
            this.loadMoreButton?.addEventListener('click', this.onButtonClick.bind(this));

            this.gridWrapper = this.querySelector('[data-grid-wrapper]');

            this.setListeners.call(this);
          }

          loadVideo(videoProperties) {
            return new Promise((resolve, reject) => {
              const videoElement = document.createElement('video');
              videoElement.src = videoProperties.url;
              videoElement.poster = videoProperties.poster;
              videoElement.preload = 'metadata';
              videoElement.playsInline = true;
              videoElement.load();

              videoElement.addEventListener('canplay', function () {
                resolve(
                  {
                    element: videoElement,
                    properties: videoProperties
                  }
                );
              });

              videoElement.addEventListener('error', function (event) {
                reject(event, videoElement);
              });
            })
          };

          setListeners() {
            const videoReviews = this.querySelectorAll('.video-review');
            videoReviews.forEach((review) => {
              review.addEventListener('click', () => {
                this.playedVideosOnPause.call(this, review);
                const video = review.querySelector('video');
                if (review.classList.toggle('video--played')) {
                  video.play();
                  window.VWO = window.VWO || [];
                  window.VWO.push(['track.videoReviewViewed', {"video": video.src}]);
                }
                else {
                  video.pause();
                }
              });
            });
          }

          playedVideosOnPause(exception) {
            const playedVideoReviews = this.querySelectorAll('.video-review.video--played');
            playedVideoReviews.forEach((review) => {
              if (review !== exception) {
                const playedVideo = review.querySelector('video');
                review.classList.remove('video--played');
                playedVideo.pause();
              }
            })
          }

          loadSomeVideos(videosProperties) {
            let videoPromises = [];
            videosProperties.forEach((video) => {
              videoPromises.push(this.loadVideo(video));
            });
            return Promise.all(videoPromises);
          }

          onButtonClick() {
            const lastIndex = this.videosLoaded + this.loadByPage;
            const urlsToLoad = this.videoProperties.slice(this.videosLoaded, lastIndex);
            const isLastIndex = false;
            this.loadMoreButton.setAttribute('disabled', '');
            this.loadMoreButton.classList.add('load-more--loading');

            this.loadSomeVideos.call(this, urlsToLoad).then((videoObjects) => {
              videoObjects.forEach((videoObject) => {
                this.gridWrapper.append(this.renderVideoReview(videoObject));
                this.videosLoaded = lastIndex;
                this.loadMoreButton.removeAttribute('disabled')
                this.loadMoreButton.classList.remove('load-more--loading');
                if (this.videosLoaded >= this.totalVideos) this.loadMoreButton.style.display = 'none';
              });
            })
              .catch((reason) => {
                console.error(reason);
              })
          }

          renderVideoReview(videoObject) {
            const review = document.createElement('div');
            review.className = 'video-review';
            review.innerHTML = `
              <div class="video-review__controls">
                <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle opacity="0.7" cx="27.6888" cy="27.2215" r="24.1644" stroke="white" stroke-width="4.49571" />
                  <path opacity="0.7" d="M23.0277 36.7129V18.0668C23.0277 17.1237 24.1192 16.5999 24.8549 17.19L35.5098 25.7362C36.0413 26.1625 36.0743 26.9599 35.5798 27.4286L24.9248 37.5286C24.2086 38.2076 23.0277 37.6998 23.0277 36.7129Z" fill="white" />
                </svg>
              </div>
              <div class="video-review__video">
                ${videoObject.element.outerHTML}
              </div>
              <div class="video-review__info">
                <div class="video-review__rating" style="background-image: url(${this.getAttribute('data-stars-unfilled')});">
                  <div
                    class="video-review__rating--filled"
                    style="background-image: url(${this.getAttribute('data-stars-filled')}); width: ${videoObject.properties.rating * 20}%;"
                  ></div>
                </div>
                <p class="video-review__author">${videoObject.properties.author}</p>
              </div>`
            const video = review.querySelector('video');
            review.addEventListener('click', () => {
              this.playedVideosOnPause(review);
              if (review.classList.toggle('video--played')) {
                video.play();
              }
              else {
                video.pause();
              }
            });
            return review;
          }
      }
  )
}
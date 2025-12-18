document.addEventListener("DOMContentLoaded", function () {
  const reviewContainer = document.querySelector(".formula");
  const reviewItems = reviewContainer.querySelectorAll(".formula__reviews-item");
  const reviewContents = reviewContainer.querySelectorAll(".formula__reviews-element");

  const maxAmountIteration = reviewItems.length;
   
  let currentIteration = 1;
  let intervalId;
  

  reviewItems.forEach((item, index,) => item.addEventListener("click", () => showContent(index)));

  function showContent(index) {
    reviewItems.forEach(element => element.classList.remove("formula__reviews-item-active"));
    reviewItems[index].classList.add("formula__reviews-item-active");
    reviewContents.forEach(element => element.classList.add("review__element-hide"))
    reviewContents[index].classList.remove("review__element-hide");

    currentIteration = index;
  }

  function startInterval() {

    if (!intervalId) {
      intervalId = setInterval(() => {
        showContent(currentIteration);
        currentIteration = (currentIteration + 1) % maxAmountIteration;
      }, 4500);
    }
  }

  function stopInterval() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
  if (window.innerWidth >= 990 && !is_auto_scroll_disabled) {    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => entry.isIntersecting ?  startInterval() : stopInterval());
    }, { rootMargin: '50px 0px 50px 0px', threshold: 0.1 });
  
    observer.observe(reviewContainer);
  }
}, {once: true});
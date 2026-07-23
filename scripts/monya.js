import * as main from "./timer.js"


export function initMonya(){
const loadMoreBtn = document.getElementById('load-more-btn');

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      const hiddenGroups = document.querySelectorAll('.hidden-group:not(.show-photos)');
      
      if (hiddenGroups.length > 0) {
        hiddenGroups[0].classList.add('show-photos');
        
        if (hiddenGroups.length === 1) {
          loadMoreBtn.classList.add('btn-hidden');
        }
      }
    });
  }

  const imgs = document.querySelectorAll(".gallery-img")
  imgs.forEach(img => {
    img.addEventListener("click", (e) => {main.createHeartsShower(e)})
  })
}
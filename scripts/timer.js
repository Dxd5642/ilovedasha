export function getCorrectForm(number, forms) {
            if (number % 10 === 1 && number % 100 !== 11) {
                return forms[0];
            } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
                return forms[1];
            } else {
                return forms[2];
            }
        }

export function updateCountdown() {
    const now = new Date();
    const newYearDate = new Date(`June 26, 2026 00:00:00`);
    const difference = now - newYearDate;
            
    if (difference <= 0) {
        document.querySelector(".frag_1_reverse_time_div_time_text_days").textContent = '0';
        document.querySelector(".frag_1_reverse_time_div_time_text_hours").textContent = '0';
        document.querySelector(".frag_1_reverse_time_div_time_text_minuts").textContent = '0';
        document.querySelector(".frag_1_reverse_time_div_time_text_secs").textContent = '0';
        return;
    }
     

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
    const doc = document.querySelector(".hero_block")

    doc.querySelector("#days").textContent = days;
    doc.querySelector("#hours").textContent = hours < 10 ? '0' + hours : hours;
    doc.querySelector("#minutes").textContent = minutes < 10 ? '0' + minutes : minutes;
    doc.querySelector("#seconds").textContent = seconds < 10 ? '0' + seconds : seconds;

    document.getElementById('days_label').textContent = getCorrectForm(days, ['день', 'дня', 'дней']);
    document.getElementById('hours_label').textContent = getCorrectForm(hours, ['час', 'часа', 'часов']);
    document.getElementById('minutes_label').textContent = getCorrectForm(minutes, ['минута', 'минуты', 'минут']);
    document.getElementById('seconds_label').textContent = getCorrectForm(seconds, ['секунда', 'секунды', 'секунд']);
}     


export function createHeartsShower(event) {
    const heartsCount = 6; // Сколько сердечек вылетает за раз
    
    // Получаем координаты тапа (подходит и для touch, и для клика)
    const x = event.clientX || (event.touches && event.touches[0].clientX);
    const y = event.clientY || (event.touches && event.touches[0].clientY);

    for (let i = 0; i < heartsCount; i++) {
      const heart = document.createElement('div');
      heart.classList.add('floating-heart');
      heart.innerHTML = ['❤️', '💖', '💕', '✨'][Math.floor(Math.random() * 4)];

      // Задаем случайный разлет влево/вправо и угол поворота через CSS-переменные
      const randomX = (Math.random() - 0.5) * 120; // Разлет от -60px до +60px
      const randomRotate = (Math.random() - 0.5) * 60; // Поворот
      
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.style.setProperty('--x', `${randomX}px`);
      heart.style.setProperty('--r', `${randomRotate}deg`);

      document.body.appendChild(heart);

      // Удаляем сердечко из памяти после окончания анимации (1.2с)
      setTimeout(() => heart.remove(), 1200);
    }
  }


export function initMainBlock(){
    const photos = [
    { src: './src/images/hero/hero_img.jpg', tag: 'Тапни на нас ✨' },
    { src: './src/images/hero/hero_img2.png', tag: 'Любимая улыбка 😊' },
    { src: './src/images/hero/hero_img3.png', tag: 'Самая любимая собачка 🐶' },
    { src: './src/images/hero/hero_img4.png', tag: 'Наряли щучкой 💦' }
  ];

  let currentPhotoIndex = 0;
  const avatarTrigger = document.getElementById('avatar-trigger');
  const avatarImg = document.getElementById('hero-avatar-img');
  const avatarTag = document.getElementById('avatar-tag');

  if (avatarTrigger && avatarImg) {
    avatarTrigger.addEventListener('click', (e) => {
      // 1. Создаем салют из сердечек в месте клика/тапа
      createHeartsShower(e);

      // 2. Переключаем индекс фото
      currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;

      // 3. Плавная смена через пропадание
      avatarImg.style.opacity = '0';
      
      setTimeout(() => {
        avatarImg.src = photos[currentPhotoIndex].src;
        if (avatarTag) avatarTag.textContent = photos[currentPhotoIndex].tag;
        avatarImg.style.opacity = '1';
      }, 150);
    });
  }
}
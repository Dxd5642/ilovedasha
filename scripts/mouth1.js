import * as func from "./timer.js"

export function initMouth1(){
    const videoRings = document.querySelectorAll('.video-ring');

    videoRings.forEach(ring => {
        const video = ring.querySelector('video');
        const soundToggle = ring.querySelector('.sound-toggle');

        // Клик по самому кружочку (Запуск / Пауза)
        ring.addEventListener('click', (e) => {
        // Если кликнули конкретно по кнопке звука — не ставим видео на паузу
        if (e.target.classList.contains('sound-toggle')) return;

        // Оставляем только одно активное видео на странице
        document.querySelectorAll('.telegram-video').forEach(v => {
            if (v !== video) {
            v.pause();
            v.parentElement.classList.remove('playing');
            }
        });

        if (video.paused) {
            // Если видео дошло до конца, при повторном клике запускаем с начала (0 сек)
            if (video.ended) {
            video.currentTime = 0;
            }
            video.play();
            ring.classList.add('playing');
        } else {
            video.pause();
            ring.classList.remove('playing');
        }
        });

        // Клик по иконке звука (Включение / Выключение)
        if (soundToggle) {
        soundToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем сбытие клика по родителю
            video.muted = !video.muted;
            soundToggle.textContent = video.muted ? '🔇' : '🔊';
        });
        }

        // Событие окончания видео (сыграло 1 раз и остановилось)
        video.addEventListener('ended', () => {
        ring.classList.remove('playing'); // Возвращаем иконку Play
        });
    });


    const statsSection = document.querySelector('.stats-grid');
    const statValues = document.querySelectorAll('.stat-value[data-target]');
    let animated = false;

    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !animated) {
            animated = true;
            statValues.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 3000; // 1.5 секунды длится анимация
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                counter.textContent = target.toLocaleString('ru-RU');
                clearInterval(timer);
                } else {
                counter.textContent = Math.floor(current).toLocaleString('ru-RU');
                }
            }, stepTime);
            });
        }
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    const stats = document.querySelectorAll(".stat-card")
    stats.forEach(card => {
        card.addEventListener('click', (e) => {func.createHeartsShower(e)})
    })
}
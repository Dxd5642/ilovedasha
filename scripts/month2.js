

export function initMouth2(){
    const giftBtn = document.getElementById('giftBtn');
    const giftMessage = document.getElementById('giftMessage');

    // Простая функция запуска конфетти на чистом JS (Canvas)
    function launchConfetti() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#eccc68', '#ff781e'];

        // Создаем 60 частиц конфетти
        for (let i = 0; i < 60; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2 + 50,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.7) * 14,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            opacity: 1
        });
        }

        let animationFrame;
        function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.3; // гравитация
            p.opacity -= 0.015;
            p.rotation += p.rotationSpeed;

            if (p.opacity > 0) {
            alive = true;
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.opacity);
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
            }
        });

        if (alive) {
            animationFrame = requestAnimationFrame(render);
        } else {
            cancelAnimationFrame(animationFrame);
            canvas.remove(); // Удаляем холст после завершения анимации
        }
        }

        render();
    }

    // Привязываем клик к кнопке
    if (giftBtn && giftMessage) {
        giftBtn.addEventListener('click', () => {
        const isHidden = giftMessage.classList.contains('hidden');

        if (isHidden) {
            giftMessage.classList.remove('hidden');
            giftBtn.querySelector('span:last-child').textContent = 'Свернуть';
            launchConfetti(); // Запускаем салют при открытии!
        } else {
            giftMessage.classList.add('hidden');
            giftBtn.querySelector('span:last-child').textContent = 'Открыть открытку';
        }
        });
    }
}
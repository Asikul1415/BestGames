// Меню бургер
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        if (window.innerWidth <= 768) {
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.background = 'var(--gray)';
            nav.style.padding = '1rem';
            nav.style.gap = '1rem';
        }
    });
}

// Адаптация меню при ресайзе
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'row';
        nav.style.position = 'static';
        nav.style.background = 'transparent';
        nav.style.padding = '0';
    } else {
        nav.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    class Slider {
        constructor() {
            this.slides = document.querySelectorAll('.slide');
            this.dots = document.querySelectorAll('.dot');
            this.prevBtn = document.querySelector('.slider-prev');
            this.nextBtn = document.querySelector('.slider-next');
            this.currentSlide = 0;
            this.autoSlideInterval = null;
            
            this.init();
        }
        
        init() {
            // Показываем первый слайд
            this.showSlide(this.currentSlide);
            
            // Добавляем обработчики событий
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prevSlide());
            }
            
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.nextSlide());
            }
            
            // Обработчики для точек
            this.dots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    const slideIndex = parseInt(e.target.dataset.slide);
                    this.showSlide(slideIndex);
                });
            });
            
            // Автопрокрутка
            this.startAutoSlide();
            
            // Останавливаем автопрокрутку при наведении
            const slider = document.querySelector('.slider');
            if (slider) {
                slider.addEventListener('mouseenter', () => this.stopAutoSlide());
                slider.addEventListener('mouseleave', () => this.startAutoSlide());
            }
            
            // Останавливаем автопрокрутку при касании на мобильных
            if (slider) {
                slider.addEventListener('touchstart', () => this.stopAutoSlide());
            }
        }
        
        showSlide(index) {
            // Скрываем все слайды
            this.slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Убираем активный класс со всех точек
            this.dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Показываем выбранный слайд
            if (index >= this.slides.length) {
                this.currentSlide = 0;
            } else if (index < 0) {
                this.currentSlide = this.slides.length - 1;
            } else {
                this.currentSlide = index;
            }
            
            this.slides[this.currentSlide].classList.add('active');
            this.dots[this.currentSlide].classList.add('active');
        }
        
        nextSlide() {
            this.showSlide(this.currentSlide + 1);
        }
        
        prevSlide() {
            this.showSlide(this.currentSlide - 1);
        }
        
        startAutoSlide() {
            this.stopAutoSlide(); // Останавливаем предыдущий интервал
            this.autoSlideInterval = setInterval(() => {
                this.nextSlide();
            }, 5000); // Меняем слайд каждые 5 секунд
        }
        
        stopAutoSlide() {
            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
                this.autoSlideInterval = null;
            }
        }
    }
    
    // Инициализируем слайдер при загрузке страницы
    new Slider();
});


// Добавь в конец твоего script.js этот код:

// ==================== ПЕРЕКЛЮЧЕНИЕ ТЕМ ====================
function initThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const switcherButtons = document.querySelectorAll('.theme-switcher-btn');
    
    // Переключение через кнопки в профиле
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme') || this.textContent.trim();
            switchTheme(theme);
            
            // Сохраняем в localStorage
            localStorage.setItem('theme', theme);
        });
    });
    
    // Переключение через блок в светлой теме
    switcherButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.classList.contains('dark')) {
                e.preventDefault();
                switchTheme('dark');
                localStorage.setItem('theme', 'dark');
                // Перенаправляем на темную тему через 500мс
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 500);
            }
        });
    });
    
    // Восстановление темы при загрузке
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        switchTheme(savedTheme);
    }
}

// Функция переключения темы
function switchTheme(theme) {
    const body = document.body;
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    // Убираем активный класс у всех кнопок
    themeButtons.forEach(btn => {
        btn.classList.remove('active');
        // Добавляем active к соответствующей кнопке
        const btnTheme = btn.getAttribute('data-theme') || btn.textContent.trim();
        if (btnTheme.toLowerCase().includes(theme.toLowerCase())) {
            btn.classList.add('active');
        }
    });
    
    // Меняем тему на странице (если это не отдельная страница light)
    if (theme === 'light' && !body.classList.contains('light-theme')) {
        // Если нужно переключить на лету, можно добавить класс
        // body.classList.add('light-theme');
    } else if (theme === 'dark' && body.classList.contains('light-theme')) {
        // body.classList.remove('light-theme');
    }
}

// В основной инициализации добавь:
document.addEventListener('DOMContentLoaded', function() {
    initThemeSwitcher();
});
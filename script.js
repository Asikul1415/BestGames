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
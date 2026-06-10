document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. ЗБЕРЕЖЕННЯ ДАНИХ У БРАУЗЕРІ (localStorage)
    // ==========================================

    // Отримуємо дані про ОС та браузер через утиліту navigator
    const osInfo = navigator.platform;
    const browserInfo = navigator.userAgent;

    // Зберігаємо в localStorage (пункт 1.a)
    localStorage.setItem("userOS", osInfo);
    localStorage.setItem("userBrowser", browserInfo);

    // Відображаємо збережену інформацію у футері (пункт 1.b)
    const footerInfoBlock = document.getElementById("browser-info");
    const storedOS = localStorage.getItem("userOS");
    const storedBrowser = localStorage.getItem("userBrowser");

    if (footerInfoBlock) {
        footerInfoBlock.innerHTML = `<strong>Ваша система (з localStorage):</strong> ОС: ${storedOS} | Браузер: ${storedBrowser}`;
    }


    // ==========================================
    // 2. ДИНАМІЧНИЙ ВМІСТ ІЗ СЕРВЕРУ (Fetch API)
    // ==========================================

    const commentsContainer = document.getElementById("comments-container");
    // ЗАМІНІТЬ '1' НА СВІЙ НОМЕР ВАРІАНТУ, ЯКЩО ПОТРІБНО (пункт 2.a.i)
    const variantNumber = 1;
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Помилка завантаження даних");
            }
            return response.json();
        })
        .then(comments => {
            commentsContainer.innerHTML = ""; // Очищаємо початковий текст завантаження

            // Відображаємо коментарі у порядку отримання (пункт 2.b)
            comments.forEach(comment => {
                const commentElement = document.createElement("div");
                commentElement.classList.add("comment-item");
                commentElement.innerHTML = `
                    <h4>${comment.name}</h4>
                    <em>Від: ${comment.email}</em>
                    <p>${comment.body}</p>
                `;
                commentsContainer.appendChild(commentElement);
            });
        })
        .catch(error => {
            console.error("Помилка:", error);
            commentsContainer.innerHTML = "<p>Не вдалося завантажити відгуки роботодавців.</p>";
        });


    // ==========================================
    // 3. ФОРМА ЗВОРОТНЬОГО ЗВ'ЯЗКУ (Модальне вікно)
    // ==========================================

    const modal = document.getElementById("contact-modal");
    const closeModalBtn = document.querySelector(".close-modal-btn");

    // Показуємо модальне вікно через 1 хвилину (60000 мілісекунд) (пункт 3.a)
    setTimeout(() => {
        if (modal) modal.style.display = "block";
    }, 60000);

    // Закриття модального вікна при кліку на хрестик
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    // Закриття модального вікна при кліку поза його межами
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });


    // ==========================================
    // 4. ПЕРЕХІД НА НІЧНИЙ / ДЕННИЙ РЕЖИМ
    // ==========================================

    const themeToggleBtn = document.getElementById("theme-toggle-btn");

    // Функція автоматичного перемикання за часом (пункт 4.b)
    function checkTimeAndSetTheme() {
        const currentHour = new Date().getHours();

        // Денна тема від 07:00 до 21:00, інакше — нічна
        if (currentHour >= 7 && currentHour < 21) {
            document.body.classList.remove("dark-theme");
        } else {
            document.body.classList.add("dark-theme");
        }
    }

    // Запускаємо автоматичну перевірку при завантаженні
    checkTimeAndSetTheme();

    // Ручне перемикання по кнопці (пункт 4.a)
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
        });
    }
});
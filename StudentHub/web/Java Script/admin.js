document.addEventListener("DOMContentLoaded", () => {

    const sections = document.querySelectorAll("section");
    const articles = document.querySelectorAll("article");
    const lists = document.querySelectorAll("ul");
    const headings = document.querySelectorAll("h2");

    sections.forEach((section, index) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";

        setTimeout(() => {
            section.style.transition = "0.5s ease";
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        }, index * 120);
    });

    articles.forEach(article => {
        article.addEventListener("mouseenter", () => {
            article.style.transform = "translateY(-3px)";
            article.style.transition = "0.3s";
        });

        article.addEventListener("mouseleave", () => {
            article.style.transform = "translateY(0)";
        });
    });

    const stats = [
        "1250",
        "85",
        "6",
        "24",
        "340"
    ];

    const strongElements = document.querySelectorAll("strong");

    strongElements.forEach((element, index) => {
        if (stats[index]) {
            const target = parseInt(stats[index]);
            let current = 0;
            const step = Math.ceil(target / 40);

            const counter = setInterval(() => {
                current += step;

                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }

                element.textContent = current.toLocaleString();
            }, 30);
        }
    });

    lists.forEach(list => {
        const items = list.querySelectorAll("li");

        items.forEach(item => {
            item.addEventListener("click", () => {
                item.classList.toggle("selected");

                if (item.classList.contains("selected")) {
                    item.style.fontWeight = "bold";
                    item.style.color = "#00e5ff";
                } else {
                    item.style.fontWeight = "normal";
                    item.style.color = "";
                }
            });
        });
    });

    const searchBox = document.createElement("input");

    searchBox.type = "text";
    searchBox.placeholder = "Search admin panel...";
    searchBox.id = "adminSearch";

    searchBox.style.width = "100%";
    searchBox.style.padding = "13px";
    searchBox.style.margin = "15px 0";
    searchBox.style.borderRadius = "8px";
    searchBox.style.border = "1px solid #00bcd4";
    searchBox.style.background = "rgba(255,255,255,0.08)";
    searchBox.style.color = "white";
    searchBox.style.fontSize = "16px";

    const main = document.querySelector("main");

    if (main) {
        main.prepend(searchBox);
    }

    searchBox.addEventListener("input", () => {

        const value = searchBox.value.toLowerCase();

        sections.forEach(section => {

            const text = section.textContent.toLowerCase();

            section.style.display =
                text.includes(value) ? "block" : "none";

        });
    });

    const currentDate = document.createElement("p");

    currentDate.id = "adminDate";
    currentDate.style.textAlign = "center";
    currentDate.style.color = "#9beeff";

    const updateDate = () => {

        const now = new Date();

        currentDate.textContent =
            now.toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }) +
            " • " +
            now.toLocaleTimeString("en-IN");
    };

    if (main) {
        main.insertBefore(currentDate, searchBox);
    }

    updateDate();
    setInterval(updateDate, 1000);

    const notification = document.createElement("div");

    notification.textContent = "✓ Admin dashboard loaded successfully";

    notification.style.position = "fixed";
    notification.style.bottom = "25px";
    notification.style.right = "25px";
    notification.style.padding = "14px 20px";
    notification.style.background = "#00bcd4";
    notification.style.color = "white";
    notification.style.borderRadius = "8px";
    notification.style.fontWeight = "bold";
    notification.style.zIndex = "9999";
    notification.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transition = "0.5s";
    }, 3000);

    setTimeout(() => {
        notification.remove();
    }, 3600);

    const feedbackItems = [...document.querySelectorAll("li")]
        .filter(item =>
            item.textContent.includes("⭐")
        );

    feedbackItems.forEach(item => {

        item.style.cursor = "pointer";

        item.addEventListener("click", () => {

            const message = item.textContent;

            alert(
                "Feedback Details\n\n" +
                message +
                "\n\nThank you for reviewing this feedback."
            );
        });
    });

    articles.forEach(article => {

        const title = article.querySelector("h3");

        if (!title) return;

        title.style.cursor = "pointer";

        title.addEventListener("click", () => {

            alert(
                "Announcement\n\n" +
                title.textContent +
                "\n\n" +
                article.querySelector("p")?.textContent
            );
        });
    });

    const managementSections = [...sections].filter(section => {

        const text = section.textContent.toLowerCase();

        return (
            text.includes("student management") ||
            text.includes("course management") ||
            text.includes("event management")
        );
    });

    managementSections.forEach(section => {

        const button = document.createElement("button");

        button.textContent = "Manage";

        button.style.marginTop = "15px";
        button.style.padding = "10px 18px";
        button.style.border = "none";
        button.style.borderRadius = "7px";
        button.style.background = "#00bcd4";
        button.style.color = "white";
        button.style.fontWeight = "bold";
        button.style.cursor = "pointer";

        section.appendChild(button);

        button.addEventListener("click", () => {

            const name =
                section.querySelector("h2")?.textContent ||
                "Management";

            alert(
                name +
                "\n\nManagement panel opened successfully."
            );
        });
    });

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const answer = confirm(
                "Open " +
                link.textContent +
                " page?"
            );

            if (!answer) {
                event.preventDefault();
            }
        });
    });

    const footer = document.querySelector("footer");

    if (footer) {

        const status = document.createElement("p");

        status.textContent = "System Status: Online ●";

        status.style.color = "#22c55e";
        status.style.fontWeight = "bold";

        footer.appendChild(status);
    }

    const savedTheme =
        localStorage.getItem("adminTheme");

    if (savedTheme === "light") {

        document.body.style.background =
            "#f5f7fa";

        document.body.style.color =
            "#1f2937";
    }

    const themeButton =
        document.createElement("button");

    themeButton.textContent = "Theme";

    themeButton.style.position = "fixed";
    themeButton.style.top = "20px";
    themeButton.style.right = "20px";
    themeButton.style.padding = "9px 15px";
    themeButton.style.border = "none";
    themeButton.style.borderRadius = "7px";
    themeButton.style.background = "#00bcd4";
    themeButton.style.color = "white";
    themeButton.style.cursor = "pointer";
    themeButton.style.zIndex = "1000";

    document.body.appendChild(themeButton);

    themeButton.addEventListener("click", () => {

        const light =
            localStorage.getItem("adminTheme") !== "light";

        if (light) {

            document.body.style.background =
                "#f5f7fa";

            document.body.style.color =
                "#1f2937";

            localStorage.setItem(
                "adminTheme",
                "light"
            );

        } else {

            document.body.style.background =
                "linear-gradient(135deg,#0f2027,#203a43,#2c5364)";

            document.body.style.color =
                "white";

            localStorage.setItem(
                "adminTheme",
                "dark"
            );
        }
    });

    const mobileCheck = () => {

        if (window.innerWidth <= 768) {

            searchBox.style.fontSize = "14px";

            notification.style.right = "10px";
            notification.style.left = "10px";
            notification.style.bottom = "10px";

        } else {

            searchBox.style.fontSize = "16px";

            notification.style.left = "auto";
            notification.style.right = "25px";
        }
    };

    mobileCheck();

    window.addEventListener(
        "resize",
        mobileCheck
    );

});
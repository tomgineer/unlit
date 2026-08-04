document.addEventListener("DOMContentLoaded", () => {
    const startDate = new Date("2018-06-11T12:00:00");
    const cigsPerDay = 60;
    const costPerCig = 0.4;
    const lifePerCigMinutes = 10;
    const porscheCost = 100000;
    const largeDisplayQuery = window.matchMedia("(min-width: 1024px)");
    const customDisplays = [...document.querySelectorAll(".custom-display")];
    const staggerDelay = 500;
    let rotateTimers = [];
    const counters = {
        years: document.querySelector("[data-years] span:first-child"),
        months: document.querySelector("[data-months] span:first-child"),
        days: document.querySelector("[data-days] span:first-child"),
        hours: document.querySelector("[data-hours] span:first-child"),
        minutes: document.querySelector("[data-minutes] span:first-child"),
        seconds: document.querySelector("[data-seconds] span:first-child"),
        cigsDodged: document.querySelector("[data-cigs-dodged] span:first-child"),
        moneySaved: document.querySelector("[data-money-saved] span:first-child"),
        lifeReclaimed: document.querySelector("[data-life-reclaimed] span:first-child"),
        porscheProgress: document.querySelector("[data-porsche-progress] span:first-child"),
    };

    const clearRotateTimers = () => {
        rotateTimers.forEach((timer) => window.clearTimeout(timer));
        rotateTimers = [];
    };

    const resetDisplayRotation = () => {
        clearRotateTimers();
        customDisplays.forEach((display) => display.classList.remove("-rotate-45"));
    };

    const staggerDisplayRotation = () => {
        resetDisplayRotation();

        if (!largeDisplayQuery.matches) {
            return;
        }

        rotateTimers = customDisplays.map((display, index) => {
            return window.setTimeout(() => {
                display.classList.add("-rotate-45");
            }, index * staggerDelay);
        });
    };

    const decimalFormatter = new Intl.NumberFormat("de-DE", {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
    });
    const progressFormatter = new Intl.NumberFormat("de-DE", {
        minimumFractionDigits: 5,
        maximumFractionDigits: 5,
    });
    const moneyFormatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
    });

    const setCounter = (counter, value) => {
        if (counter) {
            counter.textContent = value;
        }
    };

    const formatElapsedValue = (value) => {
        return String(value).padStart(2, "0");
    };

    const setDecimalCounter = (counter, value) => {
        if (!counter) {
            return;
        }

        const decimalIndex = value.indexOf(",");

        if (decimalIndex === -1) {
            counter.textContent = value;
            return;
        }

        counter.textContent = "";
        counter.append(
            value.slice(0, decimalIndex),
            Object.assign(document.createElement("span"), {
                className: "text-base-content/45",
                textContent: value.slice(decimalIndex),
            }),
        );
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getElapsedTime = (nowDate) => {
        let years = nowDate.getFullYear() - startDate.getFullYear();
        let months = nowDate.getMonth() - startDate.getMonth();
        let days = nowDate.getDate() - startDate.getDate();
        let hours = nowDate.getHours() - startDate.getHours();
        let minutes = nowDate.getMinutes() - startDate.getMinutes();
        let seconds = nowDate.getSeconds() - startDate.getSeconds();

        if (seconds < 0) {
            seconds += 60;
            minutes--;
        }

        if (minutes < 0) {
            minutes += 60;
            hours--;
        }

        if (hours < 0) {
            hours += 24;
            days--;
        }

        if (days < 0) {
            const previousMonth = nowDate.getMonth() === 0 ? 11 : nowDate.getMonth() - 1;
            const previousMonthYear = previousMonth === 11 ? nowDate.getFullYear() - 1 : nowDate.getFullYear();

            days += getDaysInMonth(previousMonthYear, previousMonth);
            months--;
        }

        if (months < 0) {
            months += 12;
            years--;
        }

        return { years, months, days, hours, minutes, seconds };
    };

    const updateCounters = () => {
        const nowDate = new Date();
        const elapsedTime = getElapsedTime(nowDate);
        const elapsedDays = (nowDate - startDate) / 1000 / 86400;
        const cigsDodged = elapsedDays * cigsPerDay;
        const moneySaved = cigsDodged * costPerCig;
        const lifeReclaimedDays = cigsDodged * (lifePerCigMinutes / 1440);
        const porscheProgress = (moneySaved / porscheCost) * 100;

        setCounter(counters.years, formatElapsedValue(elapsedTime.years));
        setCounter(counters.months, formatElapsedValue(elapsedTime.months));
        setCounter(counters.days, formatElapsedValue(elapsedTime.days));
        setCounter(counters.hours, formatElapsedValue(elapsedTime.hours));
        setCounter(counters.minutes, formatElapsedValue(elapsedTime.minutes));
        setCounter(counters.seconds, formatElapsedValue(elapsedTime.seconds));
        setDecimalCounter(counters.cigsDodged, decimalFormatter.format(cigsDodged));
        setDecimalCounter(counters.moneySaved, moneyFormatter.format(moneySaved));
        setDecimalCounter(counters.lifeReclaimed, decimalFormatter.format(lifeReclaimedDays));
        setDecimalCounter(counters.porscheProgress, `${progressFormatter.format(porscheProgress)}%`);
    };

    updateCounters();
    setInterval(updateCounters, 1000);
    staggerDisplayRotation();
    largeDisplayQuery.addEventListener("change", staggerDisplayRotation);
});

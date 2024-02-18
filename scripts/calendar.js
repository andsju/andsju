/**
 * add to prototype: firstDayInMonth 
 *
 * @return {number} 
 */
Date.prototype.firstDayInMonth = function () {
    let year = this.getFullYear();
    let month = this.getMonth();
    let date = new Date(year, month, 1);

    return date.getDay();
}

/**
 * add to prototype: lastDayInMonth
 *
 * @return {number} 
 */
Date.prototype.lastDayInMonth = function () {
    let year = this.getFullYear();
    let month = this.getMonth();
    let date = new Date(year, month + 1, 0);

    return date.getDay();
}

/**
 * add to prototype: daysInMonth
 *
 * @return {number} 
 */
Date.prototype.daysInMonth = function () {
    let year = this.getFullYear();
    let month = this.getMonth() + 1;

    return new Date(year, month, 0).getDate();
}

/**
 * add to prototype: addDays
 *
 * @param {number} n
 * @return {Date} 
 */
Date.prototype.addDays = function (n) {
    if (!Number.isInteger(n)) {
        return
    }

    return this.setDate(this.getDate() + n);
}

/**
 * add to prototype: daysInMonth
 *
 * @return {string} yyyy-mm-dd 
 */
Date.prototype.isoFormat = function () {
    return this.toISOString().slice(0, 10);
}





/**
 * add to prototype: daysInMonth
 * https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
 *
 * @return {number} 
 */
Date.prototype.getWeekNumber = function () {
    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
};


const months = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];
const monthsShort = ["jan", "feb", "mars", "apr", "maj", "juni", "juli", "aug", "sep", "okt", "nov", "dec"];
const days = ["sö", "må", "ti", "on", "to", "fr", "lö"];
const today = new Date().toLocaleDateString();
const jsCalendars = document.querySelectorAll("[data-jscal]");



/**
 * getMonthInfo
 *
 * @param {Date} d
 * @return {object} 
 */
function getMonthInfo(d) {
    const y = d.getFullYear();
    const m = d.getMonth();
    const firstDayOfMonth = new Date(y, m, 1).getDay();
    const lastDateOfMonth = new Date(y, m + 1, 0).getDate();
    const lastDayOfMonth = new Date(y, m, lastDateOfMonth).getDay();

    return {
        year: y,
        month: m,
        monthName: months[m],
        firstDayOfMonth: firstDayOfMonth,
        lastDateOfMonth: lastDateOfMonth,
        lastDayOfMonth: lastDayOfMonth
    };
}


/**
 * renderDate
 *
 * @param {Date} date
 * @param {string} cl
 * @return {HTMLElement} 
 */
function renderDate(date, cl) {


    
    let li = document.createElement("li");

    li.innerHTML = `
        <div>
            <span class="day">${renderDayOfWeek(date)}</span><span class="week">${renderWeek(date)}</span>
        </div>
        <div>
            <span class="date">${date.getDate()}</span><span class="month">${renderMonth(date)}</span>
        </div>`;


    li.setAttribute("data-date", date.toLocaleDateString());
    if (date.toLocaleDateString() === today) {
        li.classList = "date today";
    }
    if (cl !== undefined) {
        li.className = cl;
    }
    return li;
}


/**
 * addDays
 *
 * @param {Date} date
 * @param {number} days
 * @return {Date} 
 */
function addDaysToTime(date, days) {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);

    return newDate;
}



/**
 * addDays
 *
 * @param {Date} date
 * @param {number} days
 * @return {Date} 
 */
function addDays(date, days) {
    let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    newDate.setDate(newDate.getDate() + days);

    return newDate;
}




/**
 * nextMonth
 *
 * @param {Date} date
 * @return {Date} 
 */
function nextMonth(date) {
    let newDate = new Date(date);

    let currentMonth = getMonthInfo(newDate);
    let dd = new Date(currentMonth.year, currentMonth.month, currentMonth.lastDateOfMonth);
    dd.addDays(1);

    return dd;
}

/**
 * renderWeek
 *
 * @param {Date} date
 * @return {string} 
 */
function renderWeek(date) {
    if (date.getDay() === 1) {
        return `v${date.getWeekNumber()}`;
    }

    return "";
}

/**
 * renderMonth
 *
 * @param {Date} date
 * @return {string} 
 */
 function renderMonth(date) {
    if (date.getDate() === 1) {
        return `${monthsShort[date.getMonth()]}`;
    }

    return "";
}


/**
 * renderDayOfWeek
 *
 * @param {Date} date
 * @return {number} 
 */
function renderDayOfWeek(date) {

    return days[date.getDay()];
}


/**
 * renderWeekDates
 *
 * @param {Date} date
 * @return {string} 
 */
function renderWeekDates(date) {

    // monday
    const monday = date.getDate() - date.getDay() + 1;
    let d1 = new Date(date.getFullYear(), date.getMonth(), monday);

    let d2 = addDays(d1, 6);
    const sunday = d2.getDate();

    let result;

    // same month
    if (monday < sunday) {
        result = `${monday}-${sunday} ${months[d1.getMonth()]}`;
    } else {
        result = `${monday} ${months[d1.getMonth()]} - ${sunday} ${months[d2.getMonth()]}`
    }

    return result;
}

/**
 * renderCalendarWeek
 *
 * @param {Date} date
 * @param {HTMLElement} container
 * @param {boolean} [nav=true]
 */
function renderCalendarWeek(date, container, nav = true) {

    let ul = container.querySelector("ul") || document.createElement("ul");
    ul.innerHTML = "";

    var d;
    var counter = 0;

    ul.className = "calendarWeek";

    // week start monday: - 1
    let preDays = date.getDay() === 0 ? 6 : date.getDay() - 1;

    // excluding current date day
    let postDays = 6 - preDays;

    while (preDays >= 0) {
        d = new Date(date);
        d.setDate(d.getDate() - preDays);
        ul.appendChild(renderDate(d));
        preDays--;
    }
    counter = 1;
    while (postDays > 0) {

        d = new Date(date);
        d.setDate(d.getDate() + counter);
        ul.appendChild(renderDate(d));
        postDays--;
        counter++;
    }

    if (nav) {
        container.appendChild(renderCalendarNav());
        renderCalendarInfo(container, date, "week");
        container.appendChild(ul);
    }
}


/**
 * renderCalendarMonth
 *
 * @param {Date} date
 * @param {HTMLElement} container
 * @param {boolean} [nav=true]
 */
function renderCalendarMonth(date, container, nav = true) {

    var dateInMonth;
    var d;
    var counter;

    const holidays = getHolidays(date.getFullYear());


    let ul = container.querySelector("ul") || document.createElement("ul");
    ul.innerHTML = "";
    ul.className = "calendarMonth";

    let previousMonth = getMonthInfo(new Date(date.getFullYear(), date.getMonth(), 0));

    // week start monday: - 1
    let preDays = previousMonth.lastDayOfMonth - 1;

    while (preDays >= 0) {
        dateInMonth = previousMonth.lastDateOfMonth - preDays;
        d = new Date(previousMonth.year, previousMonth.month, dateInMonth);
        ul.appendChild(renderDate(d, "previous"));
        preDays--;
    }

    let currentMonth = getMonthInfo(date);
    dateInMonth = 1;

    while (dateInMonth <= currentMonth.lastDateOfMonth) {
        d = new Date(currentMonth.year, currentMonth.month, dateInMonth);

        let cl = "";
        for (let i = 0; i < holidays.length; i++) {
            // console.log(toISO(d) == holidays[i].date);
            if (toISO(d) == holidays[i].date) {
                cl = holidays[i].holiday === true ? "holiday "+ holidays[i].title : holidays[i].title;
            }
        }

        
        ul.appendChild(renderDate(d, cl));
        dateInMonth++;
    }

    d.addDays(1);
    let nextMonth = getMonthInfo(d);

    dateInMonth = 1;
    counter = currentMonth.lastDayOfMonth;
    while (counter < 7) {

        d = new Date(nextMonth.year, nextMonth.month, dateInMonth);
        ul.appendChild(renderDate(d, "next"));

        counter++;
        dateInMonth++;
    }
    if (nav) {
        container.appendChild(renderCalendarNav());
        renderCalendarInfo(container, date, "month");
        container.appendChild(ul);
    }
}



/**
 * renderCalendarMonths
 *
 * @param {Date} date
 * @param {number} numberOfMonths
 * @param {HTMLElement} container
 * @param {boolean} [nav=true]
 */
 function renderCalendarMonths(date, numberOfMonths, container, nav = true) {

    var dateInMonth;
    var d;
    var counter;
    let currentMonth = getMonthInfo(date);


    for (let i = 0; i < numberOfMonths; i++) {
        let ul = document.createElement("ul");
        ul.innerHTML = "";
        ul.className = "calendarMonths";

        dateInMonth = 1;

        while (dateInMonth <= currentMonth.lastDateOfMonth) {
            d = new Date(currentMonth.year, currentMonth.month, dateInMonth);
            ul.appendChild(renderDate(d));
            dateInMonth++;
        }
    
        d.addDays(1);
        currentMonth = getMonthInfo(d);



        if (nav && i === 0) {
            container.appendChild(renderCalendarNav());
            // renderCalendarInfo(container, date, "month");
        }
    
        container.appendChild(ul);
    }

}





/**
 * renderCalendarNav
 *
 * @return {HTMLElement} 
 */
function renderCalendarNav() {
    let fragment = new DocumentFragment();
    let div = document.createElement("div");
    div.className = "nav";
    let span = document.createElement("span");
    span.innerText = "< ";
    span.title = "previous";
    span.classList = "navigate previous";
    div.appendChild(span);
    span = document.createElement("span");
    span.innerText = "⌣";
    span.title = "current";
    span.classList = "navigate current";
    div.appendChild(span);
    span = document.createElement("span");
    span.innerText = " >";
    span.title = "next";
    span.classList = "navigate next";
    div.appendChild(span);
    span = document.createElement("span");
    span.className = "calendarInfo";
    div.appendChild(span);
    fragment.appendChild(div);

    return fragment;
}


/**
 * renderCalendarInfo
 *
 * @param {HTMLElement} container
 * @param {Date} date
 * @param {string} type
 */
function renderCalendarInfo(container, date, type) {

    let element = container.querySelector(".calendarInfo");

    switch (type) {
        case "month":

            let currentMonth = getMonthInfo(date);
            element.textContent = `${currentMonth.monthName} ${currentMonth.year}`;
            break;

        case "week":

            element.textContent = renderWeekDates(date) + " " + date.getFullYear();
            break;
    }
}


/**
 * initCalendar
 *
 * @param {Date} date
 */
function initCalendar(date) {
    let jsCalendars = document.querySelectorAll("[data-jscal]");

    jsCalendars.forEach(jsCalendar => {
        switch (jsCalendar.getAttribute("data-jscal")) {
            case "week":
                renderCalendarWeek(date, jsCalendar);
                break;
            case "month":
                renderCalendarMonth(date, jsCalendar);
                break;
            case "months":
                let n = jsCalendar.getAttribute("data-jscal-numberofmonths");
                console.log(n);
                renderCalendarMonths(date, n, jsCalendar);
                break;
            }
    })
}





// event listener
window.addEventListener("DOMContentLoaded", function (event) {
    let date = new Date();
    initCalendar(date);
})


// add calendar nav event listeners
jsCalendars.forEach((jsCalendar) => {
    jsCalendar.addEventListener("click", (e) => {
        if (e.target.classList.contains("navigate")) {

            let d = e.target.parentElement.nextElementSibling.children[0].getAttribute("data-date");
            let date = new Date(d);
            let container = jsCalendar.querySelector("div");

            switch (jsCalendar.getAttribute("data-jscal")) {
                case "month":

                    if (e.target.classList.contains("previous")) {

                        let previousMonth = getMonthInfo(new Date(date.getFullYear(), date.getMonth(), 1));

                        // if first day in month === monday
                        if (previousMonth.firstDayOfMonth === 1) {
                            previousMonth = getMonthInfo(new Date(date.getFullYear(), date.getMonth(), 0));
                        }
                        date = new Date(previousMonth.year, previousMonth.month, 1);

                    } else if (e.target.classList.contains("next")) {

                        let currentMonth = getMonthInfo(new Date(date));
                        let newDate = new Date(currentMonth.year, currentMonth.month, currentMonth.lastDateOfMonth);
                        newDate.addDays(1);

                        date = nextMonth(newDate);

                    } else {
                        date = new Date()
                    }

                    renderCalendarMonth(date, jsCalendar, false);
                    renderCalendarInfo(container, date, "month");
                    break;

                case "week":

                    if (e.target.classList.contains("previous")) {
                        date.addDays(-7);
                    } else if (e.target.classList.contains("next")) {
                        date.addDays(7);
                    } else {
                        date = new Date()
                    }

                    renderCalendarWeek(date, jsCalendar, false);
                    renderCalendarInfo(container, date, "week");
                    break;
            }
        }
    })
})



// let inputDate = document.getElementById("date");
// inputDate.addEventListener("change", function () {
//     let date = new Date(this.value);
//     initCalendar(date);

//     console.log("Easter date: ", easterDate(date.getUTCFullYear()));
// })



function easterDate(y) // Takes a given year (y) then returns Date object of Easter Sunday
{
    /*
    	Easter Date Function for JavaScript implemented by Furgelnod ( https://furgelnod.com )
    	Using algorithm published at The Date of Easter (on aa.usno.navy.mil, Oct 2007) 
    	(https://web.archive.org/web/20071015045929/http://aa.usno.navy.mil/faq/docs/easter.php)
    	The algorithm is credited to J.-M. Oudin (1940) and is reprinted in the 
    	Explanatory Supplement to the Astronomical Almanac, ed. P. K. Seidelmann (1992). 
    	See Chapter 12, "Calendars", by L. E. Doggett.
    */
    try {
        y = Number(y);
        if (y != y) {
            throw new TypeError("Value must be a number.");
        } else if (y > 275760 || y < -271820) {
            throw new RangeError("Value be between -271820 and 275760 due to technical limitations of Date constructor.");
        }
    } catch (e) {
        console.error(e);
    }

    y = Math.floor(y);
    var c = Math.floor(y / 100);
    var n = y - 19 * Math.floor(y / 19);
    var k = Math.floor((c - 17) / 25);
    var i = c - Math.floor(c / 4) - Math.floor((c - k) / 3) + 19 * n + 15;
    i = i - 30 * Math.floor(i / 30);
    i = i - Math.floor(i / 28) * (1 - Math.floor(i / 28) * Math.floor(29 / (i + 1)) * Math.floor((21 - n) / 11));
    var j = y + Math.floor(y / 4) + i + 2 - c + Math.floor(c / 4);
    j = j - 7 * Math.floor(j / 7);
    var l = i - j;
    var m = 3 + Math.floor((l + 40) / 44);
    var d = l + 28 - 31 * Math.floor(m / 4);
    // var z = new Date();
    var z = new Date(y, m - 1, d);
    z.setFullYear(y, m - 1, d);
    return z;
}


function getHolidays(year) {

    // const date = new Date(year, m, d);
    // const year = date.getFullYear();
    const easter = easterDate(year);

    const dates = [];

    dates.push({date: toISO(addDays(easter, -6)), title: "Blåmåndagen", holiday: false});
    dates.push({date: toISO(addDays(easter, -5)), title: "Fettisdagen", holiday: false});
    dates.push({date: toISO(addDays(easter, -4)), title: "Askonsdagen", holiday: false});
    dates.push({date: toISO(addDays(easter, -3)), title: "Skärtorsdag", holiday: false});
    dates.push({date: toISO(addDays(easter, -2)), title: "Långfredag", holiday: true});
    dates.push({date: toISO(addDays(easter, -1)), title: "Påskafton", holiday: false});
    dates.push({date: toISO(easter), title: "Påskdagen", holiday: true});
    dates.push({date: toISO(addDays(easter, 1)), title: "Annandag påsk", holiday: true});
    dates.push({date: toISO(addDays(easter, 39)), title: "Kristi himmelfärdsdag", holiday: false});
    dates.push({date: toISO(addDays(easter, 49)), title: "Pingstdagen", holiday: true});
    dates.push({date: toISO(addDays(midSummer(year), -1 )), title: "Midsommarafton", holiday: false});
    dates.push({date: toISO(midSummer(year)), title: "Midsommardagen", holiday: true});
    dates.push({date: toISO(getAllaHelgonsDag(year)), title: "Alla Helgons dag", holiday: true});
    dates.push({date: toISO(new Date(year, 0, 1)), title: "Nyårsdagen", holiday: true});
    dates.push({date: toISO(new Date(year, 0, 5)), title: "Trettondagsafton", holiday: false});
    dates.push({date: toISO(new Date(year, 0, 6)), title: "Trettondag jul", holiday: true});
    dates.push({date: toISO(new Date(year, 3, 30)), title: "Valborgsmässoafton", holiday: false});
    dates.push({date: toISO(new Date(year, 4, 1)), title: "Första maj", holiday: true});
    dates.push({date: toISO(new Date(year, 5, 6)), title: "Sveriges nationaldag", holiday: true});
    dates.push({date: toISO(new Date(year, 11, 24)), title: "Julafton", holiday: false});
    dates.push({date: toISO(new Date(year, 11, 25)), title: "Juldagen", holiday: true});
    dates.push({date: toISO(new Date(year, 11, 26)), title: "Annandag jul", holiday: true});
    dates.push({date: toISO(new Date(year, 11, 26)), title: "Nyårsdagen", holiday: true});

    return dates;
}

function midSummer(y) {
    const dayOfWeek = new Date(y, 5, 20).getDay(); 
    return new Date(y, 5, 20 + (6 - dayOfWeek));
}

function getAllaHelgonsDag(y) {
    const lastDateInOctober = new Date(y, 9, 31); 
    const dayOfWeek = lastDateInOctober.getDay();
    return dayOfWeek === 6 ? lastDateInOctober : addDays(lastDateInOctober, 6 - dayOfWeek);
}


function toISO(d) {    
    return d.toISOString().slice(0, 10);
}
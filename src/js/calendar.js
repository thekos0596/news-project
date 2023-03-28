// read more https://github.com/qodesmith/datepicker#onhide


import datepicker from 'js-datepicker'
const datepicker = require('js-datepicker');
const pInput = document.querySelector("#datepicker");


let today = new Date();
let formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
pInput.value = formattedDate;


let options = {
    formatter: (input, date, instance) => {

        const inputDate = new Date(date);
        const year = inputDate.getFullYear();
        const month = inputDate.getMonth() + 1;
        const day = inputDate.getDate();

        input.value = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

        const queryformat = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
        console.log(`data for your function ${queryformat}`);
        // call your function
        document.querySelector("#hidden-picker").value = queryformat;
    },
    customDays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    startDay: 1,
    position: 'br',
    onShow: () => {
        let tabl = window.matchMedia("(min-width: 768px)");
        if (tabl.matches === true) {
            document.querySelector(".arrow-down").style.display = 'none';
            document.querySelector(".arrow-up").style.display = 'block';
        }
        document.querySelector(".callend-off").style.display = 'none';
        document.querySelector(".callend-on").style.display = 'block';
        pInput.classList.add("datepicker-selected");
        pInput.style.border = "1px solid #4440F6";
    },
    onHide: () => {
        let tabl = window.matchMedia("(min-width: 768px)");
        if (tabl.matches === true) {
            document.querySelector(".arrow-down").style.display = 'block';
            document.querySelector(".arrow-up").style.display = 'none';
        }
        document.querySelector(".callend-off").style.display = 'block';
        document.querySelector(".callend-on").style.display = 'none';
        pInput.classList.remove("datepicker-selected");
        pInput.style.border = "1px solid #111";
    }
};

const dp = datepicker(pInput, options);
document.querySelector(".callend-on").addEventListener('click', openCalendar);
document.querySelector(".callend-off").addEventListener('click', openCalendar);
document.querySelector(".arrow-down").addEventListener('click', openCalendar);
document.querySelector(".arrow-up").addEventListener('click', openCalendar);




function openCalendar(e) {
    e.stopPropagation()
    dp.show();
}


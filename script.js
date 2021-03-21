let datediv = document.getElementById('date');
let tasks = Array.from(document.querySelectorAll('#pill-tasks > label'));

sync();
renderDate();

function sync() {
    let lastmodified = localStorage.getItem('lastmodified');
    let today = String(new Date()).substr(0, 10);
    let saved;
    if (today != lastmodified) {
        saved = '0'.repeat(tasks.length);
        localStorage.setItem('saved', saved);
        localStorage.setItem('lastmodified', today);
    }

    saved = localStorage.getItem('saved');

    if (saved.length != tasks.length) {
        saved = '0'.repeat(tasks.length);
        localStorage.setItem('saved', saved);
    }
    
    saved.split('').forEach((v, i) => {
        if (v == '1') {
            tasks[i].classList.add('checked');
            tasks[i].querySelector('input').checked = true;
        } else {
            tasks[i].classList.remove('checked');
            tasks[i].querySelector('input').checked = false;
        }
    });
}

function save() {
    localStorage.setItem('saved', tasks.reduce((acc, cur) => {
        if (cur.classList.contains('checked')) {
            return acc + '1';
        } return acc + '0';
    }, ''));
    localStorage.setItem('lastmodified', String(new Date()).substr(0, 10));
}

function renderDate() {
    let percentDone = tasks.reduce((acc, cur) => {
        if (cur.classList.contains('checked')) return acc + 1;
        return acc;
    }, 0) / tasks.length;

    datediv.style.backgroundPosition = `${100 - percentDone * 100}%`

    if (percentDone == 1) {
        datediv.innerText = `Yay! Completed!`;
        return;
    }

    let today = new Date();
    let monthname, dayname;

    switch(today.getMonth()) {
        case 0: monthname = 'January';
                break;
        case 1: monthname = 'February';
                break;
        case 2: monthname = 'March';
                break;
        case 3: monthname = 'April';
                break;
        case 4: monthname = 'May';
                break;
        case 5: monthname = 'June';
                break;
        case 6: monthname = 'July';
                break;
        case 7: monthname = 'August';
                break;
        case 8: monthname = 'September';
                break;
        case 9: monthname = 'October';
                break;
        case 10: monthname = 'November';
                break;
        case 11: monthname = 'December';
                break;
    }
    switch(today.getDay()) {
        case 0: dayname = 'Sunday';
                break;
        case 1: dayname = 'Monday';
                break;
        case 2: dayname = 'Tuesday';
                break;
        case 3: dayname = 'Wednesday';
                break;
        case 4: dayname = 'Thursday';
                break;
        case 5: dayname = 'Friday';
                break;
        case 6: dayname = 'Saturday';
                break;
    }

    datediv.innerText = `${today.getDate()} ${monthname}, ${dayname}`;
}

document.addEventListener('change', e => {
    sync();
    let label = e.target.closest('label');
    label.classList.toggle('checked');
    e.target.checked = !e.target.checked;
    renderDate();
    save();
});
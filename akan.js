const maleNames = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function calculateDayOfWeek(day, month, year) {
    if (month < 3) {
        month = month + 12;
        year = year - 1;
    }
    
    const century = Math.floor(year / 100);
    const yearOfCentury = year % 100;
    
    const dayOfWeek = (day + Math.floor((13 * (month + 1)) / 5) + yearOfCentury + 
                     Math.floor(yearOfCentury / 4) + Math.floor(century / 4) + 
                     (5 * century)) % 7;
    
    return (dayOfWeek + 6) % 7;
}

function isValidDate(day, month, year) {
    if (month < 1 || month > 12) {
        return false;
    }
    
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    if (month === 2) {
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        if (isLeapYear && day > 29) return false;
        if (!isLeapYear && day > 28) return false;
    } else if (day > daysInMonth[month - 1]) {
        return false;
    }
    
    return day >= 1;
}

function getAkanName(day, month, year, gender) {
    if (!isValidDate(day, month, year)) {
        alert("Recheck your date");
        return null;
    }
    
    if (!gender) {
        alert("choose your gender!");
        return null;
    }
    
    const dayIndex = calculateDayOfWeek(day, month, year);
    
    let akanName;
    if (gender === "male") {
        akanName = maleNames[dayIndex];
    } else {
        akanName = femaleNames[dayIndex];
    }
    
    return {
        name: akanName,
        dayOfWeek: daysOfWeek[dayIndex]
    };
}

function displayResult(akanName, dayOfWeek) {
    const resultDiv = document.getElementById('result');
    const akanNameResult = document.getElementById('akan-name-result');
    const dayOfWeekElement = document.getElementById('day-of-week');
    
    akanNameResult.textContent = akanName;
    dayOfWeekElement.textContent = "You were born on a " + dayOfWeek;
    
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('birthday-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    
    const result = getAkanName(day, month, year, gender);
    
    if (result) {
        displayResult(result.name, result.dayOfWeek);
    }
});

document.getElementById('day').addEventListener('input', function() {
    if (this.value < 1) this.value = 1;
    if (this.value > 31) this.value = 31;
});

document.getElementById('month').addEventListener('input', function() {
    if (this.value < 1) this.value = 1;
    if (this.value > 12) this.value = 12;
});
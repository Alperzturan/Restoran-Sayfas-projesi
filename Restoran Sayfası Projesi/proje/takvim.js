let currentMonth = new Date().getMonth(); // Şu anki ay
let currentYear = new Date().getFullYear(); // Şu anki yıl
const today = new Date(); // Bugünün tarihi
const todayString = today.toISOString().split('T')[0]; // Bugünün tarihini YYYY-MM-DD formatında alıyoruz


function createCalendar() { //takvim oluşturma fonns
    const calendarContainer = document.getElementById('calendar');
    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    const calendarTable = document.createElement('table');
    calendarTable.classList.add('calendar-table');
    
    
    // takvim başlığı ve butonları
    let header = `    
        <tr>
            <th colspan="7" class="calendar-header">
                <div class="calendar-navigation">
                    <button onclick="changeMonth(-1)">&#10094;</button>
                    <span>${monthNames[currentMonth]} ${currentYear}</span>
                    <button onclick="changeMonth(1)">&#10095;</button>
                </div>
            </th>
        </tr>
    `;
    header += "<tr><th>Paz</th><th>Pts</th><th>Sal</th><th>Çar</th><th>Per</th><th>Cum</th><th>Cmt</th></tr>";

    let days = "<tr>";
    for (let i = 0; i < firstDay; i++) {
        days += "<td></td>";
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        const isDisabled = dateString < todayString; // bulunan tarihten önceki tarihteki butonlara basıolamıuyor

        days += `<td class="day ${isDisabled ? 'disabled' : ''}" data-date="${i}" ${isDisabled ? 'disabled' : ''}>${i}</td>`;
        if ((i + firstDay) % 7 === 0) {
            days += "</tr><tr>";
        }
    }
    days += "</tr>";

    calendarTable.innerHTML = header + days;
    calendarContainer.innerHTML = '';
    calendarContainer.appendChild(calendarTable);

    const dayCells = document.querySelectorAll('.day');
    dayCells.forEach(day => {
        if (!day.classList.contains('disabled')) {
            day.addEventListener('click', function () {
                document.querySelectorAll('.day').forEach(cell => cell.classList.remove('selected'));
                day.classList.add('selected');
                
                // seçilen tarihi yıl ay güün yapıyor
                const selectedDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.textContent.padStart(2, '0')}`;
                
                // sewçilen tarihi hiiden inputa ekler
                document.getElementById('date').value = selectedDate;
            });
        }
    });
}

// aylar arası gesinmek iöibn
function changeMonth(direction) {
    currentMonth += direction;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    createCalendar();
}

// Saat dilimlerini 09:00'dan 22:00'ye kadar her 30 dakikada bi seçenek
function generateTimeOptions() {
    const timeSelect = document.getElementById('time');
    const startHour = 9; 
    const endHour = 22; 
    const timeSlots = [];

    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            timeSlots.push(timeString);
        }
    }

    // seçeenekleri kutuya ekleme
    timeSlots.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    });
}

// sayfa yüklebnince takvim ve seçenekleri oluşturma
createCalendar();
generateTimeOptions(); 
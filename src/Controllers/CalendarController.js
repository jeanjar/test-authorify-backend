const DayModeException = require('../utils/exceptions/DayModeException')
const {MonthRangeValidator} = require('../validator')
const dayjs = require("dayjs");

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function buildDates(year, month, action = 'current') {
    const date = dayjs().set('year', year).set('month', month).startOf('month');

    if (action === 'current') {
        return {
            month: date.month(),
            monthName: date.format('MMMM'),
            year: date.year(),
        }
    }

    const mapActions = {
        next: 'add',
        previous: 'subtract',
    };

    return {
        month: date[mapActions[action]](1, 'month').month(),
        monthName: date[mapActions[action]](1, 'month').format('MMMM'),
        year: date[mapActions[action]](1, 'month').year(),
    }
}

function buildCalendar(year, month) {

    const now = dayjs()

    const firstDay = dayjs().set('year', year).set('month', month).set('date', 0)
    const daysInMonth = dayjs().set('year', year).set('month', month + 1).set('date', 0).date()
    const dayOfWeek = firstDay.day()
    const todayDate = dayjs().set('year', year).set('month', month)
    const today = parseInt(todayDate.format('DD'))

    let calendar = []

    for (let i = 0; i <= dayOfWeek; i++) {
        calendar.push({
            currentDay: false,
            currentMonth: false,
            currentYear: todayDate.year() === now.year(),
            text: '-',
            fullDateText: null,
            timeSlots: null,
        })
    }

    for (let i = 0; i < daysInMonth; i++) {
        const next = i + 1
        calendar.push({
            currentDay: next === today,
            currentMonth: todayDate.month() === now.month(),
            currentYear: todayDate.year() === now.year(),
            text: next.toString(),
            timeSlots: [
                {text: '9 AM', fullText: todayDate.set('date', next).format('DD-MMM-YYYY') + ' 9 AM'},
                {text: '10 AM', fullText: todayDate.set('date', next).format('DD-MMM-YYYY') + ' 10 AM'},
                {text: '11 AM', fullText: todayDate.set('date', next).format('DD-MMM-YYYY') + ' 11 AM'},

                {text: '12 PM', fullText: todayDate.set('date', next).format('DD-MMM-YYYY') + ' 12 PM'},
                {text: '1 PM', fullText: todayDate.set('date', next).format('DD-MMM-YYYY') + ' 1 PM'},
                {text: '2 PM', fullText: todayDate.set('date', next).format('DD-MMM-YYYY') + ' 2 PM'},

                {text: '3 PM', fullText: todayDate.set('date', next).format('DD-MMM-YYYY') + ' 3 PM'},
                {text: '4 PM', fullText: todayDate.set('date', next).format('DD-MMM-YYYY') + ' 4 PM'},
                {text: '5 PM', fullText: todayDate.set('date', next).format('DD-MMM-YYYY') + ' 5 PM'},
            ]
        })
    }

    while (calendar.length % 7 !== 0) {
        calendar.push({
            currentDay: false,
            currentMonth: false,
            currentYear: todayDate.year() === now.year(),
            text: '-',
            fullDateText: null,
            timeSlots: null,
        })
    }

    return calendar
}

module.exports = {

    index(request, response) {
        let {curMonth, curYear} = request.query
        curMonth = curMonth ? parseInt(curMonth) : dayjs().month()
        curYear = curYear ? parseInt(curYear) : dayjs().year()

        MonthRangeValidator(curMonth)

        const current = buildDates(curYear, curMonth)
        const next = buildDates(curYear, curMonth, 'next')
        const previous = buildDates(curYear, curMonth, 'previous')
        const calendar = buildCalendar(curYear, curMonth)


        return response.json({daysOfWeek, calendar, current, next, previous})
    }
}
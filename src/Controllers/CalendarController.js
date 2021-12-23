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

    const firstDay = dayjs().set('year', year).set('month', month).set('date', 0)
    const daysInMonth = dayjs().set('year', year).set('month', month + 1).set('date', 0).date()
    const dayOfWeek = firstDay.day()
    const today = parseInt(dayjs().set('year', year).set('month', month).format('DD'))

    let calendar = []

    for (let i = 0; i <= dayOfWeek; i++) {
        calendar.push({
            currentMonth: false,
            currentDay: false,
            text: '-',
        })
    }

    for (let i = 0; i < daysInMonth; i++) {
        const next = i + 1
        calendar.push({
            currentMonth: true,
            currentDay: next === today,
            text: next.toString(),
        })
    }

    while (calendar.length % 7 !== 0) {
        calendar.push({
            currentMonth: false,
            currentDay: false,
            text: '-',
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
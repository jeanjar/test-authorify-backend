const DayModeException = require('../utils/exceptions/DayModeException')
const {MonthRangeValidator} = require('../validator')
const dayjs = require("dayjs");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

module.exports = {

    index(request, response) {
        let {curMonth, curYear} = request.query
        curMonth = curMonth ? parseInt(curMonth) : dayjs().month()
        curYear = curYear ? parseInt(curYear) : dayjs().year()

        const baseDate = dayjs().set('year', curYear).set('month', curMonth).startOf('month');

        const current = {
            month: baseDate.month(),
            monthName: baseDate.format('MMMM'),
            year: baseDate.year(),
        }

        const next = {
            month: baseDate.add(1, 'month').month(),
            monthName: baseDate.add(1, 'month').format('MMMM'),
            year: baseDate.add(1, 'month').year(),
        }

        const previous = {
            month: baseDate.add(-1, 'month').month(),
            monthName: baseDate.add(-1, 'month').format('MMMM'),
            year: baseDate.add(-1, 'month').year(),
        }

        MonthRangeValidator(curMonth)

        const curMonthName = months[curMonth]
        const firstDay = new Date(curYear, curMonth, 0)
        const daysInMonth = new Date(curYear, curMonth + 1, 0).getDate()
        const dayOfWeek = firstDay.getDay()

        let calendar = [];

        for (let i = 0; i <= dayOfWeek; i++) {
            calendar.push('-');
        }

        for (let i = 0; i < daysInMonth; i++) {
            const next = i + 1;
            calendar.push(next);
        }

        while (calendar.length % 7 !== 0) {
            calendar.push('-')
        }

        return response.json({daysOfWeek, calendar, current, next, previous})
    }
}
const axios = require('axios')
const dayjs = require("dayjs");

describe('CalendarController', () => {
    describe('current', () => {
        test('month', async () => {
            const response = await axios.get('http://localhost:8888/calendar')
            if (response.data.current.month !== dayjs().month()) {
                throw Error('month is different')
            }
        })

        test('year', async () => {
            const response = await axios.get('http://localhost:8888/calendar')
            if (response.data.current.year !== dayjs().year()) {
                throw Error('year is different')
            }
        })

        test('month name', async () => {
            const response = await axios.get('http://localhost:8888/calendar')
            if (response.data.current.monthName !== dayjs().format('MMMM')) {
                throw Error('month name is different')
            }
        })
    })

    describe('next', () => {
        test('month', async () => {
            const response = await axios.get('http://localhost:8888/calendar')
            if (response.data.next.month !== dayjs().add(1, 'month').month()) {
                throw Error('month is different')
            }
        })

        test('year', async () => {
            const response = await axios.get('http://localhost:8888/calendar')
            if (response.data.next.year !== dayjs().add(1, 'month').year()) {
                throw Error('year is different')
            }
        })

        test('month name', async () => {
            const response = await axios.get('http://localhost:8888/calendar')
            if (response.data.next.monthName !== dayjs().add(1, 'month').format('MMMM')) {
                throw Error('month name is different')
            }
        })
    })

    describe('previous', () => {
        test('month', async () => {
            const response = await axios.get('http://localhost:8888/calendar')
            if (response.data.previous.month !== dayjs().add(-1, 'month').month()) {
                throw Error('month is different')
            }
        })

        test('year', async () => {
            const response = await axios.get('http://localhost:8888/calendar')
            if (response.data.previous.year !== dayjs().add(-1, 'month').year()) {
                throw Error('year is different')
            }
        })

        test('month name', async () => {
            const response = await axios.get('http://localhost:8888/calendar')
            if (response.data.previous.monthName !== dayjs().add(-1, 'month').format('MMMM')) {
                throw Error('moth name is different')
            }
        })
    })

    describe('Random month', () => {
        test('month', async () => {
            const randomMonth = Math.floor(Math.random() * 11);
            const response = await axios.get(`http://localhost:8888/calendar?curMonth=${randomMonth}`)
            if (response.data.current.month !== dayjs().set('month', randomMonth).month()) {
                throw Error('month is different')
            }
        })

        test('year', async () => {
            const randomMonth = Math.floor(Math.random() * 11);
            const response = await axios.get(`http://localhost:8888/calendar?curMonth=${randomMonth}`)
            if (response.data.current.year !== dayjs().set('month', randomMonth).year()) {
                throw Error('year is different')
            }
        })

        test('month name', async () => {
            const randomMonth = Math.floor(Math.random() * 11);
            const response = await axios.get(`http://localhost:8888/calendar?curMonth=${randomMonth}`)
            if (response.data.current.monthName !== dayjs().set('month', randomMonth).format('MMMM')) {
                throw Error('month name is different')
            }
        })
    })

    describe('Year edges', () => {
        test('if month is december, next month will be january', async () => {
            const date = dayjs().set('month', 11);
            const response = await axios.get(`http://localhost:8888/calendar?curMonth=${date.month()}`)
            if (response.data.next.month !== 0) {
                throw Error('next mont is not january')
            }
        })

        test('if month is december and year 2021, next year will be 2022', async () => {
            const date = dayjs().set('year', 2021);
            console.log(date.format('DD/MMMM/YYYY'))
            const response = await axios.get(`http://localhost:8888/calendar?curMonth=${date.month()}&curYear=${date.year()}`)
            if (response.data.next.year !== 2022) {
                throw Error('next year is not 2022')
            }
        })

        test('if month is january, previous month will be december', async () => {
            const date = dayjs().set('month', 0);
            const response = await axios.get(`http://localhost:8888/calendar?curMonth=${date.month()}`)
            if (response.data.previous.month !== 11) {
                throw Error(`previous month is not december`)
            }
        });

        test('if month is january and year 2021, previous year will be 2020', async () => {
            const date = dayjs().set('month', 0);
            const response = await axios.get(`http://localhost:8888/calendar?curMonth=${date.month()}&curYear=${date.year()}`)
            if (response.data.previous.month !== 11) {
                throw Error(`previous month is not december`)
            }
        });
    })
})
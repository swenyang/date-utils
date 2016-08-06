import chai from 'chai'
import dateUtils from '../src/dateUtils.js'

const expect = chai.expect

/* global describe */
/* global it */
describe('Test dateUtils.clone():', () => {
    it('should return null', () => {
        expect(dateUtils.clone('abc')).to.be.equal(null)
    })
    it('should return Date', () => {
        expect(dateUtils.clone('2016-08-01').getTime()).to.be.equal(new Date('2016-08-01').getTime())
    })
    it('should return same Date but not same object', () => {
        const now = new Date()
        const clone = dateUtils.clone(now)
        expect(clone.getTime()).to.be.equal(now.getTime())
        expect(clone).to.be.not.equal(now)
    })
})

describe('Test dateUtils.seed()/now()/resetSeed():', () => {
    it('should be same as server time', () => {
        dateUtils.seed('2016-08-01')
        const ts = dateUtils.now().getTime()
        expect(ts).to.be.equal(new Date('2016-08-01').getTime())
    })
    it('should be same as system time', () => {
        dateUtils.resetSeed()
        expect(dateUtils.now().getTime()).to.be.equal(new Date().getTime())
    })
    it('should be 1s later than server time', () => {
        dateUtils.seed('2016-08-01')
        setTimeout(() => {
            expect(dateUtils.now().getTime() - new Date('2016-08-01').getTime()).to.be.equal(1000)
        }, 1000)
    })
})

describe('Test dateUtils.clear()', () => {
    const date = new Date('Mon Aug 29 2016 22:23:06.134 GMT+0800 (CST)')
    it('test clear milliseconds', () => {
        const d = dateUtils.clone(date)
        expect(dateUtils.clear(d, dateUtils.MILLISECOND).getTime()).to.be.equal(new Date('Mon Aug 29 2016 22:23:06.134 GMT+0800 (CST)').getTime())
    })
    it('test clear seconds', () => {
        const d = dateUtils.clone(date)
        expect(dateUtils.clear(d, dateUtils.SECOND).getTime()).to.be.equal(new Date('Mon Aug 29 2016 22:23:06.000 GMT+0800 (CST)').getTime())
    })
    it('test clear minutes', () => {
        const d = dateUtils.clone(date)
        expect(dateUtils.clear(d, dateUtils.MINUTE).getTime()).to.be.equal(new Date('Mon Aug 29 2016 22:23:00.000 GMT+0800 (CST)').getTime())
    })
    it('test clear hours', () => {
        const d = dateUtils.clone(date)
        expect(dateUtils.clear(d, dateUtils.HOUR).getTime()).to.be.equal(new Date('Mon Aug 29 2016 22:00:00.000 GMT+0800 (CST)').getTime())
    })
    it('test clear date', () => {
        const d = dateUtils.clone(date)
        expect(dateUtils.clear(d, dateUtils.DATE).getTime()).to.be.equal(new Date('Mon Aug 29 2016 00:00:00.000 GMT+0800 (CST)').getTime())
    })
    it('test clear month', () => {
        const d = dateUtils.clone(date)
        expect(dateUtils.clear(d, dateUtils.MONTH).getTime()).to.be.equal(new Date('Mon Aug 01 2016 00:00:00.000 GMT+0800 (CST)').getTime())
    })
    it('test clear year', () => {
        const d = dateUtils.clone(date)
        expect(dateUtils.clear(d, dateUtils.YEAR).getTime()).to.be.equal(new Date('Fri Jan 01 2016 00:00:00.000 GMT+0800 (CST)').getTime())
    })
})

describe('Test dateUtils.daysInMonth()', () => {
    it('test days of months in 2016', () => {
        expect(dateUtils.daysInMonth(2016, 1)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2016, 2)).to.be.equal(29)
        expect(dateUtils.daysInMonth(2016, 3)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2016, 4)).to.be.equal(30)
        expect(dateUtils.daysInMonth(2016, 5)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2016, 6)).to.be.equal(30)
        expect(dateUtils.daysInMonth(2016, 7)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2016, 8)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2016, 9)).to.be.equal(30)
        expect(dateUtils.daysInMonth(2016, 10)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2016, 11)).to.be.equal(30)
        expect(dateUtils.daysInMonth(2016, 12)).to.be.equal(31)
    })
    it('test days of months in 2000', () => {
        expect(dateUtils.daysInMonth(2000, 1)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2000, 2)).to.be.equal(29)
        expect(dateUtils.daysInMonth(2000, 3)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2000, 4)).to.be.equal(30)
        expect(dateUtils.daysInMonth(2000, 5)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2000, 6)).to.be.equal(30)
        expect(dateUtils.daysInMonth(2000, 7)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2000, 8)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2000, 9)).to.be.equal(30)
        expect(dateUtils.daysInMonth(2000, 10)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2000, 11)).to.be.equal(30)
        expect(dateUtils.daysInMonth(2000, 12)).to.be.equal(31)
    })
    it('test days of months in 2100', () => {
        expect(dateUtils.daysInMonth(2100, 1)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2100, 2)).to.be.equal(28)
        expect(dateUtils.daysInMonth(2100, 3)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2100, 4)).to.be.equal(30)
        expect(dateUtils.daysInMonth(2100, 5)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2100, 6)).to.be.equal(30)
        expect(dateUtils.daysInMonth(2100, 7)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2100, 8)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2100, 9)).to.be.equal(30)
        expect(dateUtils.daysInMonth(2100, 10)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2100, 11)).to.be.equal(30)
        expect(dateUtils.daysInMonth(2100, 12)).to.be.equal(31)
    })
    it('test days of months in 2011', () => {
        expect(dateUtils.daysInMonth(2011, 1)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2011, 2)).to.be.equal(28)
        expect(dateUtils.daysInMonth(2011, 3)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2011, 4)).to.be.equal(30)
        expect(dateUtils.daysInMonth(2011, 5)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2011, 6)).to.be.equal(30)
        expect(dateUtils.daysInMonth(2011, 7)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2011, 8)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2011, 9)).to.be.equal(30)
        expect(dateUtils.daysInMonth(2011, 10)).to.be.equal(31)
        expect(dateUtils.daysInMonth(2011, 11)).to.be.equal(30)
        expect(dateUtils.daysInMonth(2011, 12)).to.be.equal(31)
    })
})

describe('Test dateUtils.isLeapYear()', () => {
    it('test leap year', () => {
        expect(dateUtils.isLeapYear(2011)).to.not.be.ok
        expect(dateUtils.isLeapYear(2010)).to.not.be.ok
        expect(dateUtils.isLeapYear(2100)).to.not.be.ok
        expect(dateUtils.isLeapYear(2000)).to.be.ok
        expect(dateUtils.isLeapYear(2012)).to.be.ok
        expect(dateUtils.isLeapYear(1988)).to.be.ok
    })
})

describe('Test dateUtils.add()', () => {
    const date = new Date('2016-10-31T14:23:06.134Z')
    it('test add month with date > 28', () => {
        expect(dateUtils.add(date, 1, dateUtils.MONTH).getTime()).to.be.equal(new Date('2016-11-30T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, 2, dateUtils.MONTH).getTime()).to.be.equal(new Date('2016-12-31T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, 3, dateUtils.MONTH).getTime()).to.be.equal(new Date('2017-01-31T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, 4, dateUtils.MONTH).getTime()).to.be.equal(new Date('2017-02-28T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, 10, dateUtils.MONTH).getTime()).to.be.equal(new Date('2017-08-31T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, 20, dateUtils.MONTH).getTime()).to.be.equal(new Date('2018-06-30T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, 50, dateUtils.MONTH).getTime()).to.be.equal(new Date('2020-12-31T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, -1, dateUtils.MONTH).getTime()).to.be.equal(new Date('2016-09-30T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, -2, dateUtils.MONTH).getTime()).to.be.equal(new Date('2016-08-31T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, -3, dateUtils.MONTH).getTime()).to.be.equal(new Date('2016-07-31T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, -4, dateUtils.MONTH).getTime()).to.be.equal(new Date('2016-06-30T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, -10, dateUtils.MONTH).getTime()).to.be.equal(new Date('2015-12-31T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, -20, dateUtils.MONTH).getTime()).to.be.equal(new Date('2015-02-28T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, -50, dateUtils.MONTH).getTime()).to.be.equal(new Date('2012-08-31T14:23:06.134Z').getTime())
    })
    it('test add month with date > 28, excluding end date', () => {
        expect(dateUtils.add(date, 1, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-11-30T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, 2, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-12-30T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, 3, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2017-01-30T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, 4, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2017-02-28T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, 10, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2017-08-30T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, 20, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2018-06-30T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, 50, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2020-12-30T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, -1, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-09-30T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, -2, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-08-31T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, -3, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-07-31T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, -4, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-06-30T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, -10, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2015-12-31T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, -20, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2015-02-28T14:23:06.134Z').getTime())
        expect(dateUtils.add(date, -50, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2012-08-31T14:23:06.134Z').getTime())
        expect(dateUtils.add('2016-10-30T14:23:06.134Z', 1, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-11-29T14:23:06.134Z').getTime())
        expect(dateUtils.add('2016-01-31T14:23:06.134Z', 1, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-02-29T14:23:06.134Z').getTime())
        expect(dateUtils.add('2016-02-29T14:23:06.134Z', 1, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-03-28T14:23:06.134Z').getTime())
        expect(dateUtils.add('2016-03-31T14:23:06.134Z', 1, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-04-30T14:23:06.134Z').getTime())
        expect(dateUtils.add('2016-04-30T14:23:06.134Z', 1, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-05-29T14:23:06.134Z').getTime())
        expect(dateUtils.add('2016-05-31T14:23:06.134Z', 1, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-06-30T14:23:06.134Z').getTime())
        expect(dateUtils.add('2016-06-30T14:23:06.134Z', 1, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-07-29T14:23:06.134Z').getTime())
        expect(dateUtils.add('2016-07-31T14:23:06.134Z', 1, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-08-30T14:23:06.134Z').getTime())
        expect(dateUtils.add('2016-08-31T14:23:06.134Z', 1, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-09-30T14:23:06.134Z').getTime())
        expect(dateUtils.add('2016-09-30T14:23:06.134Z', 1, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-10-29T14:23:06.134Z').getTime())
        expect(dateUtils.add('2016-10-31T14:23:06.134Z', 1, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-11-30T14:23:06.134Z').getTime())
        expect(dateUtils.add('2016-11-30T14:23:06.134Z', 1, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-12-29T14:23:06.134Z').getTime())
        expect(dateUtils.add('2016-12-31T14:23:06.134Z', 1, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2017-01-30T14:23:06.134Z').getTime())
    })

    const date2 = new Date('2016-10-15T14:23:06.134Z')
    it('test add month with date <= 28', () => {
        expect(dateUtils.add(date2, 1, dateUtils.MONTH).getTime()).to.be.equal(new Date('2016-11-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, 2, dateUtils.MONTH).getTime()).to.be.equal(new Date('2016-12-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, 3, dateUtils.MONTH).getTime()).to.be.equal(new Date('2017-01-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, 4, dateUtils.MONTH).getTime()).to.be.equal(new Date('2017-02-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, 10, dateUtils.MONTH).getTime()).to.be.equal(new Date('2017-08-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, 20, dateUtils.MONTH).getTime()).to.be.equal(new Date('2018-06-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, 50, dateUtils.MONTH).getTime()).to.be.equal(new Date('2020-12-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, -1, dateUtils.MONTH).getTime()).to.be.equal(new Date('2016-09-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, -2, dateUtils.MONTH).getTime()).to.be.equal(new Date('2016-08-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, -3, dateUtils.MONTH).getTime()).to.be.equal(new Date('2016-07-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, -4, dateUtils.MONTH).getTime()).to.be.equal(new Date('2016-06-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, -10, dateUtils.MONTH).getTime()).to.be.equal(new Date('2015-12-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, -20, dateUtils.MONTH).getTime()).to.be.equal(new Date('2015-02-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, -50, dateUtils.MONTH).getTime()).to.be.equal(new Date('2012-08-15T14:23:06.134Z').getTime())
    })
    it('test add month with date <= 28, excluding end date', () => {
        expect(dateUtils.add(date2, 1, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-11-14T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, 2, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-12-14T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, 3, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2017-01-14T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, 4, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2017-02-14T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, 10, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2017-08-14T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, 20, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2018-06-14T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, 50, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2020-12-14T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, -1, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-09-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, -2, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-08-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, -3, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-07-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, -4, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2016-06-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, -10, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2015-12-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, -20, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2015-02-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, -50, dateUtils.MONTH, true).getTime()).to.be.equal(new Date('2012-08-15T14:23:06.134Z').getTime())
    })

    it('test add other type', () => {
        expect(dateUtils.add(date2, -50, dateUtils.MILLISECOND).getTime()).to.be.equal(new Date('2016-10-15T14:23:06.084Z').getTime())
        expect(dateUtils.add(date2, 100, dateUtils.MILLISECOND).getTime()).to.be.equal(new Date('2016-10-15T14:23:06.234Z').getTime())
        expect(dateUtils.add(date2, -50, dateUtils.SECOND).getTime()).to.be.equal(new Date('2016-10-15T14:22:16.134Z').getTime())
        expect(dateUtils.add(date2, 100, dateUtils.SECOND).getTime()).to.be.equal(new Date('2016-10-15T14:24:46.134Z').getTime())
        expect(dateUtils.add(date2, -50, dateUtils  .MINUTE).getTime()).to.be.equal(new Date('2016-10-15T13:33:06.134Z').getTime())
        expect(dateUtils.add(date2, 100, dateUtils.MINUTE).getTime()).to.be.equal(new Date('2016-10-15T16:03:06.134Z').getTime())
        expect(dateUtils.add(date2, -50, dateUtils.HOUR).getTime()).to.be.equal(new Date('2016-10-13T12:23:06.134Z').getTime())
        expect(dateUtils.add(date2, 100, dateUtils.HOUR).getTime()).to.be.equal(new Date('2016-10-19T18:23:06.134Z').getTime())
        expect(dateUtils.add(date2, -50, dateUtils.DATE).getTime()).to.be.equal(new Date('2016-08-26T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, 100, dateUtils.DATE).getTime()).to.be.equal(new Date('2017-01-23T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, 100, dateUtils.DATE, true).getTime()).to.be.equal(new Date('2017-01-22T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, -50, dateUtils.YEAR).getTime()).to.be.equal(new Date('1966-10-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, 100, dateUtils.YEAR).getTime()).to.be.equal(new Date('2116-10-15T14:23:06.134Z').getTime())
        expect(dateUtils.add(date2, 100, dateUtils.YEAR, true).getTime()).to.be.equal(new Date('2116-10-14T14:23:06.134Z').getTime())
    })
})

describe('Test dateUtils.age()', () => {
    it('test age calculation (addAgeAtBirthday)', () => {
        dateUtils.seed('2016-08-04')
        expect(dateUtils.age('abc', false)).to.be.equal(0)
        expect(dateUtils.age('2016-08-05', false)).to.be.equal(0)
        expect(dateUtils.age('2016-08-04', false)).to.be.equal(0)
        expect(dateUtils.age('2016-08-03', false)).to.be.equal(0)
        const min = new Date('1916-08-03')
        const max = new Date('2016-08-02')
        let age = 0
        for (let i = max.getTime(); i >= min.getTime(); i -= 24 * 3600000) {
            const d = new Date(i)
            if (d.getMonth() === 7 && d.getDate() === 4) {
                age++
            }
            // console.log(dateUtils.age(d, false), ',', d)
            expect(dateUtils.age(d, false)).to.be.equal(age)
        }
    })
    it('test age calculation (addAgeAfterBirthday)', () => {
        dateUtils.seed('2016-08-04')
        expect(dateUtils.age('abc'), true).to.be.equal(0)
        expect(dateUtils.age('2016-08-05'), true).to.be.equal(0)
        expect(dateUtils.age('2016-08-04'), true).to.be.equal(0)
        expect(dateUtils.age('2016-08-03'), true).to.be.equal(0)
        const min = new Date('1916-08-03')
        const max = new Date('2016-08-02')
        let age = 0
        for (let i = max.getTime(); i >= min.getTime(); i -= 24 * 3600000) {
            const d = new Date(i)
            if (d.getMonth() === 7 && d.getDate() === 3) {
                age++
            }
            // console.log(dateUtils.age(d), ',', d)
            expect(dateUtils.age(d, true)).to.be.equal(age)
        }
    })
})

describe('Test dateUtils.padZero()', () => {
    it('test padZero', () => {
        expect(dateUtils.padZero(1, 1)).to.be.equal('1')
        expect(dateUtils.padZero(10, 1)).to.be.equal('10')
        expect(dateUtils.padZero(0, 2)).to.be.equal('00')
        expect(dateUtils.padZero(1, 2)).to.be.equal('01')
        expect(dateUtils.padZero(2, 2)).to.be.equal('02')
        expect(dateUtils.padZero(10, 2)).to.be.equal('10')
        expect(dateUtils.padZero(59, 2)).to.be.equal('59')
        expect(dateUtils.padZero(99, 2)).to.be.equal('99')
        expect(dateUtils.padZero(0, 3)).to.be.equal('000')
        expect(dateUtils.padZero(1, 3)).to.be.equal('001')
        expect(dateUtils.padZero(2, 3)).to.be.equal('002')
        expect(dateUtils.padZero(10, 3)).to.be.equal('010')
        expect(dateUtils.padZero(59, 3)).to.be.equal('059')
        expect(dateUtils.padZero(99, 3)).to.be.equal('099')
        expect(dateUtils.padZero(100, 3)).to.be.equal('100')
        expect(dateUtils.padZero(101, 3)).to.be.equal('101')
        expect(dateUtils.padZero(999, 3)).to.be.equal('999')
        expect(dateUtils.padZero(1000, 3)).to.be.equal('1000')
    })
})

describe('Test dateUtils.format()', () => {
    it('test format (in local timezone)', () => {
        const date = new Date('2016-08-31')
        date.setHours(14)
        date.setMinutes(23)
        date.setSeconds(6)
        date.setMilliseconds(54)
        expect(dateUtils.format(date, 'yyyy-MM-dd HH:mm:ss.SSS')).to.be.equal('2016-08-31 14:23:06.054')
        expect(dateUtils.format(date, 'yy-M-d H:m:s.S')).to.be.equal('16-8-31 14:23:6.54')
        expect(dateUtils.format(date, 'yyyy-MM-dd')).to.be.equal('2016-08-31')
        expect(dateUtils.format(date, 'yyyy/MM/dd')).to.be.equal('2016/08/31')
        expect(dateUtils.format(date, 'M/d/yyyy')).to.be.equal('8/31/2016')
        expect(dateUtils.format(date, 'MMdd')).to.be.equal('0831')
        expect(dateUtils.format(date, '**hh**mm')).to.be.equal('**02**23')
        expect(dateUtils.format(date, 'yyyy年M月d日')).to.be.equal('2016年8月31日')
        expect(dateUtils.format(date, 'h|m|s|S yyMd')).to.be.equal('2|23|6|54 16831')
        date.setHours(0)
        expect(dateUtils.format(date, 'MM.dd hh.mm.ss')).to.be.equal('08.31 12.23.06')
        expect(dateUtils.format(date, 'MM.dd HH.mm.ss')).to.be.equal('08.31 00.23.06')
        date.setHours(12)
        expect(dateUtils.format(date, 'MM.dd hh.mm.ss')).to.be.equal('08.31 12.23.06')
        expect(dateUtils.format(date, 'MM.dd HH.mm.ss')).to.be.equal('08.31 12.23.06')
    })
})

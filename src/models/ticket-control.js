import fs from 'fs'
import path from 'path'
import { __dirname } from '../constants/constants.js'

class Ticket {
  constructor (number, desktop) {
    this.number = number
    this.desktop = desktop
  }
}

class TicketControl {
  constructor () {
    this.fileUrl = new URL('../db/data.json', import.meta.url)
    this.last = 0
    this.today = new Date().getDate()
    this.tickets = []
    this.lastFour = []

    this.init()
  }

  get toJson () {
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      lastFour: this.lastFour
    }
  }

  init () {
    const { today, last, tickets, lastFour } = JSON.parse(fs.readFileSync(this.fileUrl))

    if (today === this.today) {
      this.tickets = tickets
      this.last = last
      this.lastFour = lastFour
    } else {
      this.saveDB()
    }
  }

  saveDB () {
    const dbPath = path.join(__dirname, '../db/data.json')
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
  }

  next () {
    this.last += 1
    const ticket = new Ticket(this.last, null)
    this.tickets.push(ticket)
    this.saveDB()
    return 'Ticket ' + this.last
  }

  attendTicket (desktop) {
    if (this.tickets.length === 0) return null

    const ticket = this.tickets.shift()
    ticket.desktop = desktop
    this.lastFour.unshift(ticket)

    if (this.lastFour.length > 4) this.lastFour.splice(-1, 1)

    this.saveDB()

    return ticket
  }
}

export default TicketControl

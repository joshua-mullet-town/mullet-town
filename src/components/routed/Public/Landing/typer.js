export default class Typer {
  constructor (inst, field) {
    this.copy = inst[field]
    this.inst = inst
    this.field = field
    this.typePace = 80
    this.clearPace = 60
    this.transitionLength = 200
    this.q = []
  }

  wait (time = 250) {
    this.q.push({
      type: 'wait',
      time,
    })
    return this
  }

  type (newCopy) {
    this.q.push({
      type: 'type',
      copy: newCopy,
    })
    return this
  }

  clear (amount = -1) {
    this.q.push({
      type: 'clear',
      amount,
    })
    return this
  }

  custom (func) {
    this.q.push({
      type: 'custom',
      func,
    })
    return this
  }

  getRandom (error = 40) {
    return (error / -2) + Math.random() * error
  }

  pacedType (copy) {
    copy.split('').forEach((char, idx) => {
      setTimeout(() => {
        this.inst[this.field] += char
      }, this.typePace * idx) // +  this.getRandom(40))
    })
  }

  pacedClear (amount) {
    amount = amount === -1 ? this.inst[this.field].length : amount
    Array(amount).fill().forEach((_, idx) => {
      setTimeout(() => {
        const copy = this.inst[this.field]
        this.inst[this.field] = copy.substring(0, copy.length - 1)
      }, this.clearPace * idx)// +  this.getRandom(40))
    })
  }

  async go () {
    let time = 0
    let execString = ''

    this.q.forEach(action => {
      if (action.type === 'wait') {
        time += action.time
      } else if (action.type === 'type') {
        execString += `setTimeout(() => this.pacedType("${action.copy}"), ${time});`
        time += action.copy.length * this.typePace + this.transitionLength
      } else if (action.type === 'clear') {
        execString += `setTimeout(() => this.pacedClear(${action.amount}), ${time});`
        time += (action.amount === -1 ? this.inst[this.field].length : action.amount) * this.typePace + this.transitionLength
      } else if (action.type === 'custom') {
        execString += `setTimeout(${action.func.toString()}, ${time});`
      }
    })

    console.log(execString)
    eval(execString)//.call(this)

    //console.log(this.q)
  }
}
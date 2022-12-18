export default class Typer {
  constructor (inst, field) {
    this.copy = inst[field]
    this.inst = inst
    this.field = field
    this.typePace = 30
    this.clearPace = 60
    this.transitionLength = 200
    this.clearAllLength = 800
    this.q = []
    this.skipLineTimes = [150, 200]
    this.scrollDelayMs = 40
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

  break () {
    this.q.push({
      type: 'break',
    })
    return this
  }

  skipLine () {
    this.q.push({
      type: 'skip-line',
    })
    return this
  }

  getRandom (error = 40) {
    return (error / -2) + Math.random() * error
  }

  scroll () {
    this.q.push({
      type: 'scroll',
    })
    return this
  }

  pacedType (copy) {
    copy.split('').forEach((char, idx) => {
      setTimeout(() => {
       //this.inst[this.field] += char
        this.inst.$refs[this.field].innerHTML += char
      }, this.typePace * idx) // +  this.getRandom(40))
    })
  }

  pacedClear (amount) {
    amount = amount === -1 ? this.inst.$refs[this.field].innerHTML.length : amount
    Array(amount).fill().forEach((_, idx) => {
      setTimeout(() => {
        const copy = this.inst.$refs[this.field].innerHTML
        //this.inst[this.field] = copy.substring(0, copy.length - 1)
        this.inst.$refs[this.field].innerHTML = copy.substring(0, copy.length - 1)
      }, this.clearPace * idx)// +  this.getRandom(40))
    })
  }

  fastClear () {
    this.inst.$refs.copy.style.backgroundColor = 'rgba(66, 135, 245, .4)'
    this.inst.$refs.copy.style.color = 'white'

    setTimeout(() => {
      this.inst.$refs[this.field].innerHTML = ''
      this.inst.$refs.copy.style.backgroundColor = 'transparent'
      this.inst.$refs.copy.style.color = 'black'
    }, this.clearAllLength * .5)
  }

  skipLineExec () {
    this.skipLineTimes.forEach(ms => {
      setTimeout(() => {
        this.inst.$refs[this.field].innerHTML += '<br />'
      }, ms)
    })
  }

  scrollToBottom () {
    setTimeout(() => {
      this.inst.$refs.copy.scrollIntoView({ behavior: "smooth", block: "end" })
    }, this.scrollDelayMs)
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
      } else if (action.type === 'skip-line') {
        execString += `setTimeout(() => this.skipLineExec(), ${time});`
        time += Math.max(...this.skipLineTimes) + this.transitionLength
      } else if (action.type === 'scroll') {
        execString += `setTimeout(() => this.scrollToBottom(), ${time});`
        time += this.transitionLength + this.scrollDelayMs * 2
      } else if (action.type === 'clear') {
        if (action.amount === -1) {
          execString += `setTimeout(() => this.fastClear(), ${time});`
          time += this.clearAllLength
        } else {
          execString += `setTimeout(() => this.pacedClear(${action.amount}), ${time});`
          time += (action.amount === -1 ? this.inst[this.field].length : action.amount) * this.clearPace + this.transitionLength
        }
      } else if (action.type === 'custom') {
        execString += `setTimeout(${action.func.toString()}, ${time});`
      } else if (action.type === 'break') {
        execString = ''
        time = 0
      }
    })

    eval(execString)//.call(this)

    //console.log(this.q)
  }
}
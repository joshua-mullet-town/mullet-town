export default class Typer {
  constructor (inst, field) {
    this.copy = inst[field]
    this.inst = inst
    this.field = field
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

  doAndThen (wait, func) {
    return new Promise(resolve => {
      setTimeout(() => {
        func()
        resolve()
      }, wait)
    })
  }

  async go () {
    let time = 0
    let execString = ''

    this.q.forEach(action => {
      if (action.type === 'wait') {
        time += action.time
      } else if (action.type === 'type') {
        execString += `setTimeout(() => console.log("wow"), ${time});`
      }
    })

    console.log(execString)

    eval(execString).call(this)

    //console.log(this.q)
  }
}
function Calc() {
  this.operations = []
  this.history = []

  this.addOperation = function (name, func) {
    this.operations.push({ name: name, func: func })
  }

  this.operation = function (expr) {
    let token = expr.split(' ')
    this.history.push({ operation: token[1], operands: [token[0], token[2]] })
    return this.operations.find((item) => item.name == token[1])
      .func(Number(token[0]), Number(token[2]))
  }

  this.clearHistory = function () {
    this.history = []
  }

  this.addOperation('+', (a, b) => a + b)
  this.addOperation('*', (a, b) => a * b)
}

// const calculator = new Calc()
// console.log(calculator.operation('31 + 32'))
// console.log(calculator.operation('10 * 2'))
// calculator.addOperation('/', (a, b) => a / b)
// console.log(calculator.operation('10 / 2'))
// console.log(JSON.stringify(calculator.history()))
// calculator.clearHistory()
// console.log(calculator.history())

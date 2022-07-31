class MyPromise {
  state = null
  value = null
  thenCallbacks = []
  catchCallbacks = []

  constructor(callback) {
    this.state = 'pending'
    setTimeout(callback, 0, this.resolve, this.reject)
  }

  resolve = (value) => {
    if (this.state == 'pending') {
      this.state = 'fulfilled'
      this.value = value

      let promise = this
      this.thenCallbacks.forEach((callback) => {
        promise = new MyPromise((resolve, reject) => {
          resolve(callback(promise))
        })
      })
    }
  }

  reject = (value) => {
    if (this.state == 'pending') {
      this.state = 'rejected'
      this.value = value

      let promise = this
      this.catchCallbacks.forEach((callback) => {
        promise = new MyPromise((resolve, reject) => {
          reject(callback(promise))
        })
      })
    }
  }

  then = (callback) => {
    if (this.state == 'pending')
      this.thenCallbacks.push(callback)

    else if (this.state == 'fulfilled')
      return new MyPromise((resolve, reject) => {
        resolve(callback(this))
      })

    return this
  }

  catch = (callback) => {
    if (this.state == 'pending')
      this.catchCallbacks.push(callback)

    else if (this.state == 'rejected')
      return new MyPromise((resolve, reject) => {
        reject(callback(this))
      })

    return this
  }

  static resolve = (value) => {
    return new MyPromise((resolve, reject) => {
      resolve(value)
    })
  }

  static reject = (value) => {
    return new MyPromise((resolve, reject) => {
      reject(value)
    })
  }
}

// Tests
const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('done')
  }, 1000)
})

myPromise
  .then(() => { console.log('resolved') })
  .catch(() => { console.log('rejected') })

setTimeout(() => console.log(myPromise), 1000)
setTimeout(() => console.log(myPromise), 2000)
setTimeout(() => console.log(myPromise), 3000)

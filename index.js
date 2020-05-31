import './countdown.css'

class Countdown {

  constructor(domEl, options) {
    this.domEl = domEl,
    this.timer,
    this.days,
    this.hours,
    this.minutes,
    this.seconds,
    this.on,
    this.prev = {
      days: null,
      hours: null,
      minutes: null,
      seconds: null
    },

    this.settings = {
      date: new Date().getTime() + 60 * 60 * 24 * 1000,
      playing: true,
      labels: false,
      ...options
    }

    this.counting = this.counting.bind(this)
  }


  on(event, callback) {
    switch (event) {
      case 'days':
        this.on.days = new Event('days')
        this.domEl.addEventListener('days', callback)
        break;

      case 'hours':
        this.on.hours = new Event('hours')
        this.domEl.addEventListener('hours', callback)
        break;

      case 'minutes':
        this.on.minutes = new Event('minutes')
        this.domEl.addEventListener('minutes', callback)
        break;

      case 'seconds':
        this.on.seconds = new Event('seconds')
        this.domEl.addEventListener('seconds', callback)
        break;
        
      default:
        break;
    }

    return this
  }


  play() {
    // Build and initialize counter the first time
    this.buildCounter().counting()

    if ( this.settings.playing ) {
      this.timer = setInterval(this.counting, 1000)
      return this
    }
    
    return this
  }


  stop() {
    clearInterval(this.timer)

    return this
  }


  buildCounter() {
    const countdown = this.domEl
          countdown.classList.add('countdown')
          countdown.innerHTML = '' // resets inner elements to make sure that timer will not duplicate
          

    // Build the Days block
    const daysContainer = document.createElement('div')
          daysContainer.classList.add('countdown__num', 'countdown__days')

    const daysNum = document.createElement('span')
          daysContainer.appendChild(daysNum)

    if ( this.settings.labels ) {
      const daysLabel = document.createElement('p')
            daysLabel.classList.add('countdown__label')
            daysLabel.textContent = this.settings.labels.days
            daysContainer.appendChild(daysLabel)
    }

    countdown.appendChild(daysContainer)
    this.days = daysNum


    // Build the Hours block
    const hoursContainer = document.createElement('div')
          hoursContainer.classList.add('countdown__num', 'countdown__hours')

    const hoursNum = document.createElement('span')
          hoursContainer.appendChild(hoursNum)

    if ( this.settings.labels ) {
      const hoursLabel = document.createElement('p')
            hoursLabel.classList.add('countdown__label')
            hoursLabel.textContent = this.settings.labels.hours
            hoursContainer.appendChild(hoursLabel)
    }

    countdown.appendChild(hoursContainer)
    this.hours = hoursNum
          

    // Build the Minutes block
    const minutesContainer = document.createElement('div')
          minutesContainer.classList.add('countdown__num', 'countdown__minutes')

    const minutesNum = document.createElement('span')
          minutesContainer.appendChild(minutesNum)
    
    if ( this.settings.labels ) {
      const minutesLabel = document.createElement('p')
            minutesLabel.classList.add('countdown__label')
            minutesLabel.textContent = this.settings.labels.minutes
            minutesContainer.appendChild(minutesLabel)
    }

    countdown.appendChild(minutesContainer)
    this.minutes = minutesNum
    

    // Build the Seconds block
    const secondsContainer = document.createElement('div')
          secondsContainer.classList.add('countdown__num', 'countdown__seconds')
          
    const secondsNum = document.createElement('span')
          secondsContainer.appendChild(secondsNum)
          
    if ( this.settings.labels ) {
      const secondsLabel = document.createElement('p')
            secondsLabel.classList.add('countdown__label')
            secondsLabel.textContent = this.settings.labels.seconds
            secondsContainer.appendChild(secondsLabel)
    }

    countdown.appendChild(secondsContainer)
    this.seconds = secondsNum

    return this
  }


  counting() {
    const date = new Date(this.settings.date).getTime()
    const remaining = date - new Date().getTime()
    
    if ( remaining > 0 ) {

      // Turn it into human readable numbers
      const daysDistance = Math.floor(remaining / (1000 * 60 * 60 * 24))
      const hoursDistance = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutesDistance = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const secondsDistance = Math.floor((remaining % (1000 * 60)) / 1000);
      
      // Check if event listeners are defined
      // and if it is necessary to dispatch them
      
      if ( this.on.days && this.prev.days !== daysDistance && this.prev.days !== null ) {
        this.prev.days = daysDistance
        this.domEl.dispatchEvent(this.on.days)
      }

      if ( this.on.hours && this.prev.hours !== hoursDistance && this.prev.hours !== null ) {
        this.prev.hours = hoursDistance
        this.domEl.dispatchEvent(this.on.hours)
      }

      if ( this.on.minutes && this.prev.minutes !== minutesDistance && this.prev.minutes !== null ) {
        this.prev.minutes = minutesDistance
        this.domEl.dispatchEvent(this.on.minutes)
      }

      if ( this.on.seconds && this.prev.seconds !== secondsDistance && this.prev.seconds !== null ) {
        this.prev.seconds = secondsDistance
        this.domEl.dispatchEvent(this.on.seconds)
      }

      this.days.textContent = daysDistance < 10 ? `0${daysDistance}` : daysDistance
      this.hours.textContent = hoursDistance < 10 ? `0${hoursDistance}` : hoursDistance
      this.minutes.textContent = minutesDistance < 10 ? `0${minutesDistance}` : minutesDistance
      this.seconds.textContent = secondsDistance < 10 ? `0${secondsDistance}` : secondsDistance
      
      return this
    }

    this.stop()

    return this
  }


  getRemaining(type) {
    const date = new Date(this.settings.date).getTime()
    const remaining = date - new Date().getTime()
    
    switch(type) {
      case 'days':
        return Math.floor(remaining / (1000 * 60 * 60 * 24))
        break

      case 'hours':
        return Math.floor(remaining / (1000 * 60 * 60))
        break

      case 'minutes':
        return Math.floor(remaining / (1000 * 60))
        break

      case 'seconds':
        return Math.floor(remaining / 1000)
        break

      default:
        return 'Invalid passed argument.'
        break
    }
  }
}

export default Countdown
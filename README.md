# Countdown
Simple, lightweight and very easy to use Countdown package.

<img src="https://raw.githubusercontent.com/tiagocastro070/countdown/master/countdown.png"/>

## Installation
```
npm install countdown-tmr

import Countdown from 'countdown-tmr';
```

```javascript
const elm = document.querySelector('#my-countdown')
const options = {
  date: '3 Jul 2020 08:00:00',
  labels: {
    days: 'd',
    hours: 'h',
    minutes: 'm',
    seconds: 's'
  }
}
const countdown = new Countdown(elm, settings).play()
```

## Properties
Property | Type | Default Value
-|-|-
date | string | 24 hours from current date. Format: '3 Jul 2020 08:00:00'
playing | bool | true
labels | object | days: 'days',<br>hours: 'hours'<br>minutes: 'minutes',<br>seconds: 'seconds'

## Methods
Method | Function
-| -
play | Initializes the countdown
stop | Stops the countdown
getRemaining | Returns the remaining value (in miliseconds) of a given argument. Available arguments are 'days', 'hours', 'minutes' and 'seconds'.

## Events
Events can be accessed through the ```on()``` method.
```javascript
on(eventType, callbackFn)
```
Events are triggered every time certain value changes (e.g. from 2 hours to 1 hour). Here is the events list:
 - `on('days', callbackFn)`
 - `on('hours', callbackFn)`
 - `on('minutes', callbackFn)`
 - `on('seconds', callbackFn)`
```javascript
coundown.on('hours', myCallback)

function myCallback() {
  console.log('an hour less to go')
}
```
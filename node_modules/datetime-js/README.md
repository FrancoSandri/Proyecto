# DateTime Script

Customize output for a javascript `Date` object

## Installation

```
npm install datetime-js
```

## Examples

```js
var DateTime = require('datetime-js')
var dateObj = new Date()

DateTime(dateObj, 'The date is %m-%d-%Y');
//-> The date is 02-14-2014

DateTime(dateObj, 'Time Now: %h:%i %AMPM');
//-> Time Now: 04:45 PM

DateTime(dateObj, 'Today is the %d:o day of %M');
//-> Today is the 25th day of August
```

> [JSFiddle Examples](http://jsfiddle.net/mitzerh/oexeL8ca/)

---

## Format options

### Month

| Format | Description | Value Examples |
|:-------|:------------|:---------------|
| **`%m`** | Month in number | `01 - 12` |
| **`%M`** | Full month name  | `January - December` |
| **`%M:s`** | Month in shorthand | `Jan - Dec` |

### Day

| Format | Description | Value Examples |
|:-------|:------------|:---------------|
| **`%d`** | Day of the month | `01 - 31` |
| **`%D`** | Day of the week | `Monday - Sunday` |
| **`%D:s`** | Day of the week shorthand | `Mon - Sun` |
| **`%d:o`** | Day of the month with ordinal suffix | `1st 2nd 3rd 4th . . .` |

### Year

| Format | Description | Value Examples |
|:-------|:------------|:---------------|
| **`%Y`** | Year in full format | `2019` |
| **`%Y:r`** | Year in Roman numeral format | `MMXIX` |
| **`%y`** | Year in shorthand | `19` |

### Time

| Format | Description | Value Examples |
|:-------|:------------|:---------------|
| **`%h`** | 12-hour format | `1 - 12` |
| **`%H`** | 24-hour format | `00 - 23` |
| **`%i`** | Minutes | `0 - 59` |
| **`%s`** | Seconds | `0 - 59` |
| **`%ampm`** | *am/pm* lowercase | `am pm` |
| **`%AMPM`** | *am/pm* uppercase | `AM PM` |
| **`%AmPm`** | am/pm capitalized | `Am Pm` |

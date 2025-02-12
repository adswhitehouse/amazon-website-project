import {twoDecimalPlaces} from "../scripts/utilities/money.js"

console.log("test suite: twoDecimalPlaces")

console.log("converts cents into dollars")
if(twoDecimalPlaces(2095) === "20.95") {
  console.log("passed")
} else {
  console.log("failed")
}

console.log("works with 0")
if(twoDecimalPlaces(0) === "0.00") {
  console.log("passed")
} else {
  console.log("failed")
}

console.log("round up to nearest cent")
if(twoDecimalPlaces(2000.5) === "20.01") {
  console.log("passed")
} else {
  console.log("failed")
}

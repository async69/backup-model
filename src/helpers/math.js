export default {
    Summation: (data = []) => {
        let totalAmount = 0
        data.forEach(item => totalAmount += Number(item))
        return totalAmount
    },
    Average: (data = []) => {
        let totalAmount = 0
        data.forEach(item => totalAmount += Number(item))
        return  data.length > 0? totalAmount / data.length : 0
    },
    ArraySummation: (dataOne = [], dataTwo = []) => {
        let newArray = []
        dataOne.forEach((_, idx) => {
            newArray.push(Number(dataOne[idx]))
        })
        dataTwo.forEach((_, idx) => {
            newArray[idx] = newArray[idx] + Number(dataTwo[idx])
        })
        return newArray
    }
}
export const getCount = ({
    data, count 
}) => {
    const length = data.length
    const numberOfPages = Math.ceil(count / length)
    return {
        max_amount: length, numberOfPages
    }
}
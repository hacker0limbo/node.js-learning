const sortUtils = require('./sort_utils')
const fileProcess = require('./fileProcess')


const processFile = (data) => {
    const integratedArr = JSON.parse(data)
    const sortedArr = sortUtils.sortByScore(integratedArr)
        // console.log(sortedArr.length);
    const sortedArrJson = JSON.stringify(sortedArr, null, 2)
    const writePath = './douban_sorted.json'
    fileProcess.writeFile(writePath, sortedArrJson)
}



const __main = () => {
    const readPath = './douban_integrated.json'
    fileProcess.readFile(readPath, processFile)
}

__main()
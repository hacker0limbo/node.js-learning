const sortUtils = require('./sort_utils')
const fileProcess = require('./fileProcess')


const processFile = (data) => {
    const integratedArr = JSON.parse(data)
    sortUtils.sortByScore(integratedArr)
    console.log(integratedArr.length);
    const sortedArrJson = JSON.stringify(integratedArr, null, 2)
    const writePath = './douban_data/douban_sorted.json'
    fileProcess.writeFile(writePath, sortedArrJson)
}



const __main = () => {
    const readPath = './douban_data/douban_integrated.json'
    fileProcess.readFile(readPath, processFile)
}

__main()
const sortByScore = (array) => {
    array.sort((o1, o2) => {
        return o2.score - o1.score
    })
}

const sortByRank = (array) => {
    array.sort((o1, o2) => {
        return o1.ranking - o2.ranking
    })
}

module.exports = {
    sortByScore: sortByScore,
    sortByRank: sortByRank
}
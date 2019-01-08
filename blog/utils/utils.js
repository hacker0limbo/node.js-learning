const time = (created_time) => {
    const d = new Date(created_time * 1000)
    return d.toLocaleString()
}

module.exports = {
    time: time,
}
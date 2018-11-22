function validTime (time) {
  const hours = Number(time[0] + time[1])
  const mins = Number(time[3] + time[4])

  return (hours >= 0 && hours < 24) && (mins >= 0 && mins < 60)
}

module.exports = validTime

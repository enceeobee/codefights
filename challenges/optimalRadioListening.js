const assert = require('assert')

/*
  Early return:
    - if schedules.length === 1; just add up the seconds and return the score

  Let's:
    1. convert all times into seconds (or milliseconds)
    2. Trim all starting times to commuteStart
    3. Sequence all programs?
    4. Keep an eye out for the schedule going into the next day?

    maybe our schedule looks like

    [
      {
        //program: 'Good music',
        score: enjoymentScore
        ends: endMs,
        starts: startMs
      }
      // order by start
    ]

    So we find out what's on now (make a function for this), then listen to it until:
      a) it ends; or
      b) a better alternative begins

    When we switch, add the enjoymentLevel * secondsListening to enjoyment
*/
function optimalRadioListening (schedules, commuteHours) {
  let enjoyment = 0
  const enjoymentScores = {
    'Good music': 10,
    'News': 5,
    'Weather': 3,
    'Talk': 1,
    'Bad music': -2,
    'Advertisements': -25
  }
  const dateString = '6/6/06'
  const nextYear = '6/6/07'
  const schedule = schedules
    .reduce((acc, val, c) => {
      acc.push(
        ...val.map((program, i) => {
          let [prog, time] = program.split('(')
          let start = new Date(`${dateString} ${time.slice(0, -1)}`)
          let end = new Date(`${nextYear} ${time.slice(0, -1)}`)

          if (i < val.length - 1) {
            let nextTime = val[i + 1].split('(')[1]
            end = new Date(`${dateString} ${nextTime.slice(0, -1)}`)
          }

          return {
            start,
            end,
            score: enjoymentScores[prog.trim()],
            program: prog.trim(),
            channel: `${c}-${i}`
          }
        })
      )

      return acc
    }, [])
    .sort((a, b) => a.start - b.start)

  const [commuteStart, commuteEnd] = commuteHours.split(' - ')
  const endTime = new Date(`${dateString} ${commuteEnd}`).getTime()
  let currentTime = new Date(`${dateString} ${commuteStart}`).getTime()

  // Barf - this is slow, naive, and inefficient.
  while (currentTime < endTime) {
    enjoyment += schedule.filter(({ start, end }) => start <= currentTime && end > currentTime)
      .sort((a, b) => a.score - b.score)
      .pop()
      .score

    currentTime += 1000
  }

  return enjoyment
}

const makeTest = (s, c, x) => ({ s, c, x })
const tests = [
  makeTest(
    [
      ['Bad music (5:26:31)'],
      ['Talk (5:28:06)', 'Advertisements (5:31:34)', 'Talk (5:42:36)', 'Bad music (5:44:55)'],
      ['Advertisements (5:22:45)', 'News (5:34:00)', 'Advertisements (5:35:55)', 'News (5:46:04)', 'Talk (5:48:36)', 'Advertisements (5:51:43)', 'Weather (6:03:14)', 'Talk (6:05:24)', 'Advertisements (6:07:20)', 'Talk (6:17:55)', 'Good music (6:20:31)']
    ],
    '5:30:13 - 6:23:43',
    440
  ),

  makeTest(
    [
      ['Advertisements (5:40:58)', 'Bad music (5:51:20)', 'Talk (5:57:29)', 'Good music (5:59:18)', 'Talk (6:02:34)', 'Good music (6:04:34)', 'Bad music (6:07:50)', 'Good music (6:14:15)', 'Talk (6:17:24)', 'Bad music (6:19:01)']
    ],
    '5:49:06 - 6:22:28',
    864
  ),

  makeTest(
    [
      ['Bad music (3:22:21)', 'Good music (3:28:49)', 'Advertisements (3:32:10)', 'Talk (3:42:16)', 'Advertisements (3:43:59)']
    ],
    '3:29:28 - 3:50:42',
    -23502
  ),

  makeTest(
    [
      ['Good music (11:35:25)', 'Bad music (11:37:35)', 'Talk (11:41:06)'],
      ['Weather (11:34:33)', 'Talk (11:39:51)'],
      ['Bad music (11:31:18)', 'Weather (11:37:34)', 'Bad music (11:38:51)', 'Advertisements (11:45:06)', 'Bad music (11:55:16)'],
      ['Weather (11:27:40)', 'Advertisements (11:33:06)', 'Talk (11:38:34)', 'News (11:46:01)']
    ],
    '11:36:04 - 11:47:14',
    2053
  ),

  makeTest(
    [
      ['Good music (6:02:43)', 'Advertisements (6:33:41)', 'Good music (6:44:14)', 'Weather (7:15:34)', 'Advertisements (7:17:49)'],
      ['Advertisements (6:06:19)', 'News (6:18:10)', 'Advertisements (6:21:10)', 'Bad music (6:31:44)', 'Good music (7:33:17)', 'Bad music (8:04:55)'],
      ['Bad music (6:05:56)', 'Advertisements (7:07:18)', 'Weather (7:17:53)', 'Bad music (7:20:09)']
    ],
    '6:11:21 - 7:19:04',
    31544
  ),

  makeTest(
    [
      ['Advertisements (9:14:51)', 'News (9:26:43)', 'Advertisements (9:28:44)', 'Good music (9:39:13)', 'Talk (10:10:01)', 'Advertisements (10:12:19)', 'Talk (10:23:48)', 'Advertisements (10:25:44)'],
      ['Talk (9:13:46)', 'Weather (9:15:52)', 'Bad music (9:18:07)', 'Advertisements (10:19:15)', 'Good music (10:30:27)'],
      ['Advertisements (9:16:49)', 'News (9:27:51)', 'Bad music (9:29:21)', 'Weather (10:30:14)', 'News (10:31:31)', 'Talk (10:34:31)']
    ],
    '9:17:02 - 10:36:41',
    19364
  ),

  makeTest(
    [
      ['Advertisements (10:12:46)', 'Talk (10:24:01)', 'Good music (10:26:00)', 'Bad music (10:56:31)', 'Good music (11:56:59)'],
      ['Bad music (10:14:44)'],
      ['Talk (10:12:13)', 'News (10:14:43)', 'Good music (10:16:22)', 'News (10:48:04)', 'Weather (10:50:18)', 'Advertisements (10:52:57)']
    ],
    '10:17:06 - 10:57:52',
    23488
  ),

  makeTest(
    [
      ['Talk (8:58:13)', 'Bad music (9:00:03)', 'Talk (9:06:04)', 'News (9:08:00)', 'Good music (9:09:01)', 'Advertisements (9:12:30)', 'Weather (9:22:33)', 'Advertisements (9:23:40)'],
      ['Good music (9:00:46)', 'Weather (9:03:49)', 'Good music (9:04:58)', 'Talk (9:08:01)', 'Bad music (9:09:47)', 'News (9:16:08)', 'Weather (9:17:35)', 'Advertisements (9:18:37)', 'Talk (9:29:03)', 'News (9:30:46)', 'Talk (9:32:13)', 'Advertisements (9:33:47)']
    ],
    '9:05:34 - 9:33:32',
    -9112
  )
]

tests.forEach(t => assert.strictEqual(optimalRadioListening(t.s, t.c), t.x))

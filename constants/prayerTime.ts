export default [
  ...new Array(30).fill(0).map(() => [
    {
      prayer: 'Fajr',
      time: '04:30',
    },
    {
      prayer: 'Dhuhr',
      time: '12:00',
    },
    {
      prayer: 'Asr',
      time: '16:30',
    },
    {
      prayer: 'Maghrib',
      time: '18:30',
    },
    {
      prayer: 'Isha',
      time: '22:30',
    },
  ]),
]

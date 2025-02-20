// export const CALCULATION_METHODS: { [key: number]: string } = {
//   0: 'Jafari / Shia Ithna-Ashari',
//   1: 'University of Islamic Sciences, Karachi',
//   2: 'Islamic Society of North America',
//   3: 'Muslim World League',
//   4: 'Umm Al-Qura University, Makkah',
//   5: 'Egyptian General Authority of Survey',
//   7: 'Institute of Geophysics, University of Tehran',
//   8: 'Gulf Region',
//   9: 'Kuwait',
//   10: 'Qatar',
//   11: 'Majlis Ugama Islam Singapura, Singapore',
//   12: 'Union Organization islamic de France',
//   13: 'Diyanet İşleri Başkanlığı, Turkey',
//   14: 'Spiritual Administration of Muslims of Russia',
//   15: 'Moonsighting Committee Worldwide',
//   16: 'Dubai (experimental)',
//   17: 'Jabatan Kemajuan Islam Malaysia (JAKIM)',
//   18: 'Tunisia',
//   19: 'Algeria',
//   20: 'KEMENAG - Kementerian Agama Republik Indonesia',
//   21: 'Morocco',
//   22: 'Comunidade Islamica de Lisboa',
//   23: 'Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan',
// }

// export const SHAFAQ = ['general', 'ahmer', 'abyad']

// export const SCHOOL: { [key: number]: string } = { 0: 'Shafi', 1: 'Hanafi' }

// export const MIDNIGHT_MODE = {
//   0: 'Standard (Mid Sunset to Sunrise)',
//   1: 'Jafari (Mid Sunset to Fajr)',
// }

// export const LATITUDE_ADJUSTMENT_METHOD = {
//   1: 'Middle of the Night',
//   2: 'One Seventh',
//   3: 'Angle Based',
// }

export const PRAYER_SETTINGS: {
  [settingName: string]: { [key: number]: string }
} = {
  CALCULATION_METHODS: {
    0: 'Jafari / Shia Ithna-Ashari',
    1: 'University of Islamic Sciences, Karachi',
    2: 'Islamic Society of North America',
    3: 'Muslim World League',
    4: 'Umm Al-Qura University, Makkah',
    5: 'Egyptian General Authority of Survey',
    7: 'Institute of Geophysics, University of Tehran',
    8: 'Gulf Region',
    9: 'Kuwait',
    10: 'Qatar',
    11: 'Majlis Ugama Islam Singapura, Singapore',
    12: 'Union Organization islamic de France',
    13: 'Diyanet İşleri Başkanlığı, Turkey',
    14: 'Spiritual Administration of Muslims of Russia',
    15: 'Moonsighting Committee Worldwide',
    16: 'Dubai (experimental)',
    17: 'Jabatan Kemajuan Islam Malaysia (JAKIM)',
    18: 'Tunisia',
    19: 'Algeria',
    20: 'KEMENAG - Kementerian Agama Republik Indonesia',
    21: 'Morocco',
    22: 'Comunidade Islamica de Lisboa',
    23: 'Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan',
  },

  SCHOOL: { 0: 'Shafi', 1: 'Hanafi' },
  MIDNIGHT_MODE: {
    0: 'Standard (Mid Sunset to Sunrise)',
    1: 'Jafari (Mid Sunset to Fajr)',
  },
  LATITUDE_ADJUSTMENT_METHOD: {
    1: 'Middle of the Night',
    2: 'One Seventh',
    3: 'Angle Based',
  },
}

export const SHAFAQ = ['general', 'ahmer', 'abyad']

export function toList<T>(item: typeof PRAYER_SETTINGS.MIDNIGHT_MODE) {
  return Object.keys(item).map((key) => ({
    value: key,
    label: item[+key],
  }))
}

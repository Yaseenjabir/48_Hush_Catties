export const locations = [
  {
    id: 1,
    countryName: "Pakistan",
    value: "pakistan",
    states: [
      {
        stateName: "KP",
        value: "kp",
        cities: [{ cityName: "Mardan", value: "mardan", charges: 100 }],
      },
      {
        stateName: "Punjab",
        value: "punjab",
        cities: [{ cityName: "Islamabad", value: "islamabad", charges: 150 }],
      },
    ],
  },
  {
    id: 2,
    countryName: "UAE",
    value: "uae",
    states: [
      {
        stateName: "Sharjah",
        value: "sharjah",
        cities: [
          { cityName: "Khor Fakkan", value: "khorFakkan", charges: 200 },
        ],
      },
      {
        stateName: "Ras Al Khaimah",
        value: "rasAlKhaimah",
        cities: [{ cityName: "Al Rams", value: "alRams", charges: 150 }],
      },
    ],
  },
];

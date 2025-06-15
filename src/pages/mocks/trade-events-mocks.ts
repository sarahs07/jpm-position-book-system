export const outputPositions = {
  positions: [
    {
      account: "ACC1",
      security: "SEC1",
      quantity: 150,
      events: [
        {
          id: 1,
          action: "BUY",
          account: "ACC1",
          security: "SEC1",
          quantity: 100,
        },
        {
          id: 2,
          action: "BUY",
          account: "ACC1",
          security: "SEC1",
          quantity: 50,
        },
      ],
    },
  ],
};

export const buySingleSecurity = {
  events: [
    {
      id: 1,
      action: "BUY",
      account: "ACC1",
      security: "SEC1",
      quantity: 100,
    },
    {
      id: 2,
      action: "BUY",
      account: "ACC1",
      security: "SEC1",
      quantity: 50,
    },
  ],
};

export const buyDifferentSecurity = {
  events: [
    {
      id: 3,
      action: "BUY",
      account: "ACC1",
      security: "SEC1",
      quantity: 12,
    },
    {
      id: 4,
      action: "BUY",
      account: "ACC1",
      security: "SECXYZ",
      quantity: 50,
    },
    {
      id: 5,
      action: "BUY",
      account: "ACC2",
      security: "SECXYZ",
      quantity: 33,
    },
    {
      id: 6,
      action: "BUY",
      account: "ACC1",
      security: "SEC1",
      quantity: 20,
    },
  ],
};

export const buyAndSellSecurities = {
  events: [
    {
      id: 7,
      action: "BUY",
      account: "ACC1",
      security: "SEC1",
      quantity: 100,
    },
    {
      id: 8,
      action: "SELL",
      account: "ACC1",
      security: "SEC1",
      quantity: 50,
    },
  ],
};

export const cancelEvent = {
  events: [
    {
      id: 9,
      action: "BUY",
      account: "ACC1",
      security: "SEC1",
      quantity: 100,
    },
    {
      id: 9,
      action: "CANCEL",
      account: "ACC1",
      security: "SEC1",
      quantity: 0,
    },
    {
      id: 10,
      action: "BUY",
      account: "ACC1",
      security: "SEC1",
      quantity: 5,
    },
  ],
};

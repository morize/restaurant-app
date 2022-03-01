const orders = [
  {
    date: '2004-12-12',
    subTotal: 3.4,
    items: [
      {
        item: {
          id: 'chicken-sandwich',
          description: 'Chicken Sandwich',
          price: 3.4,
          type: 'breakfast',
        },
        quantity: 2,
      },
    ],
  },
];

module.exports = {
  orders,
};

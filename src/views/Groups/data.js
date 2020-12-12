import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    num: 1,
    name: 'Warehouse',
    devices: [
      'store1',
      'store2',
      'store3',
      'test1',
      'test2',
      'test3',
      'car1',
      'car2',
      'car3'
    ],
    note: 'All devices in the warehouse'
  },
  {
    id: uuid(),
    num: 2,
    name: 'Group2',
    devices: [
      'car1',
      'car2',
      'car3'
    ],
    note: 'Car devices'
  },
  {
    id: uuid(),
    num: 3,
    name: 'Group3',
    devices: [
      'test1',
      'test2',
      'test3'
    ],
    note: 'Test devices'
  }
];

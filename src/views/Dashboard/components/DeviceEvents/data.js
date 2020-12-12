import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    createdAt: 1555016400000,
    device: {
      name: 'AABBCCDD'
    },
    event: 'Temperature low',
    status: 'low'
  },
  {
    id: uuid(),
    createdAt: 1555016400000,
    device: {
      name: '11223344'
    },
    event: 'Temperature high',
    status: 'high'
  },
  {
    id: uuid(),
    createdAt: 1555016400000,
    device: {
      name: '22334455'
    },
    event: 'Humidity high',
    status: 'high'
  },
  {
    id: uuid(),
    createdAt: 1555016400000,
    device: {
      name: 'Ekaterina Tankova'
    },
    event: 'Humidity low',
    status: 'low'
  },
  {
    id: uuid(),
    createdAt: 1555016400000,
    device: {
      name: 'Ekaterina Tankova'
    },
    event: 'Temperature low',
    status: 'low'
  },
  {
    id: uuid(),
    createdAt: 1555016400000,
    device: {
      name: 'Ekaterina Tankova'
    },
    event: 'Temperature low',
    status: 'low'
  }
];

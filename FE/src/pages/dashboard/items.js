import tea from './coffee-cup.png';
import plainTea from './tea1.png';
import milkCoffee from './coffee-cup_1047462.png';
import blackCoffee from './coffee.png';

const items = [
  {
    name: 'කිරි තේ',
    qtyMax: 10,
    quantity: 10,
    image: tea, // Use the imported image
  },
  {
    name: 'ප්ලේන් ටී',
    qtyMax: 10,
    quantity: 10,
    image: plainTea, // Use the imported image
  },
  {
    name: 'කිරි කෝපී',
    qtyMax: 10,
    quantity: 10,
    image: milkCoffee, // Use the imported image
  },
  {
    name: 'කෝපී',
    qtyMax: 10,
    quantity: 10,
    image: blackCoffee, // Use the imported image
  },
];

export default items;

import tea from '../login/cup3.webp';
import plainTea from '../login/cup1.webp';
import milkCoffee from '../login/cup2.webp';
import blackCoffee from '../login/cup4.webp';

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

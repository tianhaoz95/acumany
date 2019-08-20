import _ from 'lodash';

export function getMaxRate(list) {
  var maxItem = _.maxBy(list, "rate");
  console.log(maxItem);
  if (maxItem) {
    return Number(maxItem.rate);
  } else {
    return 100;
  }
}

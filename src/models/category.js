/* eslint-disable func-names */
import categories from '../../data/categories.json';

function Category() {

}

module.exports = Category;

Category.find = function () {
  return categories;
};

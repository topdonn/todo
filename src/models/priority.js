/* eslint-disable func-names */
import priorities from '../../data/priorities.json';

function Priority() {

}

module.exports = Priority;

Priority.find = function () {
  return priorities;
};

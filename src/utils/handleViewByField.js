import _, { sumBy } from 'lodash';

export {
    calculateSumByGroup,
    sumAllValues
}
function calculateSumByGroup(data, viewByOption, selectedSumField){
    const groups = _.groupBy(data, viewByOption);

    return _.map(groups, (itens, index) => {
      return {
        visualizacao: index,
        soma: _.sumBy(itens, selectedSumField)
      };
    });
}

function sumAllValues(sumByGroup){
    return sumByGroup.push({
      visualizacao: 'Total',
      soma: _.sumBy(sumByGroup, 'soma')
    });
  }
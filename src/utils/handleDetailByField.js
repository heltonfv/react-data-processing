import _, { sumBy } from 'lodash';

export {
    calculateSumByDetail,
    sumAllValuesDetail
}
function calculateSumByDetail(data, detailByOption, selectedSumField, selectedViewByField){
  const grouped = _.groupBy(data, detailByOption);

  return _.map(grouped, (itens, index) => {
    const grouped = _.groupBy(itens, selectedViewByField);
      return {
        [index]: _.map(grouped, (iten, i) => {
        return {
          [i]: _.sumBy(iten, selectedSumField)
        }
      })
    }      
  });
}

function sumAllValuesDetail(valuesCalculatedByDetail){
    let columns = [];
    let rows = [];

    //get all rows
    _.map(valuesCalculatedByDetail, (itens, index) => {
      rows.push(Object.keys(itens)[0])
    })

    //get all columns
    const findLeaves = (valuesCalculatedByDetail) => {
      if (_.isObject(valuesCalculatedByDetail)) {
        _.forEach(valuesCalculatedByDetail, (value, key) => {
          if (_.isObject(value)) {
            findLeaves(value);
          } else {
            columns.push(key);
          }
        });
      }
    };

    findLeaves(valuesCalculatedByDetail);

    let sums = {
      detalhar: 'Total'
    };  
    const newJson = [];

    _.map(rows, (itens, index) => {
      let newObj = {detalhar: itens }
      _.map(columns, (iten, inde) => {
        let valor = 0;
        newObj[iten] = null;
        _.map(columns, (ite, ind) => {
          if(valuesCalculatedByDetail[index]?.[itens]?.[ind]?.[iten]){
            newObj[iten] = valuesCalculatedByDetail[index]?.[itens]?.[ind]?.[iten];
            valor += newObj[iten];
          }
        });
      });
      newJson.push(newObj)
    });

    newJson.forEach(item => {
      for (const key in item) {
        if (key !== "detalhar" && item.hasOwnProperty(key)) {
          if (item[key] !== null) {
            sums[key] = (sums[key] || 0) + item[key];
          }
        }
      }
    });
    
    newJson.push(sums)

    return newJson
  }
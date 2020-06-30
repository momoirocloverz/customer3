export function priceFor(data,type) {
  let content = '';
  if (data) {
      let price;
      if(type === 1){
          price = JSON.parse(data);
      }else{
          price = JSON.parse(data)[0].price[0];
      }
      if (price.valuationType == 1) { //计时
          content = `${price.countTime}元/小时`
      } else if (price.valuationType == 2) {//固定计量
          content += `${price.countFixed}元/${price.pieceUnit.dicName}`
      } else if (price.valuationType == 3) {//阶梯计量
          let dicName = price.pieceUnit.dicName;
          let len = price.ladderObj.length - 1;
          price.ladderObj.forEach((item,index) =>{
              if(index === 0){
                  content += `${item.count}${dicName}(含)以下${item.unit}元/件,`
              }else if(index === len){
                  content += `${price.ladderObj[index-1].count}${dicName}以上${item.overUnit}元/件,`
              }else{
                  content += `${price.ladderObj[index-1].count}${dicName}(不含)-${item.count}${dicName}(含)以下${item.unit}元/件,`
              }
          })
      } else if (price.valuationType == 4) {//组合计量
          for(let item of price.unitPrice){
              content += `${item.count}元/${item.unit.dicName},`
          }
      } else if (price.valuationType == 5) {//计时+固定计量
          content += `${price.countTime}元/小时,${price.countFixed}元/${price.pieceUnit.dicName}`
      } else if (price.valuationType == 6) {//计时+阶梯计量
          content += `${price.countTime}元/小时,`
          let dicName = price.pieceUnit.dicName;
          let len = price.ladderObj.length - 1;
          price.ladderObj.forEach((item,index) =>{
              if(index === 0){
                  content += `${item.count}${dicName}(含)以下${item.unit}元/件,`
              }else if(index === len){
                  content += `${price.ladderObj[index-1].count}${dicName}以上${item.overUnit}元/件,`
              }else{
                  content += `${price.ladderObj[index-1].count}${dicName}(不含)-${item.count}${dicName}(含)以下${item.unit}元/件,`
              }
          })
      } else if (price.valuationType == 7){//计时+组合计量
          content += `${price.countTime}元/小时,`
          for(let item of price.unitPrice){
              content += `${item.count}元/${item.unit.dicName},`
          }
      }else if (price.valuationType == 8) {//固定计价
          content += `${price.countFixed}元/天`
      }
      return content
  } else {
      return '-'
  }
}
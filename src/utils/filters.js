import dayjs from 'dayjs';
export function filtersFor(data) {
    let content = '';
    if (data) {
        let price = JSON.parse(data);
        data = JSON.parse(data);
        if (data.valuationType == 1) { //计时
            content = `${price.countTime}元/小时`
        } else if (data.valuationType == 2) {//固定计量
            content += `${price.countFixed}元/${price.pieceUnit.dicName}`
        } else if (data.valuationType == 3) {//阶梯计量
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
        } else if (data.valuationType == 4) {//组合计量
            for(let item of data.unitPrice){
                content += `${item.count}元/${item.unit.dicName},`
            }
        } else if (data.valuationType == 5) {//计时+固定计量
            content += `${price.countTime}元/小时,${price.countFixed}元/${data.pieceUnit.dicName}`
        } else if (data.valuationType == 6) {//计时+阶梯计量
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
        } else if (data.valuationType == 7){//计时+组合计量
            content += `${price.countTime}元/小时,`
            for(let item of data.unitPrice){
                content += `${item.count}元/${item.unit.dicName},`
            }
        }else if (data.valuationType == 8) {//固定计价
            content += `${price.countFixed}元/天`
        }
        return content
    } else {
        return content
    }
}

export function pieceSizeFor(val) {
    let text = '';
    if (val) {
        let data = JSON.parse(val)
        if(data.unitObjList.length > 0){
            for (let item of data.unitObjList) {
                if (item.count && item.count > 0) {
                    text += `${item.count}${item.unit.dicName}/`
                } else {
                    text += `0${item.unit.dicName}/`
                }
            }
            text = text.substring(0, text.length - 1)
        }else{
            text = '无'
        }
    } else {
        text = '无'
    }
    return text
}

export function dateFor(val) {//日期格式
    if (val) {
        let date = val.substring(0, 10)
        return date.replace(/-/g, '/')
    } else {
        return ''
    }
}
export function dateForHour(val) {//日期格式
    if (val) {
        let date = val.substring(0, 16)
        return date.replace(/-/g, '/')
    } else {
        return ''
    }
}
export function dateTimeFor(val) {//日期显示到 时分
    if (val) {
        let date = val.substring(5, 16)
        return date.replace(/-/g, '/')
    } else {
        return ''
    }
}

export function stableDatefilter1(val) {
    if (val) {
        return dayjs(val).format('YYYY/MM/DD HH:mm:ss');
    } else {
        return '-'
    }
}
export function stableDatefilter2(val) {
    if (val) {
        return dayjs(val).format('YYYY/MM/DD');
    } else {
        return '-'
    }
}
export function stableDatefilter3(val) {
    if (val) {
        return dayjs(val).format('YYYY/MM/DD HH:mm');
    } else {
        return '-'
    }
}



/*
原始扁平数据
[
    {id:1,pid:121},
    {id:2,pid:3232}
]
*/
function listToTree(list=[]) {
    //利用js引用值机制，将各个数据父子关系建立起来即可实现父-子-孙的树形结构
    //深拷贝原始list
    list = JSON.parse(JSON.stringify(list))

    list.forEach(item => {
        list.forEach(v => {
            if (item.id === v.pid) {
                //建立父子关系后可以删除子的pid，因为只有唯一父亲
                delete v.pid
                if(!item.children){
                    item.children=[]
                }
                item.children.push(v)
            }
        })
    })
    //过滤掉建立了子-父关系的item,删除pid属性
    // return list.filter(item=>typeof item.pid !== 'undefined')
    let newList=[]
    list.forEach(item=>{
        if(typeof item.pid !== 'undefined'){
            delete item.pid
            newList.push(item)
        }
    })
    return newList
}

export {
    listToTree
}
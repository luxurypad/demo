function treeToList(tree) {
    //深拷贝
    tree = JSON.parse(JSON.stringify(tree))

    //递归tree
    function f(tree, pid = null) {
        const list = []
        tree.forEach(item => {
            if (item.children) {
                //将递归返回值压入list
                list.push(...f(item.children, item.id))
                //递归遍历完成后删除children属性
                delete item.children
            }
            //没有children的Item直接压入list
            list.push({ ...item, pid })
        })
        return list
    }
   return f(tree)
}

export {
    treeToList
}

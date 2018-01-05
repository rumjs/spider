
// define Utils
class Utils {

    //判空
    static isNull(obj) {
        return (obj === null || obj === undefined);
    }

    //获取对象类型
    static getType(obj) {
        
        var typeStr = Object.prototype.toString.call(obj).toLowerCase();
        var head = '[object ';
        return typeStr.substr(head.length, typeStr.length - head.length - 1);
    }

    //判空字符串
    static isBlankStr(str) {

        if (Utils.isNull(str)
        || Utils.getType(str) !== 'string'
        || str.trim().length <= 0) {
            return true;
        }
        return false;
    }

    //判布尔值
    static isTrue(bl) {

        if (!Utils.isNull(bl)) {
            var typeStr = Utils.getType(bl);
            if (typeStr === 'boolean') {
                return bl;
            } else if (typeStr === 'string' && bl.trim().toLowerCase() === 'true') {
                return true;
            }
        }
        return false;
    }

    //判数组类型
    static isArray(arr) {

        if (Utils.getType(arr) === 'array') {
            return true;
        }
        return false;
    }

    //取数字
    static getNum(obj) {

        if (isNaN(obj)) {
            return 0;
        }
        return Number(obj);
    }

    //比较版本号
    static compareVersion(v1, v2) {

        if (Utils.isBlankStr(v1) || Utils.isBlankStr(v2)) {
            return undefined;
        }

        var arr1 = v1.split('.');
        var arr2 = v2.split('.');
        var len = arr1.length < arr2.length ? arr1.length : arr2.length;
        var num1 = 0;
        var num2 = 0;
        for (var i = 0; i < len; ++i) {
            num1 = Utils.getNum(arr1[i]);
            num2 = Utils.getNum(arr2[i]);
            if (num1 != num2) {
                return num1 - num2;
            }
        }

        //有小版本的更大
        return arr1.length - arr2.length;
    }

}

module.exports = Utils;
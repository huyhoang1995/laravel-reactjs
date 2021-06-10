const MyFunc = {
    isEmpty: (val) => {
        var typeOfVal = typeof val;
        if (typeOfVal == 'undefined' ||  !val)
            return true;
        
        var retVal = false;
        switch (typeOfVal) {
            case 'array':
                retVal = (val.length < 1) ? true : false;
                break;
            case 'object':
                var arrKey = Object.keys(val);
                retVal = (arrKey.length < 1) ? true : false;
                break;
            case 'string':
                retVal = (val.length < 1) ? true : false;
                break;
        }

        return retVal;
    }
}
export default MyFunc;
export function collisionTest(x,y,array){
        for(const val of array){
            if(val[0] === x && val[1] === y){
                return true;
            }
        }
        return false;
    };
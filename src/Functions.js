export function collisionTest(x,y,array){
        for(const val of array){
            if(val[0] === x && val[1] === y){
                return true;
            }
        }
        return false;
    };

export function randomPositionXY(maxX, maxY ){
        return [
            Math.floor(Math.random()*maxX),
            Math.floor(Math.random()*maxY)
        ]
    };
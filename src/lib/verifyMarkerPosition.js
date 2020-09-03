export function verifyMarkerPosition(currentPosition, prevPosition) {
   if(currentPosition && prevPosition) {
    return currentPosition.lat !== prevPosition.lat || currentPosition.lng !== prevPosition.lng;
   } 
   return false;
} 


export default function RemoveFromList(list, element){
    const index = list.indexOf(element);
    if (index !== -1) {
        list.splice(index, 1);
        return true;
    }
    return false;
}
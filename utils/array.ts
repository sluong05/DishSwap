
//replace the value of certain index of array
export const updateAt = <T,>(arr: T[], index: number, value: T): T[] =>
    arr.map((item, i) => (i === index ? value : item));

//remove certain index of array
export const removeAt = <T,>(arr: T[], index: number): T[] =>
    arr.filter((_, i) => i !== index);
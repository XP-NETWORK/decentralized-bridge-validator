export const convertStringToHexToNumb = (str: string) => {
  const hex = Array.from(str)
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");
  const numb = BigInt(`0x${hex}`);
  return numb.toString();
};
export const convertNumbToHexToString = (num: string) => {
  const numberToBigInt = BigInt(num);
  const hex = numberToBigInt.toString(16) as string;
  const string = (hex.match(/.{1,2}/g) || [])
    .map((byte) => String.fromCharCode(Number.parseInt(byte, 16)))
    .join("");
  return string;
};

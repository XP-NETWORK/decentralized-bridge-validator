const decodeBase64Array = (encodedArray: string[]): string[] | null => {
    return encodedArray.map((encodedString) => {
        return Buffer.from(encodedString, 'base64').toString('utf-8');
    });
};

export default decodeBase64Array;

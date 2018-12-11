import CertificateModel from "../model/CertificateModel";

function range(numberOfElement: number) {
    return Array.apply(null, Array(numberOfElement)).map((x, i) => i)
}

export default function splitArrayInPages<T>(array: Array<T>, elementsNumberPerPage: number): Array<Array<T>> {
    const chunkedArrays = range(Math.ceil(array.length / elementsNumberPerPage))
        .map((x, i) => array.slice(i * elementsNumberPerPage, i * elementsNumberPerPage + elementsNumberPerPage));
    console.log(chunkedArrays);
    return chunkedArrays;
}
function range(numberOfElement) {
    return Array.apply(null, Array(numberOfElement)).map((x, i) => i)
}

export default function splitArrayInPages(array, elementsNumberPerPage) {
    const chunkedArrays = range(Math.ceil(array.length / elementsNumberPerPage))
        .map((x, i) => array.slice(i * elementsNumberPerPage, i * elementsNumberPerPage + elementsNumberPerPage));
    console.log(chunkedArrays);
    return chunkedArrays;
}
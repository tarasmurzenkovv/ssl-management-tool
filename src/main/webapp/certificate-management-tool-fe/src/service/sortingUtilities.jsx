import sort from "fast-sort";

export function sortCertificatesByKey(certificates, sortBy, ascending) {
    return ascending
        ? sortCertificatesByKeyAscending(certificates, sortBy)
        : sortCertificatesByKeyDecending(certificates, sortBy)
}

function sortCertificatesByKeyAscending(certificates, sortBy) {
    return sort(certificates).asc(sortBy);
}

function sortCertificatesByKeyDecending(certificates, sortBy) {
    return sort(certificates).desc(sortBy);
}
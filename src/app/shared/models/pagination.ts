export interface Pagination<T> {
    contents?: Array<T>;
    totalRecords: number;
    totalPages: number;
    pageNumber: number;
    lastPage: boolean;
    nextPage: boolean;
}

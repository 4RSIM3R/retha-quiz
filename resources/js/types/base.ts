export type Base<T> = {
    data: T,
    prev_page: number | null,
    current_page: number,
    next_page: number | null
}
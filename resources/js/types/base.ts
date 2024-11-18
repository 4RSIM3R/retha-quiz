export type Base<T> = {
    prev_page: number | null,
    items: T,
    next_page: number | null
}
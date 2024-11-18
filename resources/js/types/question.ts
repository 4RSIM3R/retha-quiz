import { Module } from "./module"

export type Question = {
    id?: string,
    module_id?: string,
    name?: string,
    slug?: string,
    description?: string,
    duration?: any,
    module?: Module
}
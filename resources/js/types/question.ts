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

export type QuestionItem = {
    id: number;
    question: string;
    code: string;
    order: number;
};
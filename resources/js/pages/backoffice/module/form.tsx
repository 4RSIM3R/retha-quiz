import { Button, Textarea, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { showError } from "@/lib/error";
import { Module } from "@/types/module";
import { useForm } from "@inertiajs/react";

type ModuleFormProps = {
    module?: Module
}

export default function ModuleForm({ module }: ModuleFormProps) {

    const { data, setData, post, processing, put } = useForm<Module>({
        id: module?.id ?? "",
        name: module?.name ?? "",
        slug: module?.slug ?? "",
        description: module?.description ?? "",
    } satisfies Module);

    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (module) {
            put(route('backoffice.module.update', { id: module?.id }), {
                onSuccess: (_) => { },
                onError: (error) => showError(error),
            });
        } else {
            post(route('backoffice.module.store'), {
                onSuccess: (_) => { },
                onError: (error) => showError(error),
            });
        }

    }

    return (
        <div className="w-full h-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Module form</h1>
                    <p className="text-sm text-gray-500" >Add new module</p>
                </div>
            </div>
            <form className="flex flex-col space-y-4 mt-4" onSubmit={submit} >
                <TextField value={data.name} onChange={(value) => setData("name", value)} label="Name" name="name" placeholder="Name" />
                <TextField value={data.slug} onChange={(value) => setData("slug", value)} label="Slug" name="slug" placeholder="Slug" />
                <Textarea value={data.description} onChange={(value) => setData("description", value)} label="Description" name="description" placeholder="Description" />
                <div>
                    <Button isDisabled={processing} className="mt-3" type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )

}

ModuleForm.layout = (page: any) => <AppLayout children={page} />;
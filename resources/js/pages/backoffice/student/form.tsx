import { AppLayout } from "@/layouts/app-layout";

export default function StudenForm() {

    return (
        <div className="w-full h-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Module form</h1>
                    <p className="text-sm text-gray-500" >Add new module</p>
                </div>
            </div>
            {/* <form className="flex flex-col space-y-4 mt-4" onSubmit={submit} >
                <TextField value={data.name} onChange={(value) => setData("name", value)} label="Name" name="name" placeholder="Name" />
                <TextField value={data.slug} onChange={(value) => setData("slug", value)} label="Slug" name="slug" placeholder="Slug" />
                <Textarea value={data.description} onChange={(value) => setData("description", value)} label="Description" name="description" placeholder="Description" />
                <div>
                    <Button isDisabled={processing} className="mt-3" type="submit">Submit</Button>
                </div>
            </form> */}
        </div>
    )

}

StudenForm.layout = (page: any) => <AppLayout children={page} />;
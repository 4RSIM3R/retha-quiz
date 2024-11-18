import { Button, Select, Textarea, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { showError } from "@/lib/error";
import { Module } from "@/types/module";
import { Question } from "@/types/question";
import { useForm } from "@inertiajs/react";

type QuestionFormProps = {
    question?: Question
    modules: Module[]
}

export default function QuestionForm({ question, modules }: QuestionFormProps) {

    const { data, setData, post, processing, put } = useForm<Question>({
        id: question?.id,
        module_id: question?.module_id,
        name: question?.name,
        description: question?.description,
        duration: question?.duration,
    } satisfies Question);

    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (question) {
            put(route('backoffice.question.update', { id: question?.id }), {
                onSuccess: (_) => { },
                onError: (error) => showError(error),
            });
        } else {
            post(route('backoffice.question.store'), {
                onSuccess: (_) => { },
                onError: (error) => showError(error),
            });
        }

    }

    return (
        <div className="w-full h-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Question form</h1>
                    <p className="text-sm text-gray-500" >Add new question</p>
                </div>
            </div>
            <form className="flex flex-col space-y-4 mt-4" onSubmit={submit} >
                <Select label="Modules" placeholder="Select a module"
                    onSelectionChange={(value) => {
                        setData("module_id", value.toString())
                    }}
                >
                    <Select.Trigger />
                    <Select.List items={modules}>
                        {(item) => (
                            <Select.Option id={item.id} textValue={item.name}>
                                <Select.OptionDetails label={item.name} />
                            </Select.Option>
                        )}
                    </Select.List>
                </Select>
                <TextField
                    label="Name"
                    name="name"
                    value={data.name}
                    onChange={(value) => setData("name", value)}
                />
                <TextField
                    label="Duration (in minutes)"
                    type="number"
                    name="duration"
                    value={data.duration}
                    onChange={(value) => setData("duration", value)}
                />
                <Textarea
                    label="Description"
                    name="description"
                    placeholder="Description"
                    value={data.description}
                    onChange={(value) => setData("description", value)}
                />
                <div>
                    <Button isDisabled={processing} className="mt-3" type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )

}

QuestionForm.layout = (page: any) => <AppLayout children={page} />;
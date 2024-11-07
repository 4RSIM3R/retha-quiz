import { Button, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { showError } from "@/lib/error";
import { Question } from "@/types/question";
import { useForm } from "@inertiajs/react";

type QuestionFormProps = {
    question?: Question
}

export default function QuestionForm({ question }: QuestionFormProps) {

    const { data, setData, post, processing, put } = useForm<Question>({
        id: question?.id ?? "",
        name: question?.name ?? "",
        slug: question?.slug ?? "",
        description: question?.description ?? "",
        duration: question?.duration ?? 0,
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
                <TextField value={data.name} onChange={(value) => setData("name", value)} label="Name" name="name" placeholder="Name" />
                <TextField value={data.slug} onChange={(value) => setData("slug", value)} label="Slug" name="slug" placeholder="Slug" />
                <TextField value={data.description} onChange={(value) => setData("description", value)} label="Description" name="description" placeholder="Description" />
                <TextField value={data.duration.toString()} onChange={(value) => setData("duration", parseInt(value))} label="Duration" name="duration" placeholder="Duration" />
                <div>
                    <Button isDisabled={processing} className="mt-3" type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )

}

QuestionForm.layout = (page: any) => <AppLayout children={page} />;
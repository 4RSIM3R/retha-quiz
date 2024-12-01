import { Button, TextField } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { showError } from "@/lib/error";
import { Student } from "@/types/student";
import { useForm } from "@inertiajs/react";

type StudentFormProps = {
    student?: Student
}

export default function StudenForm({ student }: StudentFormProps) {

    const { data, setData, post, processing, put } = useForm<Student>({
        name: student?.name ?? "",
        email: student?.email ?? "",
        password: "",
    } satisfies Student);

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (student) {
            put(route('backoffice.student.update', { id: student?.id }), {
                onSuccess: (_) => { },
                onError: (error) => showError(error),
            });
        } else {
            post(route('backoffice.student.store'), {
                onSuccess: (_) => { },
                onError: (error) => showError(error),
            });
        }

    }

    return (
        <div className="w-full h-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Student form</h1>
                    <p className="text-sm text-gray-500" >Add new student</p>
                </div>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col space-y-4 mt-4" >
                <TextField value={data.name} onChange={(value) => setData("name", value)} label="Name" name="name" placeholder="Name" />
                <TextField value={data.email} onChange={(value) => setData("email", value)} label="Email" name="email" placeholder="Email" />
                <TextField value={data.password} onChange={(value) => setData("password", value)} label="Password" name="password" placeholder="Password" />
                <div>
                    <Button isDisabled={processing} className="mt-3" type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )

}

StudenForm.layout = (page: any) => <AppLayout children={page} />;
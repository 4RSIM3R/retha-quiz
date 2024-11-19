import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { python } from '@codemirror/lang-python';
import { useState } from "react";
import { AppLayout } from '@/layouts/app-layout';
import { Button } from '@/components/ui';
import { useForm } from '@inertiajs/react';
import { showError } from '@/lib/error';

type CodeFormSchema = {
    code?: any;
}

export default function CodeForm({ question }: { question: any }) {

    const [code, setCode] = useState<string>("");

    const { data, setData, post } = useForm<CodeFormSchema>();

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        post(route('backoffice.question.parse', { id: question.id }), {
            onSuccess: (_) => { },
            onError: (error) => showError(error),
        });

    }

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Code form</h1>
                    <p className="text-sm text-gray-500" >generate question from code</p>
                </div>
            </div>
            <form onSubmit={onSubmit} className="grid grid-cols-12 gap-4 mt-4" >
                <CodeMirror
                    height="350px"
                    className='col-span-12'
                    value={code}
                    extensions={[python()]}
                    onChange={(value) => {
                        setCode(value)
                        setData("code", value)
                    }}
                />
                <div className='col-span-12' >
                    <Button type='submit' >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )

}

CodeForm.layout = (page: any) => <AppLayout children={page} />;

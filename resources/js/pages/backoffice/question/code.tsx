import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { python } from '@codemirror/lang-python';
import { useState } from "react";
import { AppLayout } from '@/layouts/app-layout';
import { Button } from '@/components/ui';


export default function CodeForm() {

    const [code, setCode] = useState<string>("");

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Code form</h1>
                    <p className="text-sm text-gray-500" >generate question from code</p>
                </div>
            </div>
            <form className="grid grid-cols-12 gap-4 mt-4" >
                <CodeMirror
                    height="350px"
                    className='col-span-12'
                    value={code}
                    extensions={[python()]}
                />
                <div className='col-span-12' >
                    <Button>
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )

}

CodeForm.layout = (page: any) => <AppLayout children={page} />;

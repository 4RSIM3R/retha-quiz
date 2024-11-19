import { Button, Card, Textarea } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { showError } from "@/lib/error";
import { useForm } from "@inertiajs/react";

type ArrangeProps = {
    result: any[],
    id: any,
}

export default function Arrange({ result, id }: ArrangeProps) {


    const { data, setData, post } = useForm({
        questions: result.map((item, index) => ({
            order: index + 1,
            question: '',
            code: item.content,
        }))
    });

    const handleQuestionChange = (index: number, value: string) => {
        setData('questions', data.questions.map((q, i) =>
            i === index ? { ...q, question: value } : q
        ));
    };

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        console.log(route('backoffice.question.arrange', { id: id }))

        post(route('backoffice.question.arrange', { id: id }), {
            onSuccess: (_) => { },
            onError: (error) => showError(error),
        });
    }

    return (
        <div className="w-full flex flex-col gap-4" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Code arrange</h1>
                    <p className="text-sm text-gray-500" >arrange question from code</p>
                </div>
            </div>
            <form onSubmit={onSubmit}>
                {
                    result.map((item, index) => (
                        <div className="grid grid-cols-12 gap-4" >
                            <div className="col-span-6" >
                                <Textarea
                                    placeholder="Your question..."
                                    value={data.questions[index].question}
                                    onChange={(e) => handleQuestionChange(index, e)}
                                />
                            </div>
                            <div className="col-span-6" >
                                <Card>
                                    <Card.Header>
                                        <Card.Title>
                                            {item.title}
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Content>
                                        <pre>
                                            <code>
                                                {item.content}
                                            </code>
                                        </pre>

                                    </Card.Content>
                                </Card>
                            </div>
                        </div>
                    ))
                }
                <Button type="submit" >
                    Submit
                </Button>
            </form>
        </div>
    )

}

Arrange.layout = (page: any) => <AppLayout children={page} />;
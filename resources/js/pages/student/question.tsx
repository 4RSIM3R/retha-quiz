import { Button, Card, Container, Link } from "@/components/ui";
import { GuestLayout } from "@/layouts";

type QuestionProps = {
    questions: any[],
    module: any,
}

export default function Question({ questions, module }: QuestionProps) {
    return (
        <Container className='max-w-6xl mx-auto my-4 h-screen flex flex-col items-center justify-center' >
            <p className='text-xl font-medium' >{module.name}</p>
            <p className='italic text-gray-500' >{module.description}</p>
            <div className='grid grid-cols-12 gap-4 mt-4 w-full'>
                {
                    questions.map((question) => (
                        <Link className='col-span-4' href={route('question.detail', { id: question.id })} >
                            <Card>
                                <Card.Header>
                                    <Card.Title>{question.name}</Card.Title>
                                    <Card.Description>{question.description}</Card.Description>
                                </Card.Header>
                                <Card.Content>

                                    <Button appearance='outline' >
                                        See Detail
                                    </Button>
                                </Card.Content>
                            </Card>
                        </Link>
                    ))
                }
            </div>

        </Container>
    );
}

Question.layout = (page: any) => <GuestLayout children={page} />;
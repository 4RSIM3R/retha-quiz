import { Button, Card, Container } from "@/components/ui";
import { Module } from "@/types/module";
import { Link } from "@inertiajs/react";

type ModuleProps = {
    modules: Module[]
}

export default function ModuleIndex({ modules }: ModuleProps) {
    return (
        <>
            <Container className='max-w-6xl mx-auto my-4 h-screen flex flex-col items-center justify-center' >
                <p className='text-xl font-medium' >Retha Quiz</p>
                <p className='italic text-gray-500' >Drag & Drop Python quiz</p>
                <div className='grid grid-cols-12 gap-4 mt-4 w-full'>
                    {
                        modules.map((module) => (
                            <Link className='col-span-4' href={route('question.index', { id: module.id })} >
                                <Card>
                                    <Card.Header>
                                        <Card.Title>{module.name}</Card.Title>
                                        <Card.Description>{module.description}</Card.Description>
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
        </>
    );
}
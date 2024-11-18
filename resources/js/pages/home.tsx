import { Card, Container } from '@/components/ui';
import { Module } from '@/types/module';
import { Link } from '@inertiajs/react';
import { GuestLayout } from 'layouts';

type HomeProps = {
    modules: Module[]
}

export default function Home({ modules }: HomeProps) {
    return (
        <>
            <Container className='max-w-4xl mx-auto my-4 h-full flex flex-col items-center justify-center' >
                <p>Retha Quiz</p>
                <p>Description Here</p>

                <div className='grid grid-cols-12 gap-4'>
                    {
                        modules.map((module) => (
                            <Link className='col-span-4' href={route('question', { id: module.id })} >
                                <Card>
                                    <Card.Header>
                                        <Card.Title>{module.name}</Card.Title>
                                    </Card.Header>
                                    <Card.Content>
                                        <p>{module.description}</p>
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

Home.layout = (page: any) => <GuestLayout children={page} />;

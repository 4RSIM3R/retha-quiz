import { Container } from '@/components/ui';
import { GuestLayout } from 'layouts';

export default function Home() {
    return (
        <>
            <Container className='my-4' >
                <p>Hello world</p>
            </Container>
        </>
    );
}

Home.layout = (page: any) => <GuestLayout children={page} />;

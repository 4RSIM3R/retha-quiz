import { GuestLayout } from 'layouts';

export default function Home() {
    return (
        <>
            <p>Hello world</p>
        </>
    );
}

Home.layout = (page: any) => <GuestLayout children={page} />;

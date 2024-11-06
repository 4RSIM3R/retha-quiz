import { AppLayout } from "@/layouts/app-layout";

export default function Index() {

    return (
        <>
            <p>Hello world</p>
        </>
    )

}

Index.layout = (page: any) => <AppLayout children={page} />;
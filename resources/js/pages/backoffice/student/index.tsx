import { AppLayout } from "@/layouts/app-layout";

export default function StudenIndex() {

    return (
        <>
            <p>Module StudenIndex</p>
        </>
    )

}

StudenIndex.layout = (page: any) => <AppLayout children={page} />;
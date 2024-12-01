import { GuestLayout } from "@/layouts";

export default function Index() {

    return (
        <>
            <p>Hello student</p>
        </>
    )

}

Index.layout = (page: any) => <GuestLayout children={page} />;

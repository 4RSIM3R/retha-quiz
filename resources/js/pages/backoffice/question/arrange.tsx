import { Button, Card, Textarea } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";

type ArrangeProps = {
    result: any[],
}

export default function Arrange({ result }: ArrangeProps) {

    return (
        <div className="w-full flex flex-col gap-4" >
             <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Code arrange</h1>
                    <p className="text-sm text-gray-500" >arrange question from code</p>
                </div>
            </div>
            {
                result.map((item) => (
                    <div className="grid grid-cols-12 gap-4" >
                        <div className="col-span-6" >
                            <Textarea
                                placeholder="Your question..."
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
            <Button>
                Submit
            </Button>
        </div>
    )

}

Arrange.layout = (page: any) => <AppLayout children={page} />;
import { Button, Form, Pagination, Table } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Base } from "@/types/base";
import { Question } from "@/types/question";
import { Link } from "@inertiajs/react";
import { IconEye, IconFolderDelete, IconPlus } from "justd-icons";

type QuestionIndexProps = {
    questions: Base<Question[]>
}

export default function QuestionIndex({ questions }: QuestionIndexProps) {

    return (
        <div className="w-full h-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Question</h1>
                    <p className="text-sm text-gray-500" >Manage all questions</p>
                </div>
                <div>
                    <Link href={route('backoffice.question.create')}>
                        <Button appearance="outline" >
                            <IconPlus />
                            Add New
                        </Button>
                    </Link>
                </div>
            </div>

            <div>
                {
                    questions.data.length > 0 ? (
                        <>
                            <Table className="my-4" >
                                <Table.Header className="w-full" >
                                    <Table.Column isRowHeader>ID</Table.Column>
                                    <Table.Column>Name</Table.Column>
                                    <Table.Column>Duration</Table.Column>
                                    <Table.Column>ACTION</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {
                                        questions.data.map((question) => (
                                            <Table.Row key={question.id}>
                                                <Table.Cell>{question.id}</Table.Cell>
                                                <Table.Cell>{question.name}</Table.Cell>
                                                <Table.Cell>{question.duration}</Table.Cell>
                                                <Table.Cell className="flex space-x-2" >
                                                    <Link href='/question/1'>
                                                        <Button appearance="outline" size="extra-small">
                                                            <IconEye />
                                                        </Button>
                                                    </Link>
                                                    <Form method="post" action={route('backoffice.question.delete', { id: question.id })}>
                                                        <input type="hidden" name="_method" value="DELETE" />
                                                        <Button className="text-red-500 border-red-500" appearance="outline" size="extra-small">
                                                            <IconFolderDelete className="fill-red-500" />
                                                        </Button>
                                                    </Form>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))
                                    }
                                </Table.Body>
                            </Table>
                            <Pagination>
                                <Pagination.List>
                                    <Pagination.Item variant="previous" href={route('backoffice.question.index', { page: questions.prev_page })} />
                                    <Pagination.Item variant="next" href={route('backoffice.question.index', { page: questions.next_page })} />
                                </Pagination.List>
                            </Pagination>
                        </>
                    ) : (<div className="flex flex-col items-center justify-center h-full" >No data</div>)
                }
            </div>
        </div>
    )

}

QuestionIndex.layout = (page: any) => <AppLayout children={page} />;
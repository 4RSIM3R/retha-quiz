import { Button, Pagination, Table } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Base } from "@/types/base";
import { Student } from "@/types/student";
import { Link } from "@inertiajs/react";
import { IconEye, IconPlus } from "justd-icons";

type StudentIndexProps = {
    students: Base<Student[]>
}

export default function StudenIndex({ students }: StudentIndexProps) {

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Student</h1>
                    <p className="text-sm text-gray-500" >Manage all students</p>
                </div>
                <div>
                    <Link href={route('backoffice.student.create')}>
                        <Button appearance="outline" >
                            <IconPlus />
                            Add New
                        </Button>
                    </Link>
                </div>
            </div>
            <div>
                {
                    students.items.length > 0 ? (
                        <>
                            <Table className="my-4" >
                                <Table.Header className="w-full" >
                                    <Table.Column isRowHeader>ID</Table.Column>
                                    <Table.Column>Name</Table.Column>
                                    <Table.Column>Email</Table.Column>
                                    <Table.Column>ACTION</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {
                                        students.items.map((question) => (
                                            <Table.Row key={question.id}>
                                                <Table.Cell>{question.id}</Table.Cell>
                                                <Table.Cell>{question.name}</Table.Cell>
                                                <Table.Cell>{question.email}</Table.Cell>
                                                <Table.Cell className="flex space-x-2" >
                                                    <Link href={route('backoffice.student.show', { id: question.id })}>
                                                        <Button appearance="outline" size="extra-small">
                                                            <IconEye />
                                                        </Button>
                                                    </Link>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))
                                    }
                                </Table.Body>
                            </Table>
                            <Pagination>
                                <Pagination.List>
                                    <Pagination.Item variant="previous" href={route('backoffice.question.index', { page: students.prev_page })} />
                                    <Pagination.Item variant="next" href={route('backoffice.question.index', { page: students.next_page })} />
                                </Pagination.List>
                            </Pagination>
                        </>
                    ) : (<div className="flex flex-col items-center justify-center h-full" >No data</div>)
                }
            </div>
        </div>
    )

}

StudenIndex.layout = (page: any) => <AppLayout children={page} />;
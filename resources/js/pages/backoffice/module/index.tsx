import { Button, buttonStyles, Menu, Pagination, Table } from "@/components/ui";
import { AppLayout } from "@/layouts/app-layout";
import { Base } from "@/types/base";
import { Module } from "@/types/module";
import { Link } from "@inertiajs/react";
import { IconEye, IconFolderDelete, IconPlus } from "justd-icons";

type ModuleIndexProps = {
    modules: Base<Module[]>
}

export default function ModuleIndex({ modules }: ModuleIndexProps) {

    return (
        <div className="w-full h-full" >
            <div className="flex flex-row justify-between" >
                <div className="" >
                    <h1 className="text-xl font-semibold" >Modules</h1>
                    <p className="text-sm text-gray-500" >Manage all modules</p>
                </div>
                <div>
                    <Link href={route('backoffice.module.create')}>
                        <Button appearance="outline" >
                            <IconPlus />
                            Add New
                        </Button>
                    </Link>
                </div>
            </div>
           
            <div>
                {
                    modules.data.length > 0 ? (
                        <>
                            <Table className="my-4" >
                                <Table.Header className="w-full" >
                                    <Table.Column isRowHeader>ID</Table.Column>
                                    <Table.Column>Name</Table.Column>
                                    <Table.Column>Description</Table.Column>
                                    <Table.Column>ACTION</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                   {
                                       modules.data.map((module) => (
                                           <Table.Row key={module.id}>
                                               <Table.Cell>{module.id}</Table.Cell>
                                               <Table.Cell>{module.name}</Table.Cell>
                                               <Table.Cell>{module.description}</Table.Cell>
                                               <Table.Cell>
                                                   <Menu>
                                                       <Menu.Trigger className={buttonStyles({ appearance: "outline", size: "small" })}>ACTION</Menu.Trigger>
                                                       <Menu.Content placement="bottom" className="sm:min-w-48">
                                                           <Menu.Item>
                                                               <IconEye />
                                                               Detail
                                                           </Menu.Item>
                                                           <Menu.Item>
                                                               <IconFolderDelete />
                                                               Delete
                                                           </Menu.Item>
                                                       </Menu.Content>
                                                   </Menu>
                                               </Table.Cell>
                                           </Table.Row>
                                       ))
                                   }
                                </Table.Body>
                            </Table>
                            <Pagination>
                                <Pagination.List>
                                    <Pagination.Item variant="previous" href={route('backoffice.module.index', { page: modules.prev_page })} />
                                    <Pagination.Item variant="next" href={route('backoffice.module.index', { page: modules.next_page })} />
                                </Pagination.List>
                            </Pagination>
                        </>
                    ) : (<div className="flex flex-col items-center justify-center h-full" >No data</div>)
                }
            </div>
        </div>
    )

}

ModuleIndex.layout = (page: any) => <AppLayout children={page} />;
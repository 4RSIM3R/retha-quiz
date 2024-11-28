import { QuestionItem } from '@/types/question';
import { useDroppable } from '@dnd-kit/core';
import { Button, Card } from '../ui';

type DropableProps = {
    items: QuestionItem[];
    onRemove: (item: QuestionItem) => void;
}

export const Dropable = ({ items, onRemove }: DropableProps) => {

    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
    });

    return (
        <ul
            className={`col-span-4 border p-4 rounded-sm flex flex-col gap-4 ${isOver ? 'bg-blue-100' : ''}`}
            ref={setNodeRef}
        >
            {items.length === 0 ? (
                <p className="text-sm text-gray-500">Drop your items here</p>
            ) : (
                items.map((item, idx) => (
                    <Card key={item.id}>
                        <Card.Header>
                            <Card.Title>Code Snippet</Card.Title>
                        </Card.Header>
                        <Card.Content>
                            <pre className="text-xs">{item.code}</pre>
                            <Button
                                className="w-full mt-2"
                                onPress={() => onRemove(item)}  // Remove item from dropable list
                                size='extra-small'
                                intent='danger'
                            >
                                Remove
                            </Button>
                        </Card.Content>
                    </Card>
                ))
            )}
        </ul>
    )

}
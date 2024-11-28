import { QuestionItem } from "@/types/question"
import { Card } from "../ui"
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type DragableProps = {
    question: QuestionItem,
    isDisabled: boolean,
}

export const Dragable = ({ question, isDisabled }: DragableProps) => {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: question.id,
        data: question,
        disabled: isDisabled,  // Disable the draggable when isDisabled is true
      });

    return (
        <div
            className="hover:cursor-grab active:cursor-grabbing"
            ref={setNodeRef}
            style={{ transform: CSS.Translate.toString(transform) }}
            {...attributes}
            {...listeners}
        >
            <Card>
                <Card.Header>
                    <Card.Title>Code Snippet</Card.Title>
                </Card.Header>
                <Card.Content>
                    <pre className="text-xs" >
                        {question.code}
                    </pre>
                </Card.Content>
            </Card>
        </div>
    )

}
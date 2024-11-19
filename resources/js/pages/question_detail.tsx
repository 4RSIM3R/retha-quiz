import { Card, Container } from "@/components/ui";
import { GuestLayout } from "@/layouts";
import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type QuestionDetailProps = {
  items: {
    id: number;
    question: string;
    code: string;
  }[];
};

export default function QuestionDetail({ items }: QuestionDetailProps) {
  // State to keep track of dropped code snippets
  const [droppedItems, setDroppedItems] = useState<{
    [key: number]: { id: number; code: string };
  }>({});

  // Shuffle the code snippets
  const shuffledItems = [...items].sort(() => Math.random() - 0.5);

  // Draggable component for code snippets
  const DraggableCode = ({ item }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "CODE_SNIPPET",
      item: { id: item.id, code: item.code },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    return (
      <div ref={drag} className={`cursor-move ${isDragging ? "opacity-50" : ""}`}>
        <Card className="rounded-md">
          <Card.Header>
            <Card.Title>Code Snippet</Card.Title>
          </Card.Header>
          <Card.Content>
            <pre className="text-xs">{item.code}</pre>
          </Card.Content>
        </Card>
      </div>
    );
  };

  // Drop target component for the middle column
  const DropTarget = ({ index }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
      accept: "CODE_SNIPPET",
      drop: (item) => handleDrop(item, index),
      canDrop: (item) =>
        !Object.values(droppedItems).some((droppedItem) => droppedItem.id === item.id),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    });

    const isActive = isOver && canDrop;

    return (
      <div
        ref={drop}
        className={`h-24 border-dashed border-2 ${
          isActive ? "border-blue-500" : "border-gray-300"
        }`}
      >
        {droppedItems[index] ? (
          <Card className="rounded-md">
            <Card.Content>
              <pre className="text-xs">{droppedItems[index].code}</pre>
            </Card.Content>
          </Card>
        ) : (
          <p className="text-center text-gray-500 mt-8">Drop code here</p>
        )}
      </div>
    );
  };

  const handleDrop = (item, index) => {
    setDroppedItems((prev) => ({ ...prev, [index]: item }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container className="p-4 w-full h-full grid grid-cols-12 gap-4">
        {/* Left Column: Questions */}
        <div className="col-span-4 flex flex-col gap-4">
          {items.map((e, index) => (
            <Card key={e.id} className="rounded-md">
              <Card.Header>
                <Card.Title>Question {index + 1}</Card.Title>
              </Card.Header>
              <Card.Content>
                <p>{e.question}</p>
              </Card.Content>
            </Card>
          ))}
        </div>

        {/* Middle Column: Drop Targets */}
        <div className="col-span-4 flex flex-col gap-4">
          {items.map((e, index) => (
            <DropTarget key={index} index={index} />
          ))}
        </div>

        {/* Right Column: Draggable Code Snippets */}
        <div className="col-span-4 flex flex-col gap-4">
          {shuffledItems.map((e) => (
            <DraggableCode key={e.id} item={e} />
          ))}
        </div>
      </Container>
    </DndProvider>
  );
}

QuestionDetail.layout = (page: any) => <GuestLayout children={page} />;

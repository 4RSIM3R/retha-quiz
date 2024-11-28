import { Button, Card, Container, Navbar } from "@/components/ui";
import { GuestLayout } from "@/layouts";
import { formatTime } from "@/lib/format";
import { Question } from "@/types/question";
import { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type QuestionDetailProps = {
  items: {
    id: number;
    question: string;
    code: string;
  }[];
  question: Question;
};

export default function QuestionDetail({ items, question }: QuestionDetailProps) {

  const [droppedItems, setDroppedItems] = useState<{
    [key: number]: { id: number; code: string };
  }>({});

  const shuffledItems = [...items].sort(() => Math.random() - 0.5);

  const [timeLeft, setTimeLeft] = useState(10);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return; // Stop the countdown when time is up

    const timer = setInterval(() => {
      setTimeLeft((prevTime: any) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsDisabled(true); // Disable the button when time is up
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [timeLeft]);

  // Draggable component for code snippets
  // const DraggableCode = ({ item }) => {
  //   const [{ isDragging }, drag] = useDrag({
  //     type: "CODE_SNIPPET",
  //     item: { id: item.id, code: item.code },
  //     collect: (monitor) => ({
  //       isDragging: !!monitor.isDragging(),
  //     }),
  //   });

  //   return (
  //     <div ref={drag} className={`cursor-move ${isDragging ? "opacity-50" : ""}`}>
  //       <Card className="rounded-md">
  //         <Card.Header>
  //           <Card.Title>Code Snippet</Card.Title>
  //         </Card.Header>
  //         <Card.Content>
  //           <pre className="text-xs">{item.code}</pre>
  //         </Card.Content>
  //       </Card>
  //     </div>
  //   );
  // };

  // Drop target component for the middle column
  // const DropTarget = ({ index }) => {
  //   const [{ isOver, canDrop }, drop] = useDrop({
  //     accept: "CODE_SNIPPET",
  //     drop: (item) => handleDrop(item, index),
  //     canDrop: (item) =>
  //       !Object.values(droppedItems).some((droppedItem) => droppedItem.id === item.id),
  //     collect: (monitor) => ({
  //       isOver: monitor.isOver(),
  //       canDrop: monitor.canDrop(),
  //     }),
  //   });

  //   const isActive = isOver && canDrop;

  //   return (
  //     <div
  //       ref={drop}
  //       className={`h-24 border-dashed border-2 ${isActive ? "border-blue-500" : "border-gray-300"
  //         }`}
  //     >
  //       {droppedItems[index] ? (
  //         <Card className="rounded-md">
  //           <Card.Content>
  //             <pre className="text-xs">{droppedItems[index].code}</pre>
  //           </Card.Content>
  //         </Card>
  //       ) : (
  //         <p className="text-center text-gray-500 mt-8">Drop code here</p>
  //       )}
  //     </div>
  //   );
  // };

  const handleDrop = (item: any, index: any) => {
    setDroppedItems((prev) => ({ ...prev, [index]: item }));
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="flex flex-row justify-between px-4 sm:px-6 lg:px-8 py-4" >
        <div>
          <h1 className="text-lg font-semibold">{question.name}</h1>
          <p className="text-sm">{question.description}</p>
        </div>
        <div className="px-4 py-2 border flex flex-col items-center justify-center" >
          {formatTime(timeLeft)}
        </div>
      </div>
      <DndProvider backend={HTML5Backend}>
        <Container className="w-full h-full grid grid-cols-12 gap-4">
          {/* Left Column: Questions */}
          <div className="col-span-4 flex flex-col gap-4">
            {items.map((e, index) => (
              <Card key={e.id} className="rounded-md mx-0">
                <Card.Header>
                  <Card.Title>Question {index + 1}</Card.Title>
                </Card.Header>
                <Card.Content>
                  <p>{e.question}</p>
                </Card.Content>
              </Card>
            ))}
          </div>

          {/* <div className="col-span-4 flex flex-col gap-4">
          {items.map((e, index) => (
            <DropTarget key={index} index={index} />
          ))}
        </div> */}

          {/* <div className="col-span-4 flex flex-col gap-4">
          {shuffledItems.map((e) => (
            <DraggableCode key={e.id} item={e} />
          ))}
        </div> */}
        </Container>
        <Container className="my-4" >
          <Button className="w-full" isDisabled={isDisabled}>Start Quiz</Button>
        </Container>
      </DndProvider>
    </div>
  );
}

QuestionDetail.layout = (page: any) => <GuestLayout children={page} />;

import { Dragable } from "@/components/question/dragable";
import { Dropable } from "@/components/question/dropable";
import { Button, Card, Container } from "@/components/ui";
import { GuestLayout } from "@/layouts";
import { Question, QuestionItem } from "@/types/question";
import { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Countdown } from "@/components/question/countdown";

type QuestionDetailProps = {
  items: QuestionItem[];
  question: Question;
};

const shuffleArray = (array: QuestionItem[]) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default function QuestionDetail({ items, question }: QuestionDetailProps) {

  const [droppedItems, setDroppedItems] = useState<QuestionItem[]>();
  const [availableItems, setAvailableItems] = useState<QuestionItem[]>(items);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const shuffledItems = shuffleArray(items);
    setAvailableItems(shuffledItems);
  }, [items]); 
  
  const onDragEnd = (e: DragEndEvent) => {
    const newItem = e.active.data.current as QuestionItem; // Ensure type consistency
    if (!(droppedItems ?? []).some(item => item.id === newItem.id)) {
      setDroppedItems((prev) => [...(prev ?? []), newItem]);
      setAvailableItems((prev) => prev.filter(item => item.id !== newItem.id));
    }
  };

  const handleRemoveFromDropable = (item: QuestionItem) => {
    setDroppedItems((prev) => (prev ?? []).filter((i) => i.id !== item.id)); // Remove from dropped items
    setAvailableItems((prev) => [...prev, item]); // Add back to available items
  };

  return (
    <div>
      <div className="flex flex-row justify-between px-4 sm:px-6 lg:px-8 py-4" >
        <div>
          <h1 className="text-lg font-semibold">{question.name}</h1>
          <p className="text-sm">{question.description}</p>
        </div>
        <Countdown time={question.duration} onTimeUp={() => setIsDisabled(true)} />
      </div>
      <DndContext onDragEnd={onDragEnd}>
        <Container className="w-full h-full grid grid-cols-12 gap-4">
          <div className="col-span-4 flex flex-col gap-4 border p-4 rounded-sm">
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

          <Dropable items={droppedItems ?? []} onRemove={handleRemoveFromDropable} />

          <div className="col-span-4 flex flex-col gap-4 border p-4 rounded-sm">
            {availableItems.map((e) => (
              <Dragable key={e.id} question={e} isDisabled={isDisabled} />
            ))}
          </div>
        </Container>
      </DndContext>
      <Container className="my-4" >
        <Button onPress={() => {

          const answer = droppedItems?.map(item => item.order);
          let correct = 0;

          (answer ?? []).forEach((order, index) => {
            if (order === index + 1) {
              correct++;
            }
          });

          const result = Math.ceil((correct / (droppedItems ?? []).length) * 100);

          alert(`You got ${result}% correct!`);

        }} className="w-full" isDisabled={isDisabled}>Start Quiz</Button>
      </Container>
    </div>
  );
}

QuestionDetail.layout = (page: any) => <GuestLayout children={page} />;

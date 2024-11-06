import React from 'react';
import { useDrop } from 'react-dnd';

interface PlaceholderProps {
  id: string;
  onDrop: (item: any, id: string) => void;
  content?: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ id, onDrop, content }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'COMPONENT',
    drop: (item) => onDrop(item, id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <span
      ref={drop}
      className={`inline-block min-w-[50px] border-b-2 border-dashed border-gray-400 ${
        isOver ? 'bg-gray-200' : ''
      }`}
    >
      {content || '...'}
    </span>
  );
};

export default Placeholder;
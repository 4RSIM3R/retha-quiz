import React from 'react';
import { useDrag } from 'react-dnd';

interface DraggableProps {
  name: string;
  content: string;
}

export const Draggable: React.FC<DraggableProps> = ({ name, content }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'COMPONENT',
    item: { content },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-blue-500 text-white px-4 py-2 rounded mb-2 cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {name}
    </div>
  );
};

export default Draggable;
import { Placeholder } from '@/components/placeholder';
import { Container } from '@/components/ui';
import { GuestLayout } from 'layouts';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Draggable from '@/components/draggable';

interface CodeLine {
    line: number;
    code: string;
}

interface PlaceholderData {
    [key: string]: string;
}

const codeData: CodeLine[] = [
    { line: 1, code: "[PLACEHOLDER]" },
    { line: 2, code: "    [PLACEHOLDER] \n" },
    { line: 3, code: "[PLACEHOLDER]" },
    { line: 4, code: "    [PLACEHOLDER]" }
];

const generateFinalCode = (codeLines: CodeLine[], placeholders: PlaceholderData) => {
    return codeLines.map((line) => {
        const placeholderId = `line-${line.line}`;
        return line.code.replace("[PLACEHOLDER]", placeholders[placeholderId] || "[PLACEHOLDER]");
    }).join("\n");
};

export default function Question() {

    const [placeholders, setPlaceholders] = useState<PlaceholderData>({});

    const handleDrop = (item: any, placeholderId: string) => {
        setPlaceholders((prev) => ({
            ...prev,
            [placeholderId]: item.content,
        }));
    };

    // Render each line, replacing [PLACEHOLDER] with a Placeholder component
    const renderCode = (codeLines: CodeLine[]) => {
        return codeLines.map((line) => {
            const placeholderId = `line-${line.line}`;
            const parts = line.code.split("[PLACEHOLDER]");

            return (
                <div key={line.line} className="flex items-center space-x-2">
                    <span className="whitespace-pre">{parts[0]}</span>
                    {parts.length > 1 && (
                        <Placeholder
                            id={placeholderId}
                            onDrop={handleDrop}
                            content={placeholders[placeholderId]}
                        />
                    )}
                    <span className="whitespace-pre">{parts[1] || ''}</span>
                </div>
            );
        });
    };

    return (
        <>

            <Container className='my-4' >
                <DndProvider backend={HTML5Backend}>
                    <div className="flex">
                        <div className='p-4' >
                            <p>Buatlah fungsi hello</p>
                        </div>
                        {/* Code Display */}
                        <div className="w-3/4 p-4 bg-gray-100">
                            {renderCode(codeData)}
                        </div>

                        {/* Draggable Components */}
                        <div className="w-1/4 p-4">
                            <h2 className="text-lg font-bold mb-4">Answer Choices</h2>
                            <Draggable name="print(name)" content=" print(name)" />
                            <Draggable name="def hello(name):" content="def hello(name):" />
                            <Draggable name={`if __name__ == "__main__":`} content={`if __name__ == "__main__":`} />
                            <Draggable name={`hello("retha")`} content={`   hello("retha")`} />
                            hello(\"hello world\")
                        </div>
                    </div>

                    {/* Button to Generate Final Code */}
                    <div className="p-4">
                        <button
                            onClick={() => console.log(generateFinalCode(codeData, placeholders))}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Generate Code
                        </button>
                    </div>
                </DndProvider>

            </Container>
        </>
    );
}

Question.layout = (page: any) => <GuestLayout children={page} />;

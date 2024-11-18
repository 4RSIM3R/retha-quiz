import ast
import json
import argparse

# Set up argument parser
parser = argparse.ArgumentParser(description='Parse Python code from a file and extract information.')
parser.add_argument('--file', type=str, required=True, help='The path to the Python code file')

# Parse the arguments
args = parser.parse_args()

# Read the code from the specified file
with open(args.file, 'r', encoding='utf-8') as f:
    code = f.read()

# Parsing code into AST
tree = ast.parse(code)

# Function to extract block information
def extract_block_info(node):
    if isinstance(node, ast.ClassDef):
        return {"title": node.name, "type": "class_definition", "content": ast.unparse(node)}
    elif isinstance(node, ast.FunctionDef):
        return {"title": node.name, "type": "function_definition", "content": ast.unparse(node)}
    elif isinstance(node, ast.Assign):
        return {"title": ", ".join([ast.unparse(target) for target in node.targets]), "type": "assignment", "content": ast.unparse(node)}
    elif isinstance(node, ast.For):
        return {"title": "For Loop", "type": "for_loop", "content": ast.unparse(node)}
    elif isinstance(node, ast.While):
        return {"title": "While Loop", "type": "while_loop", "content": ast.unparse(node)}
    elif isinstance(node, ast.If):
        return {"title": "If Statement", "type": "conditional", "content": ast.unparse(node)}
    elif isinstance(node, ast.Try):
        return {"title": "Try-Except Block", "type": "exception_handling", "content": ast.unparse(node)}
    elif isinstance(node, ast.Expr) and isinstance(node.value, ast.Call):
        return {"title": "Function Call", "type": "function_call", "content": ast.unparse(node)}
    return None

# Extract block information
result = [extract_block_info(node) for node in tree.body if extract_block_info(node)]

# Print JSON result
json_result = json.dumps(result, indent=2, ensure_ascii=False)
print(json_result)
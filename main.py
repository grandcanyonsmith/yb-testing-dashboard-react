import re
import os

# Regular expression pattern to match local imports in a JavaScript file.
LOCAL_IMPORT_PATTERN = r"import .* from ['\"](\.\/[^'\"]*)['\"]"

def file_exists(filepath):
    """Check if a file exists at the given path."""
    return os.path.isfile(filepath)

def find_local_imports(js_file):
    """Find local imports in a JavaScript file without checking for their existence."""
    # Initialize an empty list to hold the imports.
    local_imports = []
  
    # Attempt to read the contents of the file.
    try:
        with open(js_file, 'r') as file:
            data = file.read()
        # Use regular expression to find all local imports.
        local_imports = re.findall(LOCAL_IMPORT_PATTERN, data)
    except IOError as e:
        # If an error occurs, print it
        print(f"Error reading file: {e}")

    # Return the list of local imports found.
    return local_imports

def check_local_imports_existence(js_file, local_imports):
    """Print the status of local imports and whether they exist."""
    # Get the directory of the JavaScript file.
    directory = os.path.dirname(js_file)

    # Iterate through the local imports to check for their existence.
    for import_rel_path in local_imports:
        # Add the assumption of .js since we are dealing with JavaScript files.
        import_path_with_extension = f"{import_rel_path}.js"
        # Construct the full path of the local import file.
        full_path = os.path.join(directory, import_path_with_extension)
        # Check if the imported file exists and print the corresponding message.
        if file_exists(full_path):
            print(f"File exists: {full_path}")
        else:
            print(f"File does not exist: {full_path}")

# Main execution block to run the script as a standalone program.
if __name__ == "__main__":
    # Replace the sample path with the actual path to your JavaScript file.
    file_path = '/Users/canyon.smith/Desktop/tailwindtest/src/App.js'

    
    # First, check if the JavaScript file exists.
    if not file_exists(file_path):
        print(f"File does not exist: {file_path}")
    else:
        # Call the function to find local imports in the specified JavaScript file.
        imported_files = find_local_imports(file_path)
        # If an error did not occur and local imports are found, check their existence.
        if imported_files:
            check_local_imports_existence(file_path, imported_files)
            # Print the list of local imports.
            print(imported_files)
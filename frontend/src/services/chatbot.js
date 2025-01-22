export async function createIndex(file, user_id) {
    // Form data
    const formData = new FormData();
    formData.append("file", file);
    // Send api
    const response = await fetch(`http://localhost:8000/documentQA/document/${user_id}`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to upload file');
    }

    return response.json();
}

export async function query(input, user_id) {
    // Send api
    const response = await fetch(`http://localhost:8000/document_qa/query?input=${encodeURIComponent(input)}
    // &user_id=${encodeURIComponent(user_id)}`, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Failed query');
    }

    return response.json();
}

export async function getChatHistory(user_id) {
    const response = await fetch(`http://localhost:8000/chat_history/${user_id}?`, {
        method: 'GET'
    });
    console.log(response)
    if (!response.ok) {
        throw new Error('Get chat history fail.');
    }

    return response.json();
}
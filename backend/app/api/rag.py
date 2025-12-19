from fastapi import APIRouter
from app.models.rag_retriever import retrieve_context, add_documents

router = APIRouter(prefix="/rag", tags=["RAG"])

# Load sample knowledge base
add_documents([
    "Data Analysts need strong SQL and statistics skills.",
    "Machine Learning Engineers require Python and ML fundamentals.",
    "Learning Python improves career opportunities."
])

@router.post("/chat")
def chat(query: str):
    context = retrieve_context(query)
    return {
        "query": query,
        "retrieved_context": context
    }

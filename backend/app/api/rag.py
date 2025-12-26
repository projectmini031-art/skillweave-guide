from fastapi import APIRouter
from app.models.rag_retriever import add_documents, retrieve_context

router = APIRouter(prefix="/rag", tags=["RAG"])

add_documents([
    "Data Analysts require SQL, Python, and statistics.",
    "Machine Learning Engineers need Python and ML fundamentals.",
    "ESCO and O*NET provide standardized skill taxonomies."
])

@router.post("/chat")
def chat(query: str):
    return {"response": retrieve_context(query)}

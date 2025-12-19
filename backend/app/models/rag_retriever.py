import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")
index = faiss.IndexFlatL2(384)
documents = []

def add_documents(docs: list):
    vectors = model.encode(docs)
    index.add(np.array(vectors))
    documents.extend(docs)

def retrieve_context(query: str, k: int = 2):
    q_vec = model.encode([query])
    _, indices = index.search(q_vec, k)
    return [documents[i] for i in indices[0]]

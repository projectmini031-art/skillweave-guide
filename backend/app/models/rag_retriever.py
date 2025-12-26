import faiss, numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")
index = faiss.IndexFlatL2(384)
documents = []

def add_documents(docs):
    vectors = model.encode(docs)
    index.add(np.array(vectors))
    documents.extend(docs)

def retrieve_context(query, k=2):
    vec = model.encode([query])
    _, idx = index.search(vec, k)
    return [documents[i] for i in idx[0]]

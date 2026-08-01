from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from transcribe import transcribe_audio
from structure_note import structure_clinical_note

app = FastAPI(title="Roshetta Clinical Notes Service", version="1.0.0")

class NoteStructureRequest(BaseModel):
    transcript_text: str

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "clinical-notes-service"}

@app.post("/transcribe")
async def transcribe_endpoint(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        transcript = await transcribe_audio(contents)
        return {"status": "success", "transcript": transcript}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/structure")
def structure_endpoint(payload: NoteStructureRequest):
    try:
        structured_data = structure_clinical_note(payload.transcript_text)
        return {"status": "success", "data": structured_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

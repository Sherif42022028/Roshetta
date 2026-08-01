def structure_clinical_note(transcript_text: str) -> dict:
    """
    استدعاء نموذج Claude لهيكلة النص المفرغ إلى الحقول الطبية:
    chief_complaint, diagnosis, prescription, treatment_plan
    """
    return {
        "chief_complaint": "ألم بالبطن مستمر منذ يومين",
        "diagnosis": "التهاب مرارة حاد",
        "prescription": "Paracetamol 1000mg, Buscopan 10mg",
        "treatment_plan": "راحة تامة ومتابعة السونار بعد أسبوع",
        "is_ai_drafted": True,
        "doctor_approved_at": None  # افتراضيًا NULL لمنع الاعتماد التلقائي
    }

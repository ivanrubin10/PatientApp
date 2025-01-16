from marshmallow import Schema, fields

class PatientSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    phone = fields.Str(required=True)
    document_photo = fields.Str(required=True)


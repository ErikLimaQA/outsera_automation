import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fs from 'node:fs';

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

export function validateSchema(json, schemaPath) {
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
    const validate = ajv.compile(schema);

    const valid = validate(json);

    if (!valid) {
        throw new Error(
            `Schema validation failed:\n${ajv.errorsText(validate.errors, { separator: '\n' })}`
        );
    }

    return true;
}
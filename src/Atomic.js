const toType = require('@philipp122/totype');

class Atomic {
    constructor(requiredDefault = true) {
        this._requiredDefault = toType(requiredDefault) === 'boolean' ? requiredDefault : true;
    }

    setSchema(schema) {
        let validators = {
            type: false,
            required: false,
            min: false,
            max: false,
            match: false,
            default: false
        };
        let parsedSchema = {};
        let schemaKeys = Object.keys(schema).filter(key => key !== 'type' && key !== 'required');

        if(!['null', 'boolean', 'number', 'string', 'array', 'object'].includes(schema['type']))
            throw new TypeError(`'schema.type' has to be a valid datatype!`);

        validators.type = true;
        parsedSchema['type'] = schema['type'];

        if(Object.keys(schema).includes('required')) {
            if (toType(schema['required']) !== 'boolean')
                throw new TypeError(`'schema.required' has to be of type 'boolean'!`);

            validators.required = true;
            parsedSchema['required'] = schema['required'];
        }

        switch (schema['type']) {
            case 'null':
                schemaKeys.forEach(key => {
                    switch(key) {
                        case 'match':
                            if(toType(schema['match']) !== 'null')
                                throw new TypeError(`'schema.match' has to be of type 'null'!`);

                            validators.match = true;
                            parsedSchema['match'] = schema['match'];

                            break;
                        case 'default':
                            if(toType(schema['default']) !== 'null')
                                throw new TypeError(`'schema.default' has to be of type 'null'!`);

                            validators.default = true;
                            parsedSchema['default'] = schema['default'];

                            break;
                    }
                });

                if(validators.match && validators.default)
                    if(parsedSchema['match'] !== parsedSchema['default'])
                        throw new TypeError(`'schema.match' and 'schema.default' have to be equal!`);

                break;
            case 'boolean':
                schemaKeys.forEach(key => {
                    switch(key) {
                        case 'match':
                            if(toType(schema['match']) !== 'boolean')
                                throw new TypeError(`'schema.match' has to be of type 'boolean'!`);

                            validators.match = true;
                            parsedSchema['match'] = schema['match'];

                            break;
                        case 'default':
                            if(toType(schema['default']) !== 'boolean')
                                throw new TypeError(`'schema.default' has to be of type 'boolean'!`);

                            validators.match = true;
                            parsedSchema['default'] = schema['default'];

                            break;
                    }
                });

                if(validators.match && validators.default)
                    if(parsedSchema['match'] !== parsedSchema['default'])
                        throw new TypeError(`'schema.match' and 'schema.default' have to be equal!`);

                break;
            case 'number':
                schemaKeys.forEach(key => {
                    switch(key) {
                        case 'min':
                            if(toType(schema['min']) !== 'number' || Number.isNaN(schema['min']))
                                throw new TypeError(`'schema.min' has to be of type 'number'!`);

                            validators.min = true;
                            parsedSchema['min'] = schema['min'];

                            break;
                        case 'max':
                            if(toType(schema['max']) !== 'number' || Number.isNaN(schema['max']))
                                throw new TypeError(`'schema.max' has to be of type 'number'!`);

                            validators.max = true;
                            parsedSchema['max'] = schema['max'];

                            break;
                        case 'match':
                            if(toType(schema['match']) !== 'number' || Number.isNaN(schema['match']))
                                throw new TypeError(`'schema.match' has to be of type 'number'!`);

                            validators.match = true;
                            parsedSchema['match'] = schema['match'];

                            break;
                        case 'default':
                            if(toType(schema['default']) !== 'number' || Number.isNaN(schema['default']))
                                throw new TypeError(`'schema.default' has to be of type 'number'!`);

                            validators.default = true;
                            parsedSchema['default'] = schema['default'];

                            break;
                    }
                });

                if(validators.match && validators.default)
                    if(parsedSchema['match'] !== parsedSchema['default'])
                        throw new TypeError(`'schema.match' and 'schema.default' have to be equal!`);

                if(validators.min && validators.max)
                    if(!(parsedSchema['min'] <= parsedSchema['max']))
                        throw new TypeError(`'schema.min' has to be smaller than or equal to 'schema.max'!`);

                if(validators.min && validators.match)
                    if(!(parsedSchema['min'] <= parsedSchema['match']))
                        throw new TypeError(`'schema.min' has to be smaller than or equal to 'schema.match'!`);

                if(validators.max && validators.match)
                    if(!(parsedSchema['max'] >= parsedSchema['match']))
                        throw new TypeError(`'schema.max' has to be greater than or equal to 'schema.match'!`);

                if(validators.min && validators.default)
                    if(!(parsedSchema['min'] <= parsedSchema['default']))
                        throw new TypeError(`'schema.min' has to be smaller than or equal to 'schema.default'!`);

                if(validators.max && validators.default)
                    if(!(parsedSchema['max'] >= parsedSchema['default']))
                        throw new TypeError(`'schema.max' has to be greater than or equal to 'schema.default'!`);

                break;
            case 'string':
                schemaKeys.forEach(key => {
                    switch(key) {
                        case 'min':
                            if(toType(schema['min']) !== 'number' || Number.isNaN(schema['min']))
                                throw new TypeError(`'schema.min' has to be of type 'number'!`);

                            validators.min = true;
                            parsedSchema['min'] = schema['min'];

                            break;
                        case 'max':
                            if(toType(schema['max']) !== 'number' || Number.isNaN(schema['max']))
                                throw new TypeError(`'schema.max' has to be of type 'number'!`);

                            validators.max = true;
                            parsedSchema['max'] = schema['max'];

                            break;
                        case 'match':
                            if(toType(schema['match']) !== 'string')
                                throw new TypeError(`'schema.match' has to be of type 'string'!`);

                            validators.match = true;
                            parsedSchema['match'] = schema['match'];

                            break;
                        case 'default':
                            if(toType(schema['default']) !== 'string')
                                throw new TypeError(`'schema.default' has to be of type 'string'!`);

                            validators.default = true;
                            parsedSchema['default'] = schema['default'];

                            break;
                    }
                });

                if(validators.match && validators.default)
                    if(parsedSchema['match'] !== parsedSchema['default'])
                        throw new TypeError(`'schema.match' and 'schema.default' have to be equal!`);

                if(validators.min && validators.max)
                    if(!(parsedSchema['min'] <= parsedSchema['max']))
                        throw new TypeError(`'schema.min' has to be smaller than or equal to 'schema.max'!`);

                if(validators.min && validators.match)
                    if(!(parsedSchema['min'] <= parsedSchema['match'].length))
                        throw new TypeError(`'schema.min' has to be smaller than or equal to the length of 'schema.match'!`);

                if(validators.max && validators.match)
                    if(!(parsedSchema['max'] >= parsedSchema['match'].length))
                        throw new TypeError(`'schema.max' has to be greater than or equal to the length of 'schema.match'!`);

                if(validators.min && validators.default)
                    if(!(parsedSchema['min'] <= parsedSchema['default'].length))
                        throw new TypeError(`'schema.min' has to be smaller than or equal to the length of 'schema.default'!`);

                if(validators.max && validators.default)
                    if(!(parsedSchema['max'] >= parsedSchema['default'].length))
                        throw new TypeError(`'schema.max' has to be greater than or equal to the length of 'schema.default'!`);

                break;
            case 'array':
                schemaKeys.forEach(key => {
                    switch(key) {
                        case 'min':
                            if(toType(schema['min']) !== 'number' || Number.isNaN(schema['min']))
                                throw new TypeError(`'schema.min' has to be of type 'number'!`);

                            validators.min = true;
                            parsedSchema['min'] = schema['min'];

                            break;
                        case 'max':
                            if(toType(schema['max']) !== 'number' || Number.isNaN(schema['max']))
                                throw new TypeError(`'schema.max' has to be of type 'number'!`);

                            validators.max = true;
                            parsedSchema['max'] = schema['max'];

                            break;
                        case 'match':
                            if(toType(schema['match']) !== 'array')
                                throw new TypeError(`'schema.match' has to be of type 'array'!`);

                            validators.match = true;
                            parsedSchema['match'] = schema['match'];

                            break;
                        case 'default':
                            if(toType(schema['default']) !== 'array')
                                throw new TypeError(`'schema.default' has to be of type 'array'!`);

                            validators.default = true;
                            parsedSchema['default'] = schema['default'];

                            break;
                    }
                });

                if(validators.match && validators.default)
                    if(JSON.stringify(parsedSchema['match']) !== JSON.stringify(parsedSchema['default']))
                        throw new TypeError(`'schema.match' and 'schema.default' have to be equal!`);

                if(validators.min && validators.max)
                    if(!(parsedSchema['min'] <= parsedSchema['max']))
                        throw new TypeError(`'schema.min' has to be smaller than or equal to 'schema.max'!`);

                if(validators.min && validators.match)
                    if(!(parsedSchema['min'] <= parsedSchema['match'].length))
                        throw new TypeError(`'schema.min' has to be smaller than or equal to the length of 'schema.match'!`);

                if(validators.max && validators.match)
                    if(!(parsedSchema['max'] >= parsedSchema['match'].length))
                        throw new TypeError(`'schema.max' has to be greater than or equal to the length of 'schema.match'!`);

                if(validators.min && validators.default)
                    if(!(parsedSchema['min'] <= parsedSchema['default'].length))
                        throw new TypeError(`'schema.min' has to be smaller than or equal to the length of 'schema.default'!`);

                if(validators.max && validators.default)
                    if(!(parsedSchema['max'] >= parsedSchema['default'].length))
                        throw new TypeError(`'schema.max' has to be greater than or equal to the length of 'schema.default'!`);

                break;
            case 'object':
                schemaKeys.forEach(key => {
                    switch(key) {
                        case 'min':
                            if(toType(schema['min']) !== 'number' || Number.isNaN(schema['min']))
                                throw new TypeError(`'schema.min' has to be of type 'number'!`);

                            validators.min = true;
                            parsedSchema['min'] = schema['min'];

                            break;
                        case 'max':
                            if(toType(schema['max']) !== 'number' || Number.isNaN(schema['max']))
                                throw new TypeError(`'schema.max' has to be of type 'number'!`);

                            validators.max = true;
                            parsedSchema['max'] = schema['max'];

                            break;
                        case 'match':
                            if(toType(schema['match']) !== 'object')
                                throw new TypeError(`'schema.match' has to be of type 'object'!`);

                            validators.match = true;
                            parsedSchema['match'] = schema['match'];

                            break;
                        case 'default':
                            if(toType(schema['default']) !== 'object')
                                throw new TypeError(`'schema.default' has to be of type 'object'!`);

                            validators.default = true;
                            parsedSchema['default'] = schema['default'];

                            break;
                    }
                });

                if(validators.match && validators.default)
                    if(JSON.stringify(parsedSchema['match']) !== JSON.stringify(parsedSchema['default']))
                        throw new TypeError(`'schema.match' and 'schema.default' have to be equal!`);

                if(validators.min && validators.max)
                    if(!(parsedSchema['min'] <= parsedSchema['max']))
                        throw new TypeError(`'schema.min' has to be smaller than or equal to 'schema.max'!`);

                if(validators.min && validators.match)
                    if(!(parsedSchema['min'] <= Object.keys(parsedSchema['match'])))
                        throw new TypeError(`'schema.min' has to be smaller than or equal to the length of 'schema.match'!`);

                if(validators.max && validators.match)
                    if(!(parsedSchema['max'] >= Object.keys(parsedSchema['match'])))
                        throw new TypeError(`'schema.max' has to be greater than or equal to the length of 'schema.match'!`);

                if(validators.min && validators.default)
                    if(!(parsedSchema['min'] <= Object.keys(parsedSchema['default'])))
                        throw new TypeError(`'schema.min' has to be smaller than or equal to the length of 'schema.default'!`);

                if(validators.max && validators.default)
                    if(!(parsedSchema['max'] >= Object.keys(parsedSchema['default'])))
                        throw new TypeError(`'schema.max' has to be greater than or equal to the length of 'schema.default'!`);

                break;
            }

        this._validators = validators;
        this._schema = parsedSchema;

        return this;
    }

    getSchema() {
        return this._schema;
    }

    isRequired() {
        return this._validators.required ? this._schema['required'] : this._requiredDefault;
    }

    validate(object) {
        if(toType(object) !== this._schema['type'])
            return false;

        let result = true;

        Object.keys(this._validators).filter(key => this._validators[key]).forEach(key => {
            switch (key) {
                case 'min':
                    switch (this._schema['type']) {
                        case 'number':
                            if(!(object >= this._schema['min']))
                                result &= false;

                            break;
                        case 'string':
                        case 'array':
                            if(!(object.length >= this._schema['min']))
                                result &= false;

                            break;
                        case 'object':
                            if(!(Object.keys(object) >= this._schema['min']))
                                result &= false;

                            break;
                    }

                    break;
                case 'max':
                    switch (this._schema['type']) {
                        case 'number':
                            if(!(object <= this._schema['max']))
                                result &= false;

                            break;
                        case 'string':
                        case 'array':
                            if(!(object.length <= this._schema['max']))
                                result &= false;

                            break;
                        case 'object':
                            if(!(Object.keys(object) <= this._schema['max']))
                                result &= false;

                            break;
                    }

                    break;
                case 'match':
                    switch (this._schema['type']) {
                        case 'null':
                        case 'boolean':
                        case 'number':
                        case 'string':
                            if(!(object === this._schema['match']))
                                result &= false;

                            break;
                        case 'array':
                            if(!(JSON.stringify(object) === JSON.stringify(this._schema['match'])))
                                result &= false;

                            break;
                        case 'object':
                            if(!(JSON.stringify(object) === JSON.stringify(this._schema['match'])))
                                result &= false;

                            break;
                    }
            }
        });

        return result;
    }

    parse(object) {
        if(toType(object) !== this._schema['type'])
            throw new TypeError(`'object' has to be of type '${this._schema['type']}'!`);

        Object.keys(this._validators)
            .filter(key => key !== 'type' || key !== 'required' || key !== 'default')
            .filter(key => this._validators[key])
            .forEach(key => {
            switch (key) {
                case 'min':
                    switch (this._schema['type']) {
                        case 'number':
                            if(!(object >= this._schema['min']))
                                if(this._validators.default)
                                    object = this._schema['default'];
                                else
                                    throw new RangeError(`'object' has to be greater than or equal to '${this._schema['min']}'!`);

                            break;
                        case 'string':
                            if(!(object.length >= this._schema['min']))
                                if(this._validators.default)
                                    object = this._schema['default'];
                                else
                                    throw new RangeError(`'object' has to longer than or equal to '${this._schema['min']}'!`);

                            break;
                        case 'array':
                            if(!(object.length >= this._schema['min']))
                                if(this._validators.default)
                                    object = this._schema['default'];
                                else
                                    throw new RangeError(`'object' has to longer than or equal to '${this._schema['min']}'!`);

                            break;
                        case 'object':
                            if(!(Object.keys(object) >= this._schema['min']))
                                if(this._validators.default)
                                    object = this._schema['default'];
                                else
                                    throw new RangeError(`'object' has to be larger than or equal to '${this._schema['min']}'!`);

                            break;
                    }

                    break;
                case 'max':
                    switch (this._schema['type']) {
                        case 'number':
                            if(!(object <= this._schema['max']))
                                if(this._validators.default)
                                    object = this._schema['default'];
                                else
                                    throw new RangeError(`'object' has to be smaller than or equal to '${this._schema['max']}'!`);

                            break;
                        case 'string':
                            if(!(object.length <= this._schema['max']))
                                if(this._validators.default)
                                    object = this._schema['default'];
                                else
                                    throw new RangeError(`'object' has to be shorter than or equal to '${this._schema['max']}'!`);

                            break;
                        case 'array':
                            if(!(object.length <= this._schema['max']))
                                if(this._validators.default)
                                    object = this._schema['default'];
                                else
                                    throw new RangeError(`'object' has to be shorter than or equal to '${this._schema['max']}'!`);

                            break;
                        case 'object':
                            if(!(Object.keys(object) <= this._schema['max']))
                                if(this._validators.default)
                                    object = this._schema['default'];
                                else
                                    throw new RangeError(`'object' has to be smaller than or equal to '${this._schema['max']}'!`);

                            break;
                    }

                    break;
                case 'match':
                    switch (this._schema['type']) {
                        case 'null':
                        case 'boolean':
                        case 'number':
                        case 'string':
                            if(!(object === this._schema['match']))
                                if(this._validators.default)
                                    object = this._schema['default'];
                                else
                                    throw new RangeError(`'object' has to be equal to '${this._schema['match']}'!`);

                            break;
                        case 'array':
                            if(!(JSON.stringify(object) === JSON.stringify(this._schema['match'])))
                                if(this._validators.default)
                                    object = this._schema['default'];
                                else
                                    throw new RangeError(`'object' has to be equal to '${JSON.stringify(this._schema['match'])}'!`);

                            break;
                        case 'object':
                            if(!(JSON.stringify(object) === JSON.stringify(this._schema['match'])))
                                if(this._validators.default)
                                    object = this._schema['default'];
                                else
                                    throw new RangeError(`'object' has to be equal to '${JSON.stringify(this._schema['match'])}'!`);

                            break;
                    }
            }
        });

        return object;
    }

    static isAtomic(schema) {
        return toType(schema) === 'object' ? toType(schema['type']) === 'string' : false;
    }
}

module.exports = Atomic;
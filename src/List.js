const toType = require('@philipp122/totype');
const Atomic = require('./Atomic');
const Directory = require('./Directory');

class List {
    constructor(requiredDefault = true) {
        this._requiredDefault = toType(requiredDefault) === 'boolean' ? requiredDefault : true;
    }

    static isList(schema) {
        return toType(schema) === 'array';
    }

    setSchema(schema) {
        let parsedSchema = [];

        if(!List.isList(schema))
            throw new TypeError(`'schema' is not a List!`);

        if(schema.length > 1 || schema.length === 0)
            throw new RangeError(`'schema' may only have one element!`);

        if(Atomic.isAtomic(schema[0])) {
            parsedSchema.push(new Atomic(this._requiredDefault).setSchema(schema[0]));
        }
        else if(Directory.isDirectory(schema[0])) {
            parsedSchema.push(new Directory(this._requiredDefault).setSchema(schema[0]));
        }
        else if(List.isList(schema[0])) {
            parsedSchema.push(new List(this._requiredDefault).setSchema(schema[0]));
        }
        else
            throw new TypeError(`'schema[0]' has to be Atomic, a List or a Directory!`);

        this._schema = parsedSchema;

        return this;
    }

    getSchema() {
        let schema = [];

        schema.push(this._schema[0].getSchema());

        return schema;
    }

    isRequired() {
        return false;
    }

    validate(object) {
        if(toType(object) !== 'array')
            return false;

        let result = true;

        object.forEach(element => {
            let res = this._schema[0].validate(element);

            result &= res ? true : !this._schema[0].isRequired();
        });

        return result;
    }

    parse(object) {
        if(toType(object) !== 'array')
            throw new TypeError(`'object' has to be of type 'array'`);

        let parsedObject = [];

        object.forEach(element => {
            parsedObject.push(this._schema[0].parse(element));
        });

        return parsedObject;
    }
}

module.exports = List;
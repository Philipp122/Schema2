const toType = require('@philipp122/totype');
const Atomic = require('./Atomic');
const List = require('./List');

class Directory {
    constructor(requiredDefault = true) {
        this._requiredDefault = toType(requiredDefault) === 'boolean' ? requiredDefault : true;
    }

    static isDirectory(schema) {
        return toType(schema) === 'object' && !Atomic.isAtomic(schema);
    }

    setSchema(schema) {
        let parsedSchema = {};

        if(!Directory.isDirectory(schema))
            throw new TypeError(`'schema' is not a Directory!`);

        Object.keys(schema).forEach(key => {
            if(Atomic.isAtomic(schema[key])) {
                parsedSchema[key] = new Atomic(this._requiredDefault).setSchema(schema[key]);
            }
            else if(Directory.isDirectory(schema[key])) {
                parsedSchema[key] = new Directory(this._requiredDefault).setSchema(schema[key]);
            }
            else if(List.isList(schema[key])) {
                parsedSchema[key] = new List(this._requiredDefault).setSchema(schema[key]);
            }
            else
                throw new TypeError(`'schema['${key}']' has to be a Atomic, a List or a Directory!`);
        });

        this._schema = parsedSchema;

        return this;
    }

    getSchema() {
        let schema = {};

        Object.keys(this._schema).forEach(key => {
            schema[key] = this._schema[key].getSchema();
        });

        return schema;
    }

    isRequired() {
        let result = false;

        Object.keys(this._schema).forEach(key => {
            result |= this._schema[key].isRequired();
        });

        return result;
    }

    validate(object) {
        if(toType(object) !== 'object')
            return false;

        let result = true;

        Object.keys(this._schema).forEach(key => {
            let res = this._schema[key].validate(object[key]);

            result &= res ? true : !this._schema[key].isRequired();
        });

        return result;
    }

    parse(object) {
        if(toType(object) !== 'object')
            throw new TypeError(`'object' has to be of type 'object'`);

        let parsedObject = {};

        Object.keys(this._schema).forEach(key => {
            parsedObject[key] = this._schema[key].parse(object[key]);
        });

        return parsedObject;
    }
}

module.exports = Directory;
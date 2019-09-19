const toType = require('@philipp122/totype');
const Atomic = require('./src/Atomic');
const List = require('./src/List');
const Directory = require('./src/Directory');

module.exports = class Schema {
    constructor(requiredDefault = true) {
        this._requiredDefault = toType(requiredDefault) === 'boolean' ? requiredDefault : true;
    }

    setSchemaSync(schema) {
        // noinspection DuplicatedCode
        if(Atomic.isAtomic(schema)) {
            this._schema = new Atomic(this._requiredDefault).setSchema(schema);
        }
        else if(List.isList(schema)) {
            this._schema = new List(this._requiredDefault).setSchema(schema);
        }
        else if(Directory.isDirectory(schema)) {
            this._schema = new Directory(this._requiredDefault).setSchema(schema);
        }
        else {
            throw new Error(`'schema' has to be an Atomic, a List or a Directory!`);
        }

        return this;
    }
    setSchemaAsync(schema) {
        return new Promise((resolve, reject) => {
            try {
                // noinspection DuplicatedCode
                if (Atomic.isAtomic(schema)) {
                    this._schema = new Atomic(this._requiredDefault).setSchema(schema);
                }
                else if (List.isList(schema)) {
                    this._schema = new List(this._requiredDefault).setSchema(schema);
                }
                else if (Directory.isDirectory(schema)) {
                    this._schema = new Directory(this._requiredDefault).setSchema(schema);
                }
                else {
                    // noinspection ExceptionCaughtLocallyJS
                    throw new Error(`'schema' has to be an Atomic, a List or a Directory!`);
                }

                resolve(this);
            }
            catch (e) {
                reject(e);
            }
        });
    }

    getSchemaSync(schema) {
        return this._schema.getSchema();
    }
    getSchemaAsync(schema) {
        return new Promise((resolve, reject) => {
            resolve(this._schema.getSchema());
        });
    }

    validateSync(object) {
        return this._schema.validate(object);
    }
    validateAsync(object) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this._schema.validate(object));
            }
            catch (e) {
                reject(e);
            }
        });
    }

    parseSync(object) {
        return this._schema.parse(object);
    }
    parseAsync(object) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this._schema.parse(object));
            }
            catch (e) {
                reject(e);
            }
        });
    }
};
//This is where we write the knex queries
/* const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development); */
const db = require('../dbConfig');

//add, find, findById, remove, update <- these are the functions we need to write in this file

module.exports = {
    add,
    find,
    findById,
    remove,
    update,
    addMessage,
    findLessonMessages,
    removeMessage,
    addUser,
    findAllUsers,
    findUserByUsername,
    addContact,
    findAllContacts
}

async function addContact(contact) {
    return await db("contacts").insert(contact, ["id", "name"]);
}

function findAllContacts() {
    return db("contacts");
}

async function addUser(user) {
    return await db("users").insert(user, ["id", "username"]);
}

function findAllUsers() {
    return db("users");
}

function findUserByUsername(username) {
    return db("users").where({ username }).first();
}

async function add(lesson) {
    /* const [id] = await db('lessons').insert(lesson);
    return id; */
    return await db('lessons').insert(lesson, ['id', 'name']);
}

async function find() {
    return db('lessons');
}

async function findById(id) {
    return db('lessons')
        .where({ id })
        .first();
}

async function remove(id) {
    return db('lessons')
        .where({ id })
        .del();
}

async function update(id, changes) {
    return db('lessons')
        .where({ id })
        .update(changes)
        .then(() => {
            return findById(id);
        });
}

async function findMessageById(id) {
    return db('messages')
        .where({ id })
        .first();
}

async function addMessage(message, lesson_id) {
    /* const [id] = await db('messages')
        .where({ lesson_id })
        .insert(message);
    return findMessageById(id); */
    return await db('messages')
        .where({ lesson_id })
        .insert(message, ['id']);
}

async function findLessonMessages(lesson_id) {
    return db('lessons as l')
        .join('messages as m', 'l.id', 'm.lesson_id')
        .select(
            'l.id as LessonID',
            'l.name as LessonName',
            'm.id as MessageID',
            'm.sender',
            'm.text'
        )
        .where({ lesson_id });
}

async function removeMessage(id) {
    return db('messages')
        .where({ id })
        .del();
}
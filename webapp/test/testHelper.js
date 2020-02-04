const uuidv1 = require('uuid/v1');

function getUpdateTodoMock() {
    return {
        $apollo: {
            mutate: jest.fn().mockResolvedValue({
                data: {
                    updateTodo: {
                        id: uuidv1(),
                        text: "mocked Todo"
                    }
                }
            })
        }
    };
}

function getCreateTodoMock(testUser) {
    return {
        $apollo: {
            mutate: jest.fn().mockResolvedValue({
                data: {
                    createTodo: {
                        id: uuidv1(),
                        text: "mocked Todo",
                        user: {name: testUser}
                    }
                }
            })
        }
    };
}

function getDeleteTodoMock() {
    return {$apollo: {mutate: jest.fn().mockResolvedValue({data: {deleteTodo: true}})}};
}

function getExampleTodos(amount, testUser) {
    let todoList = [];
    for (let i = 0; i < amount; i++) {
        todoList.push({id: i, text: "todo" + i, user: {name: testUser, id: 0}, editMode: false})
    }
    return todoList;
}

module.exports.getCreateTodoMock = getCreateTodoMock;
module.exports.getUpdateTodoMock = getUpdateTodoMock;
module.exports.getDeleteTodoMock = getDeleteTodoMock;
module.exports.getExampleTodos = getExampleTodos;
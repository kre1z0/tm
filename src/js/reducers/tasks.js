import { createReducer, updateObjectInArray, deleteObjectFromArray } from 'utils';
import {
    TASKS_REQUEST, TASKS_SUCCESS,
    TASK_ADD_REQUEST, TASK_ADD_SUCCESS,
    TASK_UPDATE_REQUEST, TASK_UPDATE_SUCCESS,
    TASK_REMOVE_SUCCESS
} from 'constants/tasks';

const initialState = {
    list: [],
    fetching: true
};

export default createReducer((state, payload) => ({
    [TASKS_REQUEST]() {
        return { ...state, fetching: true };
    },

    [TASKS_SUCCESS]() {
        return { ...state, list: payload, fetching: false };
    },

    [TASK_ADD_SUCCESS]() {
        return { ...state, list: [ ...state.list, payload ] };
    },

    [TASK_UPDATE_SUCCESS]() {
        const list = updateObjectInArray(
            state.list, 'id', payload
        );

        return { ...state, list };
    },

    [TASK_REMOVE_SUCCESS]() {
        const list = deleteObjectFromArray(
            state.list, 'id', parseInt(payload.id)
        );

        return { ...state, list };
    }
}), initialState);
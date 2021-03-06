import { push } from 'react-router-redux';

import { SET_FILTER, REMOVE_FILTER, REMOVE_ALL_FILTERS } from 'actions/filters';

export default function tableMiddleware({ dispatch }) {
    return (next) => (action) => {
        const actions = [SET_FILTER, REMOVE_FILTER, REMOVE_ALL_FILTERS].indexOf(action.type);

        if (actions !== -1) {
            const targets = ['tasks'].indexOf(action.payload.target);

            if (targets !== -1) {
                const paths = location.pathname.split('/').filter((value) => value);

                if (paths.length > 1) {
                    dispatch(push(`/${paths[0]}`));
                }
            }
        }

        return next(action);
    };
}
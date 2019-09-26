import { useState } from 'react';

export default (initState) => {
    const [state, setState] = useState(initState);
    return [state, (values) => setState({ ...state, ...values })];
}

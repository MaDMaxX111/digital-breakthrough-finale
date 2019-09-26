// import { checkAuthorization } from './auth/saga';

export default () => new Promise(async (resolve) => {
    resolve();
    // const generator = checkAuthorization();
    // let done = false, value = null;
    //
    // while (!done) {
    //     try {
    //         let currentValue = null
    //         if (value && typeof value.then == 'function') {
    //             currentValue = await value
    //         } else {
    //             currentValue = value
    //         }
    //         const nextValue = generator.next(currentValue);
    //         done = nextValue.done
    //         value = nextValue.value
    //     } catch(e) {
    //         generator.throw(e)
    //         done = true
    //     }
    // }
    // resolve()

});

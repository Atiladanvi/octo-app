export default (target, source) => {
    const merge = (target, source) => {
        Object.keys(source).forEach((key) => {
            if (source[key] && typeof source[key] === 'object') {
                merge(target[key] = target[key] || {}, source[key]);
                return;
            }
            target[key] = source[key];
        });
    };
    merge(target, source);
};
import serialize from 'serialize-javascript';

export const serializeObject = (data: unknown) => serialize(data).replace(/</g, '\\\u003c');

const shouldForwardProp = (propName: string) => !propName.startsWith('$');

export default shouldForwardProp;

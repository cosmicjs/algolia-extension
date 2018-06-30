export default (objects) => {
  if (!objects || !objects.objects) return undefined;
  return objects.objects.map(object => object.title).filter(title => !!title);
};

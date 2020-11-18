export const find = (function () {
  let res: any = [];
  return function closure(obj: any, value: string | number) {
    res = res.filter((item: any) => item.id === value).length > 0 ? res : [];
    if (Array.isArray(obj)) {
      obj.forEach((item) => {
        item.id === value ? res.push(item) : closure(item.child, value);
      });
    }

    return res[0];
  };
})();

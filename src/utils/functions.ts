const isArray = (a: unknown) => {
  return Array.isArray(a);
};

const isObject = (o: unknown) => {
  return o === Object(o) && !isArray(o) && typeof o !== "function";
};

const toCamel = (s: string): string => {
  return s.replace(/([-_][a-z])/gi, ($1: string) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

export const keysToCamel = (o: any) => {
  if (isObject(o)) {
    const n: any = {};
    Object.keys(o).forEach((k: string) => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i: any) => {
      return keysToCamel(i);
    });
  }

  return o;
};

export const getHeaders = () => {
  return {
    Authorization: "Bearer " + localStorage.getItem("token"),
    accept: "application/json",
    "Content-Type": "application/json",
  };
};

export const mockLocalStorage = () => {
  const setItemMock = jest.fn();

  beforeEach(() => {
    Storage.prototype.setItem = setItemMock;
  });

  afterEach(() => {
    setItemMock.mockRestore();
  });

  return setItemMock;
};
